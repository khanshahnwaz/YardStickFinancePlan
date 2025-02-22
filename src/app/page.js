import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-blue-600 min-h-screen flex flex-col items-center justify-center text-white">
      
      
      <header className="w-full flex justify-between items-center p-4 max-w-6xl absolute top-0 left-0 right-0 mx-auto">

        <div className="text-lg font-bold">YardStick</div>
        <nav className="flex space-x-6">
          <Link href="/stage/stage1" className="hover:underline">Stage1</Link>
          <Link href="/stage/stage2" className="hover:underline">Stage2</Link>
          <Link href="/stage/stage3" className="hover:underline">Stage3</Link>
          <a href="#" className="hover:underline">Resources</a>
        </nav>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-lg"><Link href="/Dashboard">Dashboard</Link></button>
      </header>
      
      <main className="flex flex-col items-center text-center px-4">
        <h1 className="text-4xl font-bold">
          Optimize <span className="text-gray-300">Your Growth With</span>
          <br /> Advanced Finance Technology
        </h1>
        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
          A smart, all-in-one solution for managing global business operations and scaling company spend.
        </p>
        <div className="mt-6 flex space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">Get Started</button>
          <button className="bg-transparent border border-white px-6 py-3 rounded-lg font-semibold">Contact</button>
        </div>
        <p className="mt-4 text-sm text-gray-300">⭐ Trusted by +20k people</p>
      </main>
      
      <div className="absolute bottom-0 left-0 text-[10rem] font-bold text-white opacity-10">
        YardStick
      </div>
    </div>
  );
}
