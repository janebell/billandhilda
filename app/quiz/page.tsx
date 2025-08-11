'use client';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Quiz() {
  const router = useRouter();

  // 8 questions
  const questions = [
    { label: 'Your first instinct in a team meeting is to...', left: 'Feel the vibe 🐶', right: 'Stick to the plan 🎯' },
    { label: 'Faced with a challenge, you usually...', left: 'Sniff it out slowly 🐾', right: 'Charge ahead 🐕‍🦺' },
    { label: 'When a deadline moves up, you...', left: 'Reassure the team 🤗', right: 'Re-scope & sprint 📈' },
    { label: 'With conflict in the team, you...', left: 'Listen & mediate 👂', right: 'Decide & direct 🧭' },
    { label: 'Your comms style today is...', left: 'Warm & exploratory ☕️', right: 'Crisp & action-led ✍️' },
    { label: 'If a blocker pops up, you...', left: 'Check in on people 💬', right: 'Remove the roadblock 🧱' },
    { label: 'On priorities, you lean...', left: 'Relationships first 🤝', right: 'Outcomes first ✅' },
    { label: 'Today your energy feels...', left: 'Grounded & gentle 🌿', right: 'Focused & fast ⚡️' },
  ];

  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [answers, setAnswers] = useState<number[]>(() => Array(questions.length).fill(50));
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSliderChange = (index: number, value: number) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

  const goTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, questions.length - 1));
    setCurrentIndex(clamped);
    questionRefs.current[clamped]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = (index: number) => {
    if (index < questions.length - 1) return goTo(index + 1);
    const average = answers.reduce((a, b) => a + b, 0) / answers.length; // uses all 8
    router.push(`/result?score=${average}`);
  };

  const handlePrev = (index: number) => {
    if (index > 0) goTo(index - 1);
  };

  return (
    <main className="min-h-screen bg-white px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-4">Let’s Find Out...</h1>

      {/* Scroll-snap container */}
      <div
        className="mx-auto max-w-2xl h-[calc(100vh-7.5rem)] overflow-y-auto snap-y snap-mandatory space-y-8 pb-16"
        // keep scrolling smooth on iOS
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {questions.map((q, index) => (
          <div
            key={index}
            ref={(el) => (questionRefs.current[index] = el)}
            className={`snap-start rounded-2xl border shadow-md p-6 mx-auto
                        h-[60vh] flex flex-col justify-between bg-white`}
          >
            {/* Top: image + label */}
            <div>
              <img
                src="/bill-hilda-start.png"
                alt="Scenario illustration"
                className="w-24 h-24 object-contain mx-auto mb-4"
              />
              <p className="text-lg font-medium text-center">{q.label}</p>

              <div className="flex justify-between text-sm text-gray-600 mt-4 mb-2">
                <span>{q.left}</span>
                <span>{q.right}</span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={answers[index]}
                onChange={(e) => handleSliderChange(index, parseInt(e.target.value))}
                className="w-full accent-yellow-500"
              />
            </div>

            {/* Bottom: controls */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={() => handlePrev(index)}
                disabled={index === 0}
                className={`px-4 py-2 rounded-full border ${
                  index === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-gray-50'
                }`}
              >
                Back
              </button>

              <div className="text-sm text-gray-500">
                Q{index + 1} / {questions.length}
              </div>

              <button
                onClick={() => handleNext(index)}
                className="bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600"
              >
                {index === questions.length - 1 ? 'See Result' : 'Next'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick jump row (optional quality-of-life) */}
      <div className="mx-auto max-w-2xl mt-4 flex justify-center gap-2">
        {questions.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to question ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full ${i === currentIndex ? 'bg-pink-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </main>
  );
}
