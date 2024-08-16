type CollectionType = {
    _id: string;
    title: string;
    products: number;
    image: string;
};

type ProductType = {
    _id: string;
    title: string;
    description: string;
    media: [string];
    category: string;
    collections: [string];
    tags: [string];
    price: number;
    cost: number;
    size: [string];
    color: [string];
    createdAt: string;
    updatedAt: string;
};

type cart = {
    item: ProductType,
    quantity: number,
    color?: string,
    size?: string,
};

type UserType = {
    clerkId: string;
    wishlist: string[];
    cartItems: cart[];
    createdAt: string;
    updatedAt: string;
};

type OrderType = {
    shippingAddress: Object;
    _id: string;
    customerClerkId: string;
    products: [OrderItemType]
    shippingRate: string;
    totalAmount: number
}

type OrderItemType = {
    product: ProductType;
    color: string;
    size: string;
    quantity: number;
    _id: string;
}