-- Table: public.FoodFacts

-- DROP TABLE IF EXISTS public."FoodFacts";

CREATE TABLE IF NOT EXISTS public."FoodFacts"
(
    id integer NOT NULL DEFAULT nextval('"FoodFacts_id_seq"'::regclass),
    "foodName" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "publicFoodKey" character varying(255) COLLATE pg_catalog."default" NOT NULL,
    calcium double precision NOT NULL,
    carbohydrates double precision NOT NULL,
    classification double precision NOT NULL,
    energy double precision NOT NULL,
    "fatTotal" double precision NOT NULL,
    iodine double precision NOT NULL,
    magnesium double precision NOT NULL,
    potassium double precision NOT NULL,
    protein double precision NOT NULL,
    "saturatedFat" double precision NOT NULL,
    sodium double precision NOT NULL,
    "totalDietaryFibre" double precision NOT NULL,
    "totalSugars" double precision NOT NULL,
    CONSTRAINT "FoodFacts_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."FoodFacts"
    OWNER to postgres;