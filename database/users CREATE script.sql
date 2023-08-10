-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

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

-- Trigger: update_timestamp

-- DROP TRIGGER IF EXISTS update_timestamp ON public.users;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE 
    ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();