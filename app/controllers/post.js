const postDataMapper = require('../dataMappers/post');
const categoryDataMapper = require('../dataMappers/category');

module.exports = {

    /**
     * Controller which respond the list of all posts
     * @param {Object} _ request not used
     * @param {Object} response response objet from express middleware
     */
     async list (_, response) {
        try {
            const posts = await postDataMapper.getAllWithCategory();
            response.json({data: posts});
        }catch(error){
            console.trace(error);
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },

    /**
     * Controller which respond one post from its id
     * @param {Object} request 
     * @param {Object} response 
     */
    async get (request, response, next) {
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
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
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
            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    },

    async add(request, response){
        try{
            const post = await postDataMapper.add(request.body);
            response.json({data: post});

        }catch(error){
            console.trace(error);

            // Grâce au try catch on a maitrise toute erreur qui peut intervenir dans le traitement de la route, à l'intérieur du controller. Ce qui permet d'analyser ces erreurs et d'afficher un message qui colle au plus prêt de la signification de l'erreur.
            // Dans notre cas, il peut y avoir un retour d'erreur duplicate de la BDD. Au lieu de faire une première requête de select pou vérifier que l'article n'est pas déjà présent. et comme on a utiliser la contrainte unique en BDD. On peut faire en sorte de récupérer les code erreur 23505 qui est et sera toujours le code d'erreur de "duplicate entry". Cela nous permet de personnaliser l'erreur et surtout d'en faire une erreur utilisateur plutôt q'une erreur serveur.
            if(error.code === '23505'){
                return response.status(400).json({data: [], error: `Cet article existe déjà dans la base donnée, veuillez utiliser un slug différent`});
            }

            response.status(500).json({data: [], error: `Désolé une erreur serveur est survenue, veuillez réessayer ultérieurement.`});
        }
    }

};