-- Table: public.food_facts

-- DROP TABLE IF EXISTS public."food_facts";

CREATE TABLE IF NOT EXISTS public."food_facts"
(
    id integer NOT NULL DEFAULT nextval('"food_facts_id_seq"'::regclass),
    "food_name" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "public_food_key" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    calcium double precision NOT NULL,
    carbohydrates double precision NOT NULL,
    classification double precision NOT NULL,
    energy double precision NOT NULL,
    "fat_fotal" double precision NOT NULL,
    iodine double precision NOT NULL,
    magnesium double precision NOT NULL,
    potassium double precision NOT NULL,
    protein double precision NOT NULL,
    "saturated_fat" double precision NOT NULL,
    sodium double precision NOT NULL,
    "total_dietary_fibre" double precision NOT NULL,
    "total_sugars" double precision NOT NULL,
    CONSTRAINT "food_facts_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."food_facts"
    OWNER to postgres;

    ALTER TABLE public.food_facts
ADD COLUMN creation_ts TIMESTAMP NOT NULL DEFAULT current_timestamp;

-- Add the last_modified_ts column with a default value of the current timestamp
ALTER TABLE public.food_facts
ADD COLUMN last_modified_ts TIMESTAMP NOT NULL DEFAULT current_timestamp;

-- Create a function that updates last_modified_ts column
CREATE OR REPLACE FUNCTION update_last_modified_ts_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.last_modified_ts = now();
   RETURN NEW;
END;
$$ language 'plpgsql';

-- Bind the function to food_facts as a trigger
CREATE TRIGGER update_last_mod_time
BEFORE UPDATE ON public.food_facts
FOR EACH ROW
EXECUTE FUNCTION update_last_modified_ts_column();