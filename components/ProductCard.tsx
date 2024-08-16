"use client"
import Image from 'next/image';
import Link from 'next/link';
import HeartFavorite from './HeartFavorite';

const ProductCard = ({ product }: { product: ProductType }) => {
  
  return (
    <Link href={`/products/${product._id}`} className='w-[220px] flex flex-col gap-2'>
      <Image src={product.media[0]} alt={product.title} width={350} height={200} className='h-[250px] rounded-lg object-cover' />
      <div>
        <p className='text-base-bold'>{product.title}</p>
        <p className='text-small-medium text-grey-2'>{product.category}</p>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-base-bold'>${product.price}</p>
        {/* <HeartFavorite product={product} /> */}
      </div>
    </Link>
  )
}

export default ProductCard
