interface ProductData {
    name: string,
    id: string,
    price: number,
    brand: string,
    category: string,
    variant: string,
    quantity?: number
}

declare const dataLayer

export default (product, currency: string, source: string): void => {
    try {
        if(!('dataLayer' in window)) {
            throw new Error("GTM not installed")
        }

        let categoryName = null

        for(let category of product.category) {
            if(category.category_id != 2) { // Not 'Wszystkie produkty'
                categoryName = category.name
            }
        }

        const productData: ProductData = {
            name: product.name,
            id: product.sku,
            price: product.priceInclTax,
            brand: 'Kubota',
            category: categoryName,
            variant: product.size,
            quantity: product.qty
        }

        dataLayer.push({
            'event': 'productClick',
            'ecommerce': {
                'click': {
                  'actionField': {'list': source},      // Optional list property.
                  'products': [productData]
                 }
            }
        })
    } catch(e) {
        console.error(e.message)
    }
}