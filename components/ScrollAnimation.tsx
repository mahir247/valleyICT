"use client";

import { motion, useInView, Variants, useReducedMotion } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "fade";
  once?: boolean;
}

const ScrollAnimation = ({
  children,
  delay = 0,
  duration = 0.5,
  className = "",
  direction = "up",
  once = true,
}: ScrollAnimationProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : direction === "up" ? 50 : direction === "down" ? -50 : 0,
      x: shouldReduceMotion ? 0 : direction === "left" ? 50 : direction === "right" ? -50 : 0,
      scale: shouldReduceMotion ? 1 : direction === "fade" ? 0.9 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : duration,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth animation
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={{
        willChange: shouldReduceMotion ? "auto" : "transform, opacity", // Performance optimization
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;
