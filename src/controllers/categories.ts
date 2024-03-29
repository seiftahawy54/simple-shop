import {FastifyReply, FastifyRequest} from "fastify";
import prisma from "../utils/db.js";
import {ImageUploadRequest} from "../../types/products.js";
import {createCategoryBody} from "../../types/categories.js";
import {ParentCategory} from "@prisma/client";

const create = async (req: FastifyRequest<{
    Body: createCategoryBody,
    File: ImageUploadRequest
}>, reply: FastifyReply) => {
    try {
        let parentCategoryId = null;
        let itsParent: ParentCategory | null = null;
        if (!req.body.isParent && !req.body.parentCategoryId) {
            // create a root category
            return reply.status(400).send({message: 'Parent category is required'})
        }
        // create a parent category if isParent
        if (req.body.isParent) {
            parentCategoryId = (await prisma.parentCategory.create({ data: {} })).id
        } else {
            itsParent = await prisma.parentCategory.findMany({
                where: {
                    id: req.body.parentCategoryId
                }
            })
            if (!itsParent) {
                return reply.status(400).send({message: 'Parent category not found'})
            }
        }

        const createdCategory = await prisma.category.create({
            data: {
                ...req.body,
                parentCategoryId: req.body?.isParent ? parentCategoryId : null,
                picture: process.env.NODE_ENV !== 'production' ? 'testing' : req.file?.filename
            }
        });

        // Add to children
        if (parentCategoryId && itsParent && itsParent?.children) {
            await prisma.parentCategory.update({
                where: {
                    id: parentCategoryId
                },
                data: {
                    children: [
                        ...itsParent.children,
                        createdCategory.id
                    ]
                }
            })
        }

        return reply.send(createdCategory)
    } catch (e) {
        return e
    }
}

const getAll = async (req: FastifyRequest, reply: FastifyReply) => {
    try {
        const categories = await prisma.parentCategory.findMany({
            // include: {
            //     children: true
            // }
        })
        return reply.send(categories)
    } catch (e) {
        return e
    }
}

const getById = async (req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) => {
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

const update = async (req: FastifyRequest<{
    Params: { id: string },
    Body: createProductBody
}>, reply: FastifyReply) => {
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