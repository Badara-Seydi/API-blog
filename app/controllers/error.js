module.exports = {

    resourceNotFound(_, response){
        response.status(404).json({data: [], error: `Cette ressource est introuvable`});
    }

}