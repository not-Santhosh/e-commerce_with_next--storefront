import Image from 'next/image'
import React from 'react'

const Gallery = ({ media }: { media: string[] }) => {
    return (
        <div className='flex flex-col gap-3 max-w-[500px]'>
            <Image alt='product' width={500} height={500} src={media[0]} className='w-96 h-96 rounded-lg shadow-xl object-cover' />
            <div className='flex gap-2 overflow-auto tailwind-scrollbar-hide'>
                {media.map((item, index) => (
                    <Image key={index} alt='product' width={200} height={200} src={item} className='w-20 h-20 rounded-lg shadow-xl object-cover' />
                ))}
            </div>
        </div>
    )
}

export default Gallery
