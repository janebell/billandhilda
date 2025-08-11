'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center px-4 pt-4 pb-6 sm:pt-10 sm:pb-12">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center -mt-[50px] mb-4 text-gray-800">
        Are You Bill or Hilda Today?
      </h1>

      <img
        src="/bill-hilda-start.png"
        alt="Bill and Hilda"
        className="w-64 h-auto mb-6"
      />

      <p className="text-lg text-center mt-1 mb-6 text-gray-600 max-w-md">
        Bill and Hilda are high performing leaders, who each bring unique superpowers to their team...
        even if their big project is conquering the couch. 
        Take this quick self-check to find out your leadership strengths.
      </p>

      <Link href="/quiz">
        <button className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:scale-105 transition-transform">
          Sniff my style
        </button>
      </Link>
    </main>
  );
}
