-- Verify oblog:post_view on pg

BEGIN;

SELECT category FROM post_category WHERE false;

ROLLBACK;
