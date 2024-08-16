'use client';
import Image from 'next/image'
import { useState } from 'react'

const Gallery = ({ media }: { media: string[] }) => {
    const [mainImage, setMainImage] = useState(media[0]);
    console.log({ media });
    return (
        <div className='flex flex-col gap-3 max-w-[500px]'>
            <Image alt='product' width={500} height={500}
                src={mainImage}
                className='w-96 h-96 rounded-lg shadow-xl object-cover' 
            />
            <div className='flex gap-2 overflow-auto tailwind-scrollbar-hide'>
                {media.map((item, index) => (
                    <Image key={index}
                        alt='product'
                        width={200} height={200} src={item}
                        className={`w-20 h-20 rounded-lg shadow-xl object-cover cursor-pointer 
                        ${mainImage === item ? 'border-2 border-black' : ''}`}
                        onClick={() => setMainImage(item)}  
                    />
                ))}
            </div>
        </div>
    )
}

export default Gallery
