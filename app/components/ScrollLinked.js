'use client'
import {motion, useScroll} from "motion/react"

export function ScrollLinked({navHeight}) {
    const { scrollYProgress } = useScroll()
    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX: scrollYProgress,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: -50, // i have no idea why...
                    height: navHeight,
                    originX: 0,
                    backgroundColor: "#00000055", // RRGGBBAA; color then opacity
                }}
            />
        </>
    )
}