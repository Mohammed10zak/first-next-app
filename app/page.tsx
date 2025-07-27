import { getServerSession } from "next-auth";
import ProductCard from "./components/ProductCard/ProductCard";
// import Image from "next/image";
// import coffee from '@/public/images/coffee.jpeg'
import { authOptions } from "./api/auth/authOptions";
import Link from "next/link"
import { Metadata } from "next";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="relative h-screen">
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1>
      <Link href="/users">users</Link>
      <ProductCard />
      {/* <Image
        src="https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d"
        alt="Coffee"
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        quality={100}
        priority  
      /> */}
    </main>
  );
}
export async function generateMetadata(): Promise<Metadata> {
// const product = await fetch('');
return{
  title:'first next app',
  description:'....'

}  

}