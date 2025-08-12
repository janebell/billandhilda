'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

type Question = {
  label: string;
  left: string;
  right: string;
  img: string;
  alt: string;
};

export default function QuizPage() {
  const router = useRouter();

  // ---- quiz data (8 qs) ----
 const questions: Question[] = [
    {
      label: "On a big walk, you're focused on...",
      left: 'Planning the route & pace',
      right: 'Making friends along the way',
      img: '/dog-map.PNG',
      alt: 'Dog on a walk',
    },
     {
      label: 'Jumping in the car for a mystery trip, you..',
      left: 'Head out the window, catching a breeze & watching the road',
      right: 'Settle in, trust the driver, take a nap',
      img: '/dog-car.PNG',
      alt: 'Dog in a car',
    },
    {
      label: 'The doorbell rings mid nap, you...',
      left: 'Move fast: clear path, handle it',
      right: 'Biiig stretch & calm your nerves first',
      img: '/dog-doorbell.PNG',
      alt: 'Dog reacting to doorbell',
    },
    {
      label: 'You spot something tasty on the kitchen bench, you...',
      left: 'Assess the risks, plan the reach, execute cleanly',
      right: 'Enlist allies with charm and make it a shared win',
      img: '/dog-bench.PNG',
      alt: 'Dog eyeing food on bench',
    },
    {
      label: 'Arriving at the dog park, you..',
      left: 'Scan the space, set the pace',
      right: 'Start sniffing, meeting & greeting',
      img: '/dog-search.PNG',
      alt: 'Dog at park gate',
    },
    {
      label: 'Choosing a new chew toy, you..',
      left: 'Test the sturdy option that will last the game',
      right: 'Pick the one that sparks excitement with the group',
      img: '/dog-treat.PNG',
      alt: 'Dog with chew toy',
    },
    {
      label: 'When two dogs get tense, you',
      left: 'Ears up, alert, ready to protect your pack',
      right: 'Wag tails, hear both sides',
      img: '/dog-mad.PNG',
      alt: 'Two dogs in a tense moment',
    },
        {
      label: "On the couch, you're aiming for...",
      left: 'Prime spot, you know the comfiest cushions',
      right: 'Room for everyone',
      img: '/dog-couch.PNG',
      alt: 'Dog on a couch',
    },
   
  ];


  const [answers, setAnswers] = useState<number[]>(() => Array(questions.length).fill(50));

  // refs for scroll + active index
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setQuestionRef = (i: number) => (el: HTMLDivElement | null) => {
    questionRefs.current[i] = el;
  };
  const [currentIndex, setCurrentIndex] = useState(0);
  

  useEffect(() => {
    const root = document.getElementById('quiz-scroll');
    const targets = questionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!root || targets.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target) return;
        const idx = targets.indexOf(visible.target as HTMLDivElement);
        if (idx !== -1) setCurrentIndex(idx);
      },
      { root, threshold: [0.5] } // switch when ~half in view
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSliderChange = (i: number, value: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  };

const scrollToIndex = (i: number) => {
  setCurrentIndex(i); // responsive UI feedback
  questionRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

 const handleNext = (i: number) => {
  const next = i + 1;
  if (next < questions.length) {
    scrollToIndex(next); // tupdate dot live
  } else {
    const avg = answers.reduce((a, b) => a + b, 0) / answers.length;
    router.push(`/result?score=${avg}`), { scroll: true };;
  }
};

const handlePrev = (i: number) => {
  const prev = i - 1;
  if (prev >= 0) scrollToIndex(prev); // also updates the dot
};

  

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <h1 className="text-3xl font-extrabold text-center my-6">Find your mix…</h1>

      {/* Scrollable area; extra bottom padding so dots never cover content */}
      <div
        id="quiz-scroll"
        className="
          flex-1 mx-auto max-w-xl overflow-y-auto
          snap-y snap-mandatory space-y-12 scroll-py-8
          pb-28
        "
      >
        {questions.map((q, index) => (
          <div
            key={index}
            ref={setQuestionRef(index)}
            className="
              snap-start rounded-[28px] border shadow-md
              p-6 mx-auto h-[60vh] flex flex-col justify-between bg-white
            "
            style={{ borderColor: '#00000022' }}
          >
            {/*lazy replace holding image with new ones */}
<img
  src={q.img || "/bill-hilda-start.png"}
  alt={q.alt || "Bill & Hilda"}
  className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-cover rounded-lg mx-auto"
  loading="lazy"
  decoding="async"
/>

            <div className="text-center">
              <p className="text-2xl font-semibold mb-6">{q.label}</p>

             <div className="grid grid-cols-2 gap-6 sm:gap-10 text-[15px] sm:text-base text-gray-600 leading-snug mb-2">
  <span className="text-left pr-4">{q.left}</span>
  <span className="text-right pl-4">{q.right}</span>
</div>

              <input
                type="range"
                min={0}
                max={100}
                value={answers[index]}
                onChange={(e) => handleSliderChange(index, Number(e.target.value))}
               className="paw-slider w-full emoji mt-3"
                aria-label={`Answer for question ${index + 1}`}
              />
            </div>

            <div className="flex items-center justify-between pt-6">
              <button
                onClick={() => handlePrev(index)}
                disabled={index === 0}
                className={`px-6 py-3 rounded-full border font-medium ${
                  index === 0
                    ? 'text-gray-400 border-gray-200 cursor-not-allowed'
                    : 'hover:bg-gray-50'
                }`}
              >
                Back
              </button>

              <div className="text-gray-500">{`Q${index + 1} / ${questions.length}`}</div>

              <button

  onClick={() => handleNext(index)}
  className="px-6 py-3 rounded-full text-white font-semibold shadow"
  style={{ backgroundColor: '#ec4899' }}
  aria-label={index === questions.length - 1 ? 'Fetch results' : 'Next question'}
>
  {index === questions.length - 1 ? 'Fetch results' : 'Next'}
</button>
            </div>
          </div>
        ))}
      </div>

      {/* Dots: centered, inside the frame, not blocking content */}
      <div
        className="
          fixed bottom-3 left-0 right-0
          flex items-center justify-center
        "
      >
        <div
          className="
            flex items-center gap-2
            rounded-full px-3 py-2
            bg-white/90 border shadow-sm
          "
          style={{ backdropFilter: 'blur(6px)' }}
        >
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to question ${i + 1}`}
              className="h-2.5 w-2.5 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor: i === currentIndex ? '#ec4899' : '#d1d5db', // pink vs grey
              }}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
