import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import type { Answer, Question } from '../types';
import { questions } from '../data/questions';

interface QuizPageProps {
  onComplete: (answers: Answer[]) => void;
}

export function QuizPage({ onComplete }: QuizPageProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [sliderValue, setSliderValue] = useState(50);

  const question = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  const submitChoice = (option: NonNullable<Question['options']>[0]) => {
    const answer: Answer = {
      questionId: question.id,
      value: option.id,
      penalty: option.penalty,
      tags: option.tags ?? [],
    };
    advance([...answers, answer]);
  };

  const submitSlider = () => {
    const penalty = question.sliderPenalty?.(sliderValue) ?? 0;
    const tags = question.sliderTags?.(sliderValue) ?? [];
    const answer: Answer = {
      questionId: question.id,
      value: sliderValue,
      penalty,
      tags,
    };
    advance([...answers, answer]);
  };

  const advance = (nextAnswers: Answer[]) => {
    if (index + 1 >= questions.length) {
      onComplete(nextAnswers);
    } else {
      setAnswers(nextAnswers);
      setIndex((i) => i + 1);
      setSliderValue(50);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="flex min-h-screen flex-col px-4 py-24"
    >
      <motion.div className="mx-auto w-full max-w-2xl">
        <motion.div className="mb-2 flex justify-between font-mono text-xs uppercase text-neon">
          <span>Evaluation Protocol {index + 1}/{questions.length}</span>
          <span>{Math.round(progress)}% COMPLIANCE DATA</span>
        </motion.div>
        <div className="mb-8 h-2 overflow-hidden border border-scarlet/50 bg-black">
          <motion.div
            className="h-full bg-gradient-to-r from-scarlet to-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="border-2 border-scarlet/40 bg-black/80 p-6 md:p-10"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-gold">
              [{question.category}]
            </span>
            <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-white md:text-4xl">
              {question.text}
            </h2>

            {question.type === 'choice' && question.options && (
              <div className="mt-8 flex flex-col gap-3">
                {question.options.map((opt, i) => (
                  <motion.button
                    key={opt.id}
                    type="button"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => submitChoice(opt)}
                    className="border border-white/20 bg-white/5 px-4 py-4 text-left uppercase tracking-wide transition hover:border-neon hover:bg-neon/10 hover:text-neon"
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </motion.div>
            )}

            {question.type === 'slider' && (
              <div className="mt-8">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sliderValue}
                  onChange={(e) => setSliderValue(Number(e.target.value))}
                  className="w-full accent-scarlet"
                />
                <motion.div className="mt-4 flex justify-between font-mono text-xs text-gray-500">
                  <span>{question.sliderLabels?.[0]}</span>
                  <span className="text-neon">{sliderValue}%</span>
                  <span>{question.sliderLabels?.[1]}</span>
                </motion.div>
                <button
                  type="button"
                  onClick={submitSlider}
                  className="mt-6 w-full border-2 border-scarlet bg-scarlet py-3 font-display text-lg uppercase tracking-widest text-white hover:bg-scarlet-dark"
                >
                  Submit Response
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
