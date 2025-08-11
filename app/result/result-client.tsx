'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function ResultClient() {
  const params = useSearchParams();
  const scoreParam = params.get('score');
  const [label, setLabel] = useState<string>('');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scoreParam) return;
    const s = Number(scoreParam);
    if (Number.isFinite(s)) {
      if (s < 40) setLabel('Bill Mode: Calm, Connected, Curious 🛋');
      else if (s <= 60) setLabel('Balanced: Agile & Aware 🐾');
      else setLabel('Hilda Mode: Sharp, Driven, Focused 🐺');
    }
  }, [scoreParam]);
  
const enableDownload =
  process.env.NEXT_PUBLIC_ENABLE_DOWNLOAD === 'true';

  const handleDownload = async () => {
    if (!resultRef.current) return;

    const { default: html2canvas } = await import('html2canvas');

    const canvasEl = await html2canvas(resultRef.current, {
      backgroundColor: '#ffffff',
      scale: window.devicePixelRatio || 2,
      scrollX: 0,
      scrollY: -window.scrollY,
      useCORS: true,
      onclone: (doc) => {
        const node = doc.getElementById('result-card') as HTMLElement | null;
        if (!node) return;

        // Strip Tailwind classes in the *clone* to avoid OKLCH utilities
        node.className = '';
        node.querySelectorAll<HTMLElement>('*').forEach((el) => {
          el.className = '';
        });

        // Force hex/sRGB styles
        const applySafe = (el: HTMLElement) => {
          if (el === node) {
            el.style.backgroundColor = '#ffffff';
            el.style.border = '1px solid #e5e7eb';
            el.style.boxShadow = 'none';
          } else {
            el.style.backgroundColor = 'transparent';
            el.style.borderColor = '#e5e7eb';
            el.style.boxShadow = 'none';
          }
          const isHeading = /^H\d$/i.test(el.tagName);
          el.style.color = isHeading ? '#111111' : '#374151';
        };

        applySafe(node);
        node.querySelectorAll<HTMLElement>('*').forEach(applySafe);
      },
    });

    canvasEl.toBlob((blob: Blob | null) => {
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
      <div
        ref={resultRef}
        id="result-card"
        className="p-6 rounded-xl shadow-md max-w-md w-full"
        style={{
          backgroundColor: '#ffffff',
          color: '#111111',
          border: '1px solid #e5e7eb',
        }}
      >
        <h1 className="text-2xl font-bold mb-4" style={{ color: '#111111' }}>
          Your Result
        </h1>
        <p className="text-lg mb-6" style={{ color: '#374151' }}>
          {label}
        </p>
        <img
          src="/result-dog.png"
          alt="Result Illustration"
          className="w-48 h-auto mx-auto mb-4"
        />
      </div>

      <button
        onClick={handleDownload}
        className="mt-6 text-white font-bold py-2 px-4 rounded-full"
        style={{ backgroundColor: '#f59e0b' }}
      >
        Download Your Result
      </button>
    </main>
  );
}
