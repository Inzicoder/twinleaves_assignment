

const API_URL = 'https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products';


export const fetchProducts = async (page, sort, order) => {
    const response = await fetch(`${API_URL}/?page=${page}&sort=${sort || ''}&order=${order || ''}`);

    const data = await response.json();


    // Generate a random array of prices
    const randomPrices = [50, 75, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    
    // Generate a random array of images
    const randomImgs = [
        
        'https://plus.unsplash.com/premium_photo-1670253258590-9bfea76faacd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmlzY3VpdHN8ZW58MHx8MHx8fDA%3D'
    ];

    const productsWithPricesAndImages = data.products.map((product, index) => ({
        id: product.id ?? `${index + 1}`,
        name: product.name,
        price: product.mrp.mrp === 0
            ? randomPrices[Math.floor(Math.random() * randomPrices.length)]
            : product.mrp.mrp,
        currency: product.mrp.currency,
        category: product.category_level_1,
        image: product.image ?? randomImgs[Math.floor(Math.random() * randomImgs.length)],
        description: product.description
    }));

    // Sort products based on price only if sort parameters are provided
    const sortedProducts = sort ? productsWithPricesAndImages.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        return order === 'asc' ? priceA - priceB : priceB - priceA;
    }) : productsWithPricesAndImages;

    return {
        products: sortedProducts.map(product => ({
            ...product,
            price: `${product.price} ${product.currency}`,
        })),
        totalPages: data.totalPages,
    };
};



