import Fastify, {FastifyInstance} from 'fastify'
import dotenv from 'dotenv'
import multer from "fastify-multer";
import mySql from '@fastify/mysql';
import AllRoutes from './routes'
import path from "path";

dotenv.config()

const server: FastifyInstance = Fastify({
    logger: true,
})

// register mysql
server
    .register(mySql, {
        connectionString: process.env.DATABASE_URL
    });

const upload = multer({
    storage: multer.diskStorage({
        destination: path.resolve('uploads'),
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
})

server.register(multer.contentParser)

server.register(AllRoutes, {
    prefix: '/api',
})

const start = async () => {
    try {
        const PORT = parseInt(<string>process.env.PORT) || 3000;
        await server.listen({port: PORT})
        console.log(`server listening on ${PORT}`)

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}

start()
    .then(() => console.log('App started'))
    .catch(err => {
        console.log(err)
    })