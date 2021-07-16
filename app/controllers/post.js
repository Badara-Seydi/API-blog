const postDataMapper = require('../dataMappers/post');

module.exports = {

    /**
     * Controller which respond the list of all posts
     * @param {Object} _ request not used
     * @param {Object} response response objet from express middleware
     */
     async list (_, response) {
        try {
            const posts = await postDataMapper.getAll();
            response.json({data: posts});
        }catch(error){
            console.trace(error);
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer utlérieurement.`});
        }
    },

    /**
     * Controller which respond one post from its id
     * @param {Object} request 
     * @param {Object} response 
     */
     async post (request, response, next) {
        try {
            const post = await postDataMapper.getById(request.params.id);

            // Ici il faut se charge du milie on doit vérifier que l'on a bien récupérer un post en fonction de l'id. Si ce n'est pas le cas a ce moment on considère que c'est une resource non-trouvée donc une erreur 404
            // Donc pour ce faire on renvoi la balle au middleware suivant, qui finira de tout de façon dans celui qui répond une erreur 404
            if(!post){
                return next();
            }

            response.json({data: post});
        }catch(error){
            console.trace(error);
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },

    /**
     * Controller which respond the list of all posts
     * @param {Object} _ request not used
     * @param {Object} response response objet from express middleware
     */
     async listByCategory (request, response, next) {
        try {
            // Ici on va devoir faire une double requête, on doit d'abord s'assurer que la catégorie existe bien, et si c'est le cas alors on récupère les posts de celle-ci
            const category = await categoryDataMapper.getById(request.params.categoryId);

            if(!category){
                return next();
            }

            const posts = await postDataMapper.getByCategoryId(request.params.categoryId);

            response.json({data: posts});
        }catch(error){
            console.trace(error);
            response.json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },


};

