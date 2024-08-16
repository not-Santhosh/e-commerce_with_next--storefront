'use client';

import { MinusCircle, PlusCircle } from "lucide-react";
import HeartFavorite from "./HeartFavorite";
import { useState } from "react";

import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({info }: {info: ProductType}) => {
  console.log(info);
  
  const [selectedColor, setSelectedColor] = useState<string>(info?.color[0]);
  const [selectedSize, setSelectedSize] = useState<string>(info?.size[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const cart = useCart();

  return (
    <div className='max-w-[400px] flex flex-col gap-4'>
      <div className="flex justify-between items-center">
        <p className='text-heading-3-bold'>{info.title}</p>
        {/* <HeartFavorite product={info} /> */}
      </div>

      <div className="flex gap-2">
        <span className="text-base-medium text-grey-2">Category:</span>
        <span className="text-base-bold">{info.category}</span>
      </div>

      <p className="text-heading3-bold">$ {info.price}</p>

      <div className="flex flex-col gap-2">
        <span className="text-base-medium text-grey-2">Description:</span>
        <span className="text-small-medium">{info.description}</span>
      </div>

      {info.color?.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-base-medium text-grey-2">Colors:</span>
          <div className="flex gap-2">
            {info.color.map((color, index) => (
              <span
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedColor === color ? 'bg-black text-white' : ''}`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}

      {info.size?.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-base-medium text-grey-2">Sizes:</span>
          <div className="flex gap-2">
            {info.size.map((size, index) => (
              <span
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${selectedSize === size ? 'bg-black text-white' : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-base-medium text-grey-2">Quantity</span>
        <div className="flex gap-4 items-center">
          <MinusCircle className="hover:text-red-1 cursor-pointer" onClick={() => quantity > 1 && setQuantity(quantity - 1)} />
          <span className="text-body-bold">{quantity}</span>
          <PlusCircle className="hover:text-red-1 cursor-pointer" onClick={() => setQuantity(quantity + 1)} />
        </div>
      </div>

      <button 
        className="outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={() => {cart.addItem({item: info, size: selectedSize, color: selectedColor, quantity})}}
        >
        Add To Cart
      </button>
    </div>

  )
}

export default ProductInfo
