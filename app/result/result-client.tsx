"use client";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";


const DEFAULT_THRESHOLDS = { billMax: 47, hildaMin: 53 }; 
// Balanced is the range [billMax … hildaMin]



type ResultKey = "bill" | "balanced" | "hilda";

const RESULTS: Record<
  ResultKey,
  {
    title: string;
    description: string;
    strengths: string[];
    watchouts: string[];
    connect: string[];
  }
> = {
  bill: {
    title: "Bill Mode: Sharp, Driven, Focused 🐺",
    description:
      "You're channeling Bill. You're a clever planner. You lock onto the line, trim the fluff, and move the pack forward.",
    strengths: [
      "Clear direction and confident decisions",
      "Risk scanning and contingency thinking",
      "Operational pace and guardrails",
    ],
    watchouts: [
      'Skipping the "why" or human context',
      "Missing soft signals from others while heads-down",
      "Leading the pack before everyone's on board",
    ],
    connect: [
      "Meet Hildas: open with a quick story, ask two curiosity questions, co-create one step.",
      "Meet other Bills: swap plans, define the owner, set a mid-run check.",
    ],
  },
  balanced: {
    title: "A balanced pack 🐾",
    description:
      "You're thinking as a pack: steady pace with smart people radar. You switch stride to fit the terrain.",
    strengths: [
      "Adaptive pacing and prioritisation",
      "Linking outcomes to people impact",
      "Inclusive decisions under change",
    ],
    watchouts: [
      "Hedging too long before committing",
      "Mixed signals if priorities shift mid-run",
    ],
    connect: [
      "With Bills: agree the decision gate and protect focus blocks.",
      "With Hildas: start with purpose and who it helps, then lock one crisp next step.",
    ],
  },
  hilda: {
    title: "Hilda Mode: Calm, Connected, Curious 🛋",
    description:
      "You're channeling Hilda, the connection-first greyhound. You sniff possibilities, read the room, and bring the pack with you.",
    strengths: [
      "Building trust and buy-in",
      "De-escalating tension",
      "Team morale and safety",
      "Discovery and facilitation",
    ],
    watchouts: [
      "Softening or delaying hard calls",
      'Scope creep from "just one more idea"',
      "Slower decision cadence when vibes are high",
    ],
    connect: [
      "With Bills: turn stories into criteria, timebox choices, finish with who/what/when.",
      "With other Hildas: clarify purpose, assign an owner, add one measurable checkpoint.",
    ],
  },
};

const IMAGE_BY_KEY: Record<
  ResultKey,
  { src: string; alt: string; dl: string }
> = {
  bill: {
    src: "/result-dog-bill.png",
    alt: "Bill result",
    dl: "bill-result.png",
  },
  balanced: {
    src: "/result-dog-balance.png",
    alt: "Balanced result",
    dl: "balanced-result.png",
  },
  hilda: {
    src: "/result-dog-hilda.png",
    alt: "Hilda result",
    dl: "hilda-result.png",
  },
};


export default function ResultClient() {
  const params = useSearchParams();
  const scoreParam = params.get("score");
  const [resultKey, setResultKey] = useState<ResultKey | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const billMax = Number(params.get("billMax") ?? DEFAULT_THRESHOLDS.billMax);
const hildaMin = Number(params.get("hildaMin") ?? DEFAULT_THRESHOLDS.hildaMin);

useEffect(() => {
  if (!scoreParam) return;
  const s = Number(scoreParam);
  if (!Number.isFinite(s)) return;

  if (s < billMax) setResultKey("bill");
  else if (s <= hildaMin) setResultKey("balanced");
  else setResultKey("hilda");
}, [scoreParam, billMax, hildaMin]);

useEffect(() => {
  if (!resultKey || !scoreParam) return;
 track('quiz_result', {
    bucket: resultKey,                 // "bill" | "balanced" | "hilda"
    score: Number(scoreParam),
  });
}, [resultKey, scoreParam]);


  const content = resultKey ? RESULTS[resultKey] : null;

  return (
    <main
      className="min-h-[100svh] flex flex-col items-center justify-start px-4 pt-3 sm:pt-6 pb-8 text-center overscroll-y-contain"
      style={{ backgroundColor: "#f9fafb", color: "#111111" }}
    >
      <div
        ref={resultRef}
        id="result-card"
        className="p-6 rounded-xl shadow-md max-w-md w-full"
        style={{
          backgroundColor: "#ffffff",
          color: "#111111",
          border: "1px solid #e5e7eb",
        }}
      >
        <h1 className="text-2xl font-bold mb-2" style={{ color: "#111111" }}>
          Your Result
        </h1>

        <p className="text-lg mb-4" style={{ color: "#374151" }}>
          {content ? content.title : "—"}
        </p>

          {resultKey && (<Image src={IMAGE_BY_KEY[resultKey].src} alt={IMAGE_BY_KEY[resultKey].alt} width={192} height={192} className="w-48 h-auto mx-auto mb-4" />)}

        {content && (
          <section style={{ textAlign: "left" }}>
            <p style={{ color: "#374151", marginBottom: 12 }}>
              {content.description}
            </p>

            <h2
              style={{
                fontWeight: 700,
                marginTop: 12,
                marginBottom: 6,
                color: "#111111",
              }}
            >
              You&apos;re strong at
            </h2>
            <ul
              style={{ paddingLeft: 18, marginBottom: 10, color: "#374151" }}
            >
              {content.strengths.map((s, i) => (
                <li key={i} style={{ listStyleType: "disc", marginBottom: 4 }}>
                  {s}
                </li>
              ))}
            </ul>

            <h2
              style={{
                fontWeight: 700,
                marginTop: 12,
                marginBottom: 6,
                color: "#111111",
              }}
            >
              Watch-outs
            </h2>
            <ul
              style={{ paddingLeft: 18, marginBottom: 10, color: "#374151" }}
            >
              {content.watchouts.map((w, i) => (
                <li key={i} style={{ listStyleType: "disc", marginBottom: 4 }}>
                  {w}
                </li>
              ))}
            </ul>

            <h2
              style={{
                fontWeight: 700,
                marginTop: 12,
                marginBottom: 6,
                color: "#111111",
              }}
            >
              How to meet other dogs today
            </h2>
            <ul
              style={{ paddingLeft: 18, marginBottom: 10, color: "#374151" }}
            >
              {content.connect.map((c, i) => (
                <li key={i} style={{ listStyleType: "disc", marginBottom: 4 }}>
                  {c}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
<div className="mt-2 flex flex-col items-center gap-1 sm:gap-2">

      {/* Cheeky buttons */}
<div className="mt-3 flex items-center justify-center gap-3 flex-wrap">
  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/janembell/"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center
               text-sm font-semibold py-2 px-4 rounded-full
               bg-[#0A66C2] text-white hover:bg-[#084e96] shadow-sm"
  >
    Add Jane on LinkedIn
  </a>

  {/* Book a coffee */}
   <a
  href="mailto:jane.bell@afl.com.au"
  className="inline-flex items-center justify-center text-sm font-semibold rounded-full border py-2.5 px-4 bg-pink-100 text-pink-700 border-pink-200 hover:bg-pink-200 shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300"
  aria-label="Book a coffee with Jane"
  title="Book a coffee with Jane"
>
  Email jane.bell@afl.com.au
</a>

  </div>
        <Link
  href="/home"
  aria-label="Start again"
  className="mmt-3 inline-flex items-center justify-center
               text-sm font-medium rounded-full border px-4 py-2
               bg-yellow-200 text-pink-700 border-pink-700
               hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-300"
>
  Back to home
</Link>
</div>

    </main>
  );
}
