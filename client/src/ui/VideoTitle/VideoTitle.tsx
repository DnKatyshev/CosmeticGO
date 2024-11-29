// react-dependencies
import { FC, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// project's styles/img


const VideoTitle:FC = ():JSX.Element => {

    const targetRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });
    
    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <div className="video__text">
            <motion.h1 
                className="video__title"
                ref={targetRef}
                style={{
                    y,
                    opacity,
                }}
            >
                Косметика нового уровня
            </motion.h1>

            <motion.h3 
                className="video__subtitle"
                ref={targetRef}
                style={{
                    y,
                    opacity,
                }}
            >
                Ухаживайте за собой - вместе с нами
            </motion.h3>
        </div>
    )
}

export default VideoTitle;