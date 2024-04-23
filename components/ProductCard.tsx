"use client"

import { useUser } from '@clerk/nextjs';
import { Heart, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const ProductCard = ({ product }: { product: ProductType }) => {

  const router = useRouter();
  const {user} = useUser();
  const [loading, setLoading] = useState(false);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async() => {
    try {
      setLoading(true);
      const res = await fetch('/api/users');

      if (!res.ok) {
        toast.error("Something went wrong...");
        return false;
      }

      const data = await res.json();
      setSignedInUser(data);
      setIsLiked(data.wishlist.includes(product._id))
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  const handleLike = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setIsLiked(updatedUser.wishlist.includes(product._id));
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  }

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user])
  
  return (
    <Link href={`/products/${product._id}`} className='w-[220px] flex flex-col gap-2'>
      <Image src={product.media[0]} alt={product.title} width={350} height={200} className='h-[250px] rounded-lg object-cover' />
      <div>
        <p className='text-base-bold'>{product.title}</p>
        <p className='text-small-medium text-grey-2'>{product.category}</p>
      </div>
      <div className='flex justify-between items-center'>
        <p className='text-base-bold'>${product.price}</p>
        <button onClick={(e) => handleLike(e)}>
          <Heart fill={`${isLiked ? "red" : "white"}`} />
        </button>
      </div>
    </Link>
  )
}

export default ProductCard
