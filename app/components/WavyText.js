"use client"

import { motion } from "motion/react"

export default function UseTime({text}) {
  return (
    <span style={{ display: "inline" }}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{ y: [-3, 3, -3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.07,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  )
}