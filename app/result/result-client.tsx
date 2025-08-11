"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

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
      "On-time delivery",
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
    title: "Balanced: Agile & Aware 🐾",
    description:
      "You're thinking as a pack: steady pace with smart people radar. You switch stride to fit the terrain.",
    strengths: [
      "Adaptive pacing and prioritisation",
      "Linking outcomes to people impact",
      "Inclusive decisions under change",
    ],
    watchouts: [
      "Hedging too long before committing",
      "Pace drag from over-checking",
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
      "Stakeholder trust and buy-in",
      "De-escalating tension",
      "Team morale and safety",
      "Discovery and facilitation",
    ],
    watchouts: [
      "Softening or delaying hard calls",
      'Scope creep from "just one more idea"',
      "Fuzzy boundaries",
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

  useEffect(() => {
    if (!scoreParam) return;
    const s = Number(scoreParam);
    if (Number.isFinite(s)) {
      if (s < 40) setResultKey("bill");
      else if (s <= 60) setResultKey("balanced");
      else setResultKey("hilda");
    }
  }, [scoreParam]);

  const handleDownload = async () => {
    if (!resultRef.current) return;

    const { default: html2canvas } = await import("html2canvas");

    const canvasEl = await html2canvas(resultRef.current, {
      backgroundColor: "#ffffff",
      scale: window.devicePixelRatio || 2,
      scrollX: 0,
      scrollY: -window.scrollY,
      useCORS: true,
      onclone: (doc) => {
        const node = doc.getElementById("result-card") as HTMLElement | null;
        if (!node) return;

        // Strip Tailwind classes in the clone to avoid OKLCH utilities
        node.className = "";
        node.querySelectorAll<HTMLElement>("*").forEach((el) => {
          el.className = "";
        });

        // Force hex/sRGB styles
        const applySafe = (el: HTMLElement) => {
          const isHeading = /^H\d$/i.test(el.tagName);
          el.style.backgroundColor = el === node ? "#ffffff" : "transparent";
          el.style.border = el === node ? "1px solid #e5e7eb" : el.style.border;
          el.style.borderColor = "#e5e7eb";
          el.style.boxShadow = "none";
          el.style.color = isHeading ? "#111111" : "#374151";
          el.style.fontFamily =
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial';
        };

        applySafe(node);
        node.querySelectorAll<HTMLElement>("*").forEach(applySafe);
      },
    });

    canvasEl.toBlob((blob: Blob | null) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "your-result.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  };

  const content = resultKey ? RESULTS[resultKey] : null;

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-10 text-center"
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

          {resultKey && (
          <img
            src={IMAGE_BY_KEY[resultKey].src}
            alt={IMAGE_BY_KEY[resultKey].alt}
            className="w-48 h-auto mx-auto mb-4"
          />
        )}

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

      <button
        onClick={handleDownload}
        className="mt-6 text-white font-bold py-2 px-4 rounded-full"
        style={{ backgroundColor: "#f59e0b" }}
      >
        Download Your Result
      </button>
    </main>
  );
}
