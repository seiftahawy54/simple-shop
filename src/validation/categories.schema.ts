const createCategoriesSchema = {
    body: {
        type: 'object',
        properties: {
            name: {type: 'string'},
            description: {type: 'string'},
            isParent: {type: 'boolean'},
            parentCategoryId: {type: 'string', nullable: true},
            picture: {type: 'string'},
        },
        required: ['name', 'description'],
    },
}

export default {
    createCategoriesSchema
}