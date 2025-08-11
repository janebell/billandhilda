'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Result() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score');
  const [label, setLabel] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!score) return;
    const s = parseFloat(score);
    if (s < 40) setLabel('Bill Mode: Calm, Connected, Curious 🛋');
    else if (s <= 60) setLabel('Balanced: Agile & Aware 🐾');
    else setLabel('Hilda Mode: Sharp, Driven, Focused 🐺');
  }, [score]);

  const handleDownload = async () => {
    if (!resultRef.current) return;

    // Dynamic import prevents any bundling/SSR hiccups
    const { default: html2canvas } = await import('html2canvas');

    const canvas = await html2canvas(resultRef.current, {
      useCORS: true,            // fine for /public images; keeps canvas untainted if remote later
          backgroundColor: '#ffffff',    // keeps background transparent (or inherit)
      scale: window.devicePixelRatio || 2, // crisp export on HiDPI
      scrollX: 0,
      scrollY: -window.scrollY,
       onclone: (clonedDoc) => {
      const node = clonedDoc.getElementById('result-card');
      if (node) node.classList.add('h2c-fallback'); // <-- RGB/hex colors only
    },
    });

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'your-result.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-50 text-center">
      <div ref={resultRef} id="result-card" className="bg-white p-6 rounded-xl shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Your Result</h1>
        <p className="text-lg text-gray-700 mb-6">{label}</p>

        <img
          src="/result-dog.png"
          alt="Result Illustration"
          className="w-48 h-auto mx-auto mb-4"
        />
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full"
      >
        Download Your Result
      </button>
    </main>
  );
}
