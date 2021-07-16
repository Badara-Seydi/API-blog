
/*
! Attention ce fichier ne doit pas être utilisé avec nodemon/node-dev
*/
// On importe les donénes à importer en BDD
const categories = require('./categories.json');
const posts = require('./posts.json');

// ! Attention ici il ne faut pas oublier de récupérer les variables d'environnement défini dans le .env, et pour cela il faut utiliser le module dotenv
require('dotenv').config();

// Ensuite on doit se connecter à la base données pour y ajouter ces données
// Il nous faut un connecteur
const client = require('../app/client');

// On commence par catégories.
// Pourquoi ?
// Parce que l'on aura besoin des ids de catégories pour les préciser dans les articles

// Comme je dois créer une function async pour pouvoir utiliser await, mais qu cette function ne sera pas réutilisé, je vais créer ce qui s'appelle une IIFE (Immediately Invoked Function Expression)
(async () => {

    const categoryIdMap = {};

    for (const category of categories) {

        try {
            // ici pour cahque catégorie je vais faire une insertion dans la table category
            const result = await client.query(`INSERT INTO category ("route", "label") VALUES ($1,$2) RETURNING id`, [category.route, category.label]);

            const categoryId = result.rows[0].id;

            // Afin de savoir quel label correspond à quel id on utilise un objet. Le label sera la clé et l'id la valeur.
            categoryIdMap[category.label] = categoryId;

            console.log(`Category ${category.label} has been inserted with id ${categoryId}`);
        } catch (error) {
            console.error(error);
        }

    }
    console.log(categoryIdMap);

    for(const post of posts){

        try {
            /*const result = await client.query(
                `INSERT INTO post ("slug", "title", "excerpt","content", "category_id") VALUES ($1,$2,$3,$4,$5) RETURNING id`, 
                [
                    post.slug, 
                    post.title,
                    post.excerpt,
                    post.content,
                    // Et ici je peux récupérer l'id en fonction du label grâce à l'objet précédemment construit dans la boucle des catégories
                    categoryIdMap[post.category]
                ]
            );

            const postId = result.rows[0].id;

            console.log(`Post ${post.title} has been inserted with id ${postId}`);*/
        } catch (error) {
            console.error(error);
        }

    }

    // Une fois que l'on a fini ce que l'on avait à faire on oubli de fermer la connection à la BDD
    client.end();
})();