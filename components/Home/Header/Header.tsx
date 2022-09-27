import styles from "./Header.module.scss";
import { useContext, useEffect } from "react";
import context from "../../../context/context";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AiFillLinkedin } from "react-icons/ai";
import Link from "next/link";

const titlesAnimations = {
  start: {
    y: 100,
    opacity: 0,
  },
  end: (number: number) => {
    return {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 1 + number * 0.4,
      },
    };
  },
};

const fixedLinkedInAnimation = {
  start: {
    opacity: 0,
    x: "100%",
  },
  end: {
    opacity: 1,
    x: 0,
  },
};
function Header() {
  const contextData = useContext(context) as {
    fixNavbar: boolean;
    darkMode: boolean;
    setDarkMode: Function;
  };
  const { fixNavbar, darkMode } = contextData;
  const { ref: buttonRef, inView } = useInView();
  useEffect(() => {});
  return (
    <header
      className={`${styles["Header"]} ${
        darkMode ? styles["Header--dark"] : styles["Header--light"]
      }`}
      id="Header"
      style={{
        marginTop: fixNavbar ? "8rem" : "0rem",
      }}
    >
      <div className={styles["Header__content"]}>
        <motion.div className={styles["Header__title"]}>
          <motion.h3
            className={styles["Header__title--intro"]}
            animate="end"
            initial="start"
            variants={titlesAnimations}
            custom={1}
          >
            <span>Hello</span> there I am
          </motion.h3>
          <motion.h1
            className={styles["Header__title--main"]}
            animate="end"
            initial="start"
            variants={titlesAnimations}
            custom={2}
          >
            Mohamed Hossam
          </motion.h1>
          <motion.h3
            className={styles["Header__title--describe"]}
            animate="end"
            initial="start"
            variants={titlesAnimations}
            custom={3}
          >
            I am a <span>frontend developer</span> hope I can help you{" "}
          </motion.h3>
          <motion.h4
            className={styles["Header__title--offer"]}
            animate="end"
            initial="start"
            variants={titlesAnimations}
            custom={4}
          >
            Why dont we work together
          </motion.h4>
        </motion.div>
        <motion.div
          className={styles["Header__button"]}
          animate="end"
          initial="start"
          variants={titlesAnimations}
          custom={4}
          ref={buttonRef}
        >
          <button className={styles["animatedButton"]}>
            <Link href="https://www.linkedin.com/in/mohamed-hossam-3aaa8224b/">
              <a target="_blank" rel="noreferrer">
                My linkedIn
              </a>
            </Link>
          </button>
        </motion.div>
        <AnimatePresence>
          {!inView ? (
            <motion.div
              className={styles["fixedLinekedIn"]}
              key="fixedLinekedIn"
              variants={fixedLinkedInAnimation}
              initial="start"
              exit="start"
              animate="end"
            >
              <Link href="https://www.linkedin.com/in/mohamed-hossam-3aaa8224b/">
                <a target="_blank" rel="noreferrer">
                  <AiFillLinkedin />
                </a>
              </Link>
            </motion.div>
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
