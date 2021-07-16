const client = require('../client');

module.exports = {

    async getAllPost() {
        const result = await client.query(`SELECT * FROM post`);
        return result.rows;
    },

    async getPOstById (id) {
        const result = await client.query(`SELECT * FROM post WHERE id = $1`, [id]);
        //on veut le 1er resultat , result retourne un tableau et on veut le 1er index [0]
        return result.rows[0]
    },

    async getPostByCategoryId(categoryId){
        const result = await client.query(`SELECT * FROM post WHERE category_id = $1`, [categoryId]);
        return result.rows;
    }

}