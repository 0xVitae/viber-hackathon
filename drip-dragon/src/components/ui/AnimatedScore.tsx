import { useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedScore({ score }: { score: number }) {
  const spring = useSpring(0, { stiffness: 45, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v));
  const [shown, setShown] = useState(0);

  useEffect(() => {
    spring.set(score);
    const unsub = display.on('change', (v) => setShown(v));
    return unsub;
  }, [score, spring, display]);

  return (
    <span className="font-display text-7xl text-dragon-gold md:text-8xl">
      {shown}
      <span className="text-3xl text-gray-500">/1000</span>
    </span>
  );
}
