-- Table: public.food_facts

-- DROP TABLE IF EXISTS public.food_facts;

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

-- Trigger: update_last_mod_time

-- DROP TRIGGER IF EXISTS update_last_mod_time ON public.food_facts;

CREATE TRIGGER update_last_mod_time
    BEFORE UPDATE 
    ON public.food_facts
    FOR EACH ROW
    EXECUTE FUNCTION public.update_last_modified_ts_column();