import {FastifyInstance, FastifyPluginOptions} from "fastify";
import ProductsController from '../controllers/products.js'
import ProductsSchema from '../validation/products.schema.js'

export default async (fastify: FastifyInstance, options: FastifyPluginOptions) => {
    fastify.post('/', {
        schema: {
            ...ProductsSchema.createProductSchema,
            response: {
                201: {
                    type: 'object',
                    properties: {
                        id: {type: 'string'},
                        name: {type: 'string'},
                        description: {type: 'string'},
                        picture: {type: 'string'},
                    },
                },
            }
        }
    }, ProductsController.create)
    fastify.get('/', ProductsController.getAll)
    fastify.get('/:id', {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        name: {type: 'string'},
                        description: {type: 'string'},
                        picture: {type: 'string'},
                    },
                },
            }
        }
    }, ProductsController.getById)
    fastify.put('/:id', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    name: {type: 'string'},
                    description: {type: 'string'},
                    picture: {type: 'string'},
                },
            },
        }
    }, ProductsController.update)
}