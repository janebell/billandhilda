'use client';
import { track } from '@vercel/analytics';
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  const enc = encodeURIComponent;
  const coffeeSubject = "Let's grab a coffee & connect";
  const coffeeBody =
    "Hi Jane, I was really impressed with your leadership perspective presentation. I'd love to connect for a coffee to learn more about your career, aspirations and share my professional insights & learnings with you. Please find a time that suits us both in my calendar, and book in.";


  const mailtoLink = `mailto:jane.bell@afl.com.au?subject=${enc(coffeeSubject)}&body=${enc(coffeeBody)}`;

  const secondaryBase =
    'inline-flex items-center justify-center text-sm font-semibold rounded-full shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center px-4 pb-6 sm:pt-10 sm:pb-12 pt-[calc(env(safe-area-inset-top)+8px)]">
     <h1 className="text-3xl sm:text-4xl font-extrabold text-center mt-0 mb-4 text-gray-800">
        Are You Bill or Hilda Today?
      </h1>

<Image src="/bill-hilda-start.png" alt="Bill and Hilda" width={256} height={256} className="w-64 h-auto mb-6" priority />

      <p className="text-lg text-center mt-1 mb-3 text-gray-600 max-w-md">
        Bill and Hilda are high performing leaders, who each bring unique superpowers to their team ...even if their big project is conquering the couch. Take this quick self-check to find out your leadership strengths.
      </p>

      {/* Primary CTA */}
      <Link
        href="/quiz"
        onClick={() => track('quiz_start')}
        className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold py-4 px-6 rounded-full shadow-lg hover:scale-105 transition-transform inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-pink-300"
        aria-label="Start quiz"
      >
        Sniff my style
      </Link>

      {/* Cheeky buttons */}
      <div className="mt-4 w-full max-w-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/janembell/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('cta_linkedin')}
            className={`${secondaryBase} py-2.5 px-4 bg-[#0A66C2] text-white hover:bg-[#084e96] focus:ring-[#0A66C2]`}
            aria-label="Add Jane on LinkedIn"
            title="Add Jane on LinkedIn"
          >
            Add Jane on LinkedIn
          </a>

          {/* Book a coffee via email */}
          <a
          href={mailtoLink}
           onClick={() => track('cta_email_connect')}
            className={`${secondaryBase} py-2.5 px-4 bg-pink-100 text-pink-700 border border-pink-200 hover:bg-pink-200 focus:ring-pink-300`}
            aria-label="Book a coffee with Jane"
            title="Book a coffee with Jane"
          >
            Book a coffee with Jane
          </a>
        </div>
         <div className="mt-2 flex justify-center">
  </div>
      </div>
    </main>
  );
}
