-- Table: public.consumption_log

-- DROP TABLE IF EXISTS public.consumption_log;

CREATE TABLE IF NOT EXISTS public.consumption_log
(
    consumption_log_id integer NOT NULL DEFAULT nextval('consumption_log_consumption_log_id_seq'::regclass),
    food_facts_id integer,
    consumption_date timestamp with time zone NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT consumption_log_pkey PRIMARY KEY (consumption_log_id),
    CONSTRAINT consumption_log_food_facts_id_fkey FOREIGN KEY (food_facts_id)
        REFERENCES public."food_facts" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.consumption_log
    OWNER to postgres;

-- Trigger: update_timestamp

-- DROP TRIGGER IF EXISTS update_timestamp ON public.consumption_log;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON public.consumption_log
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();