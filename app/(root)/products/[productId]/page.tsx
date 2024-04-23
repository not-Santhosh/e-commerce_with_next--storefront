import Gallery from '@/components/Gallery';
import { getProductDetails } from '@/lib/actions'
import React from 'react'

const page = async ({params}: {params: {productId: string}}) => {

    const productDetails = await getProductDetails(params.productId);

    return (
        <div className='flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center'>
            <Gallery media={productDetails.media}/>
        </div>
    )
}

export default page
