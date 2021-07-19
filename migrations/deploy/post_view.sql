-- Deploy oblog:post_view to pg

BEGIN;

CREATE VIEW post_category AS
    SELECT 
    post.*,
    category.label AS category
    FROM post
    JOIN category ON post.category_id = category.id;

COMMIT;
