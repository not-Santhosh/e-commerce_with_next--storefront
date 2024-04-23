import Collection from "@/components/Collection";
import Product from "@/components/Product";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src={'/banner.png'} alt="banner" className="w-screen" width={2000} height={800}/>
      <Collection />
      <Product />
    </div>
  );
}
