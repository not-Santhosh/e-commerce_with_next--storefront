export const getCollections = async() => {
    const collections = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/collections`);
    return await collections.json();
}

export const getProducts = async() => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
    return await res.json();
}

export const getProductDetails = async (productId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`);
    return await res.json();
}