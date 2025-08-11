'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">
        Are You Bill or Hilda Today?
      </h1>

      <img
        src="/bill-hilda-start.png"
        alt="Bill and Hilda"
        className="w-64 h-auto mb-6"
      />

      <p className="text-lg text-gray-600 max-w-md mb-10">
        Bill and Hilda are high performing leaders, who each bring superpowers to their leadership skills...
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
