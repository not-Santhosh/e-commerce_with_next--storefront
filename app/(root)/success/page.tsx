import Image from "next/image"
import '../../payment.css'
import Link from "next/link"

const page = () => {
  return (
    <div className="my-[50px]">    
        <div className="flex justify-center">
            <Image src={'/payment.svg'} alt="success" className="w-[80vh] h-[50vh]" width={20} height={600} />
        </div>
        <div className="text-center">
            <h2 className="text-heading-2 mb-4">Payment has been recorded successfully</h2>
            <Link href={'/'} className="text-white hover:bg-gray-700 bg-black px-5 py-2 rounded-lg mt-5">Continue Shopping</Link>
        </div>
    </div>
  )
}

export default page
