/*
Dans un dataMapper on veut récupérer des données qui proviennt d'un source de données. On appelle cela un accesseur de données. OnLes données peuvenet provenir d'une BDD (de n'importe quel type) ou de toute autre source, comme par exemple un fichier JSON ou une autre API (mais ca on verra plus tard)
*/
// Un dataMapper est avant tout un design pattern

const client = require('../client');

module.exports = {

    // Pas de try catch ??
    // Non c'est pas ici que l'on catch l'erreur, car les erreurs sont déjà catchés au niveau du controller.
    // Euh mais pourquoi plus dans le controller que dans l'accesseur de données ?
    // Bah parce que si on a une erreur a afficher à l'utilisateur c'est au controller de s'en charger
    // Donc cela ne sert à de catch a 2 endroits différents
    async getAllCategories() {
        const result = await client.query(`SELECT * FROM category`);
        return result.rows;
    }

}