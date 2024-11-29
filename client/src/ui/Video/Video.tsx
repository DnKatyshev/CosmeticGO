// react-dependencies
import { FC, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

// project's styles/img


const Video:FC = ():JSX.Element => {

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });
  
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

    return (
        <motion.video 
            className='video__main' 
            loop autoPlay muted
            ref={targetRef}
            style={{
                scale
            }}
        >
            <source src="/video/girls.mp4" type="video/mp4" />
        </motion.video>
    )
}

export default Video;