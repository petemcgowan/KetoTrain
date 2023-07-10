CREATE SEQUENCE IF NOT EXISTS public.users_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email_address character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_name character varying(255) COLLATE pg_catalog."default",
    last_login_date timestamp with time zone,
    creation_ts timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_ts timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT email_address_uniq UNIQUE (email_address)
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

ALTER SEQUENCE public.users_id_seq
    OWNED BY users.user_id;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();

ALTER SEQUENCE public.users_id_seq
    OWNER TO postgres;


----------------------------------
CREATE SEQUENCE IF NOT EXISTS public.water_consumptions_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.water_consumptions
(
    water_consumptions_id integer NOT NULL DEFAULT nextval('water_consumptions_id_seq'::regclass),
    user_id integer NOT NULL,
    consumption_date timestamp with time zone NOT NULL,
    litre_amount double precision NOT NULL,
    CONSTRAINT water_consumptions_pkey PRIMARY KEY (water_consumptions_id),
    CONSTRAINT water_consumptions_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.water_consumptions
    OWNER to postgres;

ALTER SEQUENCE public.water_consumptions_id_seq
    OWNER TO postgres;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON public.water_consumptions
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();

ALTER SEQUENCE public.water_consumptions_id_seq
    OWNED BY water_consumptions.water_consumptions_id;

----------------------------------
CREATE SEQUENCE IF NOT EXISTS public.weight_logs_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.weight_logs
(
    weight_logs_id integer NOT NULL DEFAULT nextval('weight_logs_id_seq'::regclass),
    user_id integer NOT NULL,
    weigh_in_timestamp timestamp with time zone NOT NULL,
    kg_amount double precision NOT NULL,
    CONSTRAINT weight_logs_pkey PRIMARY KEY (weight_logs_id),
    CONSTRAINT weight_logs_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.weight_logs
    OWNER to postgres;

ALTER SEQUENCE public.weight_logs_id_seq
    OWNER TO postgres;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON public.weight_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();

ALTER SEQUENCE public.weight_logs_id_seq
    OWNED BY weight_logs.weight_logs_id;



----------------------------------
CREATE SEQUENCE IF NOT EXISTS public."FoodFacts_id_seq"
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

ALTER SEQUENCE public."FoodFacts_id_seq"
    OWNER TO postgres;

CREATE TABLE IF NOT EXISTS public.food_facts
(
    food_facts_id integer NOT NULL DEFAULT nextval('"FoodFacts_id_seq"'::regclass),
    food_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    public_food_key character varying(255) COLLATE pg_catalog."default" NOT NULL,
    calcium double precision NOT NULL,
    carbohydrates double precision NOT NULL,
    classification double precision NOT NULL,
    energy double precision NOT NULL,
    fat_total double precision NOT NULL,
    iodine double precision NOT NULL,
    magnesium double precision NOT NULL,
    potassium double precision NOT NULL,
    protein double precision NOT NULL,
    saturated_fat double precision NOT NULL,
    sodium double precision NOT NULL,
    total_dietary_fibre double precision NOT NULL,
    total_sugars double precision NOT NULL,
    creation_ts timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_ts timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "FoodFacts_pkey" PRIMARY KEY (food_facts_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.food_facts
    OWNER to postgres;

CREATE TRIGGER update_last_mod_time
    BEFORE UPDATE
    ON public.food_facts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_last_modified_ts_column();

ALTER SEQUENCE public."FoodFacts_id_seq" OWNED BY food_facts.food_facts_id;



----------------------------------
CREATE SEQUENCE IF NOT EXISTS public.consumption_log_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.consumption_logs
(
    consumption_log_id integer NOT NULL DEFAULT nextval('consumption_log_id_seq'::regclass),
    food_facts_id integer,
    consumption_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL,
    CONSTRAINT consumption_log_pkey PRIMARY KEY (consumption_log_id),
    CONSTRAINT consumption_log_food_facts_id_fkey FOREIGN KEY (food_facts_id)
        REFERENCES public.food_facts (food_facts_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT consumption_log_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.consumption_logs
    OWNER to postgres;

ALTER SEQUENCE public.consumption_log_id_seq
    OWNER TO postgres;

ALTER SEQUENCE public.consumption_log_id_seq
    OWNED BY consumption_logs.consumption_log_id;


-- Trigger: update_timestamp

-- DROP TRIGGER IF EXISTS update_timestamp ON public.consumption_logs;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON public.consumption_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();



----------------------------------
CREATE SEQUENCE IF NOT EXISTS public.favourite_foods_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

CREATE TABLE IF NOT EXISTS public.favourite_foods
(
    favourite_foods_id integer NOT NULL DEFAULT nextval('favourite_foods_id_seq'::regclass),
    user_id integer NOT NULL,
    food_facts_id integer,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT favourite_foods_pkey PRIMARY KEY (favourite_foods_id),
    CONSTRAINT favourite_foods_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (user_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT favourite_foods_food_facts_id_fkey FOREIGN KEY (food_facts_id)
        REFERENCES public.food_facts (food_facts_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.favourite_foods
    OWNER to postgres;

ALTER SEQUENCE public.favourite_foods_id_seq
    OWNED BY favourite_foods.favourite_foods_id;

ALTER SEQUENCE public.favourite_foods_id_seq
    OWNER TO postgres;


-- Trigger: update_timestamp

-- DROP TRIGGER IF EXISTS update_timestamp ON public.favourite_foods;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON public.favourite_foods
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();


