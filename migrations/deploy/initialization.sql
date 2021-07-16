-- Deploy oblogzere:initialization to pg

BEGIN;

CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- Une route ne peut contenir des lettres minuscules et le caractère '-', et doit avoir au moins 2 caractères
    "route" TEXT NOT NULL UNIQUE CHECK (route ~ '^/[a-z-]*$'),
    "label" TEXT NOT NULL UNIQUE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),    -- Date de création
    "updated_at" TIMESTAMPTZ                            -- Date de mise à jour
);

CREATE TABLE "post" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    -- On autorise que les lettres minuscules, les chiffres et le caractère '-' et doit avoir au moins 2 caracteres
    "slug" TEXT NOT NULL UNIQUE CHECK (slug ~ '^[a-z0-9-]{2,}$'),
    "title" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category_id" INTEGER REFERENCES "category" ("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),    -- Date de création
    "updated_at" TIMESTAMPTZ                            -- Date de mise à jour
);

COMMIT;
