import { getProducts } from '@/lib/actions'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import ProductCard from './ProductCard';

const Product = async () => {
    const products = await getProducts();
    console.log(products);
    
    return (
        <div className='flex flex-col items-center gap-10 py-8 px-5'>
            <p className="text-heading1-bold">Products</p>
            {!products || products.length === 0 ? (
                <div className='text-body-bold'>No Products Found</div>
            ):
            (
                <div className='flex flex-wrap mx-auto gap-16'>
                    {products.map((product: ProductType) => <ProductCard key={product._id} product={product}/>)}
                </div>
            )}
        </div>
    )
}

export default Product
