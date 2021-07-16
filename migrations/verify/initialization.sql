-- Verify oblogzere:initialization on pg

BEGIN;

SELECT id FROM category WHERE false;
SELECT id FROM post WHERE false;

ROLLBACK;
