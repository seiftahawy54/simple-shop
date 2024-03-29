import {FastifyReply, FastifyRequest} from "fastify";
import prisma from "../utils/db.js";
import {createProductBody, ImageUploadRequest} from "../../types/products.js";

const create = async (req: FastifyRequest<{Body: createProductBody, File: ImageUploadRequest}>, reply: FastifyReply) => {
   try {
       const createdProduct = await prisma.product.create({
           data: {
               ...req.body,
               picture: 'testing'
           }
       });

       return reply.send(createdProduct)
   } catch (e) {
       return e
   }
}

const getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const products = await prisma.product.findMany()
        return reply.send(products)
    } catch (e) {
        return e
    }
}

const getById = async (req: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.params.id
            }
        })
        return reply.send(product)
    } catch (e) {
        return e
    }
}

const update = async (req: FastifyRequest<{Params: {id: string}, Body: createProductBody}>, reply: FastifyReply) => {
    try {
        const product = await prisma.product.update({
            where: {
                id: req.params.id
            },
            data: {
                ...req.body
            }
        })
        return reply.status(200).send(product)
    } catch (e) {
        return e
    }
}

export default {
    create,
    getAll,
    getById,
    update
}