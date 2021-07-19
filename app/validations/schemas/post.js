const Joi = require('joi');

// L'ordre de définition des règle n'est pas iportant au même titre qu'il n'est pas important dans un objet JS en général, car un objet n'est qu'énumérable.
// Ici on rend obligatoire toutes les propriétés, et on précise qui faut qu'il est obligatoirement 5 propriété comme décrite dans le schéma
module.exports = Joi.object({
    slug: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    excerpt: Joi.string().min(20).required(),
    content: Joi.string().min(50).required(),
    category_id: Joi.number().integer().min(1).required()
}).required().length(5);