export default (product): string => {
    const categories = product.category && product.category.sort((a, b) => b.category_id - a.category_id)

    return (categories && categories[0] && categories[0].name) ? categories[0].name : 'Unknown'
}