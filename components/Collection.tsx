import React from 'react'

import { getCollections } from '@/lib/actions'
import Link from 'next/link';
import Image from 'next/image';

const Collection = async () => {

    const collections = await getCollections();

    return (
        <div className='flex flex-col gap-10 items-center py-8 px-5'>
            <p className='text-heading1-bold'>Collections</p>
            
            {!collections || collections.length === 0 ? (
                <p className='text-body-bold'>No Collection Found</p>
            ): 
            (<div className="flex items-center justify-between gap-8">
                {collections.map((collection: CollectionType) => {
                    return (<Link href={`/collections/${collection._id}`} key={collection._id}>
                        <Image src={collection.image} alt={collection.image} width={350} height={200} className='rounded-lg cursor-pointer'/>
                    </Link>)
                })}
            </div>
            )}
        </div>
    )
}

export default Collection
