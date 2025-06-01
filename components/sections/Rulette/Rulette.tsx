"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useDispatch } from "react-redux";
import { addResult } from "@/store/slices/rouletteSlice";
import { BetType } from "@/types/bets";
import BetCard from "@/components/custom/BetCard/BetCard";

const COLORS: BetType[] = [
  "red",
  "black",
  "red",
  "black",
  "red",
  "jocker",
  "black",
  "green",
  "jocker",
  "green",
  "red",
  "black",
  "red",
  "black",
  "jocker",
];

const SEGMENT_WIDTH = 100;
const VISIBLE_SEGMENTS = 10;

const SEGMENT_GAP = 7;
const SEGMENT_FULL_WIDTH = SEGMENT_WIDTH + SEGMENT_GAP;
const Roulette = () => {
  const controls = useAnimation();
  const [rolling, setRolling] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  const dispatch = useDispatch();

  const segmentsPerLoop = COLORS.length;
  const REPEAT_COUNT = 150;
  const repeated = Array.from(
    { length: segmentsPerLoop * REPEAT_COUNT },
    (_, i) => COLORS[i % segmentsPerLoop]
  );

  const middleIndex = Math.floor(repeated.length / 2);

  const offsetCenter =
    (VISIBLE_SEGMENTS * SEGMENT_FULL_WIDTH - SEGMENT_WIDTH) / 2;

  const positionRef = useRef(middleIndex);

  useEffect(() => {
    controls.set({ x: -middleIndex * SEGMENT_WIDTH + offsetCenter });
    positionRef.current = middleIndex;
  }, []);

  useEffect(() => {
    if (rolling) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          roll();
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rolling]);

  const roll = async () => {
    if (rolling) return;

    setRolling(true);

    const targetColorIndex = Math.floor(Math.random() * segmentsPerLoop);
    const minRollsAhead = 5;
    const maxRollsAhead = 8;
    const rollsAhead =
      minRollsAhead +
      Math.floor(Math.random() * (maxRollsAhead - minRollsAhead + 1));

    const targetIndex =
      positionRef.current + rollsAhead * segmentsPerLoop + targetColorIndex;

    const newX = -targetIndex * SEGMENT_WIDTH + offsetCenter;
    console.log(
      `Rolling to color index ${targetColorIndex} at position ${targetIndex} (newX: ${newX})`
    );

    const durationPerCycle = 0.6;
    const cycles = rollsAhead;
    const duration = durationPerCycle * cycles;

    await controls.start({
      x: newX,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    });

    const winningColor = repeated[(targetIndex % repeated.length) + 1];

    dispatch(addResult(winningColor as BetType));

    const normalizedPosition = middleIndex + (targetIndex % segmentsPerLoop);
    const normalizedX = -normalizedPosition * SEGMENT_WIDTH + offsetCenter;

    controls.set({ x: normalizedX });
    positionRef.current = normalizedPosition;

    setRolling(false);
  };

  return (
    <section className="flex flex-col items-center justify-center  text-white  py-10 px-0">
      <div className="relative w-full max-w-[1280px]  overflow-hidden   rounded-xl ">
        <div className=" absolute right-0 top-0 h-full w-full bg-black/50 z-30" />
        <div className="pointer-events-none absolute left-0 top-0 h-[120%] w-[100px] bg-gradient-to-r from-black to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-[120%] w-[100px] bg-gradient-to-l from-black to-transparent z-20" />

        <motion.div
          animate={controls}
          className="flex items-center gap-2"
          style={{ width: repeated.length * SEGMENT_WIDTH }}
          initial={{ x: -middleIndex * SEGMENT_WIDTH + offsetCenter }}
        >
          {repeated.map((color, i) => {
            return <BetCard key={i} betType={color as BetType} size="lg" />;
          })}
        </motion.div>

        <div className="flex flex-col justify-center items-center shrink-0 text-white uppercase absolute top-0 h-full w-full left-1/2 transform -translate-x-1/2 z-30">
          <p className=" text-sm font-semibold">Rolling in:</p>
          <p className="text-[20px] leading-7 font-bold">{timeLeft}</p>
        </div>
      </div>
    </section>
  );
};

export default Roulette;
