/* eslint-disable react/prop-types */
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
function DivMotion({ children }) {
  const boxVariant = {
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
    hidden: { opacity: 0, scale: 0, x: 200 },
  };
  const [ref, inView] = useInView();
  const control = useAnimation();
  useEffect(() => {
    if (inView) {
      control.start("visible");
    }
  }, [inView, control]);
  return (
    <div>
      <motion.div
        variants={boxVariant}
        ref={ref}
        initial="hidden"
        animate={control}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default DivMotion;
