-- Revert oblogzere:initialization from pg

BEGIN;

DROP TABLE post, category;

COMMIT;
