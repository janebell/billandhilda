// app/result/page.tsx
import { Suspense } from 'react';
import ResultClient from './result-client';

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading result…</div>}>
      <ResultClient />
    </Suspense>
  );
}
