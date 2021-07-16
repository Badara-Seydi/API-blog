/*
Le rôle du controller est de récupérer d'un côté les données.
Au milieu de les vérifier, traiter, transformer.
Et à la fin de les renvoyer à l'utilisateur sous forme de texte (brut ou html), JSON, XML, YAML, enfin toute structure permettant à l'utilisateur d'exploiter au mieux l'information.
*/
/* On a besoin de renvoyer les données des categories qui sont stockées dans la BDD, donc on utilise le dataMapper des catégories*/
const { response } = require('express');
const categoryDataMapper = require('../dataMappers/category');

module.exports = {

    // Comme on va utiliser des méthodes du dataMapper dans le controller et que les méthode du dataMappers sont asynchrone, il faut aussi que le controller le soit.
    async list() {
        // C'est ici qu'on va utiliser le try catch
        try {
            /*Récuperation des donnés*/
            const categories = await categoryDataMapper.getAll();
            
            /*Renvoi des données*/
            /* On peut les renvoyer dans une enveloppe {data: categories} ou pas {categories}*/

            response.json({data: categories});
        }catch(error){
             // En ce qui concerne les erreurs on peut par défaut afficher ces erreurs en console. DAans le cas d'un application professionnel on stockerais plutôt ces erreurs dans un fichier de log consultable ultérieurement. Mais nous on s'arrête là c'est plus simple.
             console.trace(error);
             // Pour l'utilisateur on affiche pluôt une erreur générique lui spécifiant qu'une erreur serveur s'est produite.
             response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer utlérieurement.`});

        }
    }

};