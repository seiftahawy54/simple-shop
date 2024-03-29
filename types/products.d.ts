import {FastifyRequest} from "fastify";

type createProductBody = {
    name: string,
    description: string,
}

type ImageUploadRequest = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
}


export {createProductBody, ImageUploadRequest}