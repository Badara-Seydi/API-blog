/**
 * Object contenant un article récupérer de la BDD
 * @typedef {object} post
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {number} category_id
 * @property {string} created_at
 * @property {string} updated_at
 */

/**
 * Object contenant un article à insérer dans la BDD
 * @typedef {object} postInput
 * @property {string} slug
 * @property {string} title
 * @property {string} excerpt
 * @property {string} content
 * @property {number} category_id
 */


 const client = require('../client');

 module.exports = {
 
     /**
      * Get all posts
      * @returns {post[]}
      */
     async getAll() {
         // L'équipe front nous demande de présenter la catgory avec son nom, comme cela était déjà le cas dans les json. Mais pour cela on doit faire une jointure avec la table category qui contient ce fameux label. Et nous on est un peu comme les dév Front, mais beaucoup quand même, fainéant. Donc on a décider, parce qu'on vient de le découvrir d'ajouter une vue (VIEW) dans notre BDD afin de nous simplifier la récupération SQL du côté applicatif.
         // Une vue c'est une sorte de favoris de requête (on a stocker cette requête dans la BDD) qui requêtable. Comme si c'était une table a part entière.
         const result = await client.query(`SELECT * FROM post_category`);
         return result.rows;
     },
 
     /**
      * Get one posts from its id
      * @returns {post}
      */
     async getById(id) {
         const result = await client.query(`SELECT * FROM post_category WHERE id = $1`, [id]);
         return result.rows[0];
     },
 
     /**
      * Get all posts from a category id
      * @returns {post[]}
      */
     async getByCategoryId(categoryId) {
         const result = await client.query(`SELECT * FROM post_category WHERE category_id = $1`, [categoryId]);
         return result.rows;
 
     },
 
     /**
      * Add a post to database
      * @param {postInput} data 
      * @returns {post}
      */
     async add(data) {
         // ! ATTENTION ici on ne peut pas utiliser la vue post_category, une vue ce n'est QUE pour récupérer de l'information. Ce n'est en aucun cas un pont pour ajouter ou modifier ou supprimer des données
         const result = await client.query(`INSERT INTO post (slug, title, excerpt, content, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [data.slug, data.title, data.excerpt, data.content, data.category_id]);
         return result.rows[0];
     }
 
 }