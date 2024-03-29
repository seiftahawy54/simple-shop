const createProductSchema = {
    body: {
        type: 'object',
        properties: {
            name: {type: 'string'},
            description: {type: 'string'},
        },
        required: ['name', 'description'],
    },
}

export default {
    createProductSchema
}