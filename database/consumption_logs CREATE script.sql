-- Table: public.consumption_logs

-- DROP TABLE IF EXISTS public.consumption_logs;

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

-- Trigger: update_timestamp

-- DROP TRIGGER IF EXISTS update_timestamp ON public.consumption_logs;

CREATE TRIGGER update_timestamp
    BEFORE UPDATE 
    ON public.consumption_logs
    FOR EACH ROW
    EXECUTE FUNCTION public.update_timestamp_column();