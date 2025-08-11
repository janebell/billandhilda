'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function Quiz() {
  const router = useRouter();
  const [answers, setAnswers] = useState<number[]>(Array(2).fill(50));
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSliderChange = (index: number, value: number) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleNext = (index: number) => {
    if (questionRefs.current[index + 1]) {
      questionRefs.current[index + 1]?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const average = answers.reduce((a, b) => a + b, 0) / answers.length;
      router.push(`/result?score=${average}`);
    }
  };

  const questions = [
    {
      label: 'Your first instinct in a team meeting is to...',
      left: 'Feel the vibe 🐶',
      right: 'Stick to the plan 🎯',
    },
        {
      label: 'Question 3',
      left: 'Feel the vibe 🐶',
      right: 'Stick to the plan 🎯',
    },
            {
      label: 'Question 4',
      left: 'Feel the vibe 🐶',
      right: 'Stick to the plan 🎯',
    },
            {
      label: 'Question 5',
      left: 'Feel the vibe 🐶',
      right: 'Stick to the plan 🎯',
    },
            {
      label: 'Question 6',
      left: 'Feel the vibe 🐶',
      right: 'Stick to the plan 🎯',
    },
 {
      label: 'Question 7',
      left: 'Feel the vibe 🐶',
      right: 'Stick to the plan 🎯',
    },
    {
      label: 'Faced with a challenge, you usually...',
      left: 'Sniff it out slowly 🐾',
      right: 'Charge ahead 🐕‍🦺',
    },
  ];

  return (
    <main className="bg-white min-h-screen px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Let’s Find Out...</h1>

      <div className="space-y-16">
        {questions.map((q, index) => (
          <div
            key={index}
            ref={(el) => (questionRefs.current[index] = el)}
            className="bg-gray-100 p-6 rounded-xl shadow-md"
          >
            <p className="text-lg font-medium mb-4">{q.label}</p>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
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

            <button
              onClick={() => handleNext(index)}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-full shadow hover:bg-pink-600"
            >
              {index === questions.length - 1 ? 'See Result' : 'Next'}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
