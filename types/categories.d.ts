export type createCategoryBody = {
    name: string,
    description: string,
    isParent?: boolean,
    parentCategoryId?: string,
    picture?: string
}
