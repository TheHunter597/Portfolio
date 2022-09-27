import Navbar from "./Navbar/Navbar";
import Head from "next/head";
import { useContext, useRef, useEffect } from "react";
import context from "../context/context";
import styles from "./Layout.module.scss";
import { motion } from "framer-motion";

const stripsAnimation = {
  initial: {
    opacity: 1,
  },
  original: (i: number) => {
    return {
      opacity: 0.7,
      x: "-100%",
      borderRadius: ["10px", "80px", "150px", "210px"],
      transition: {
        duration: 1.5,
        delay: i * 0.3,
      },
    };
  },
};

interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  const contextData = useContext(context) as { darkMode: boolean };
  const { darkMode } = contextData;
  const strips = [1, 2, 3];
  const stripsResults = strips.map((strip, i) => {
    return (
      <motion.div
        key={strip}
        className="cover__strip"
        variants={stripsAnimation}
        initial="initial"
        animate="original"
        custom={i}
      ></motion.div>
    );
  });
  return (
    <div
      className={`${darkMode ? styles.dark : styles.root}  ${styles["Layout"]}`}
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Navbar />
      <motion.div
        className={styles["Layout__cover"]}
        animate={{ zIndex: -1, transition: { delay: 2 } }}
      >
        {stripsResults}
      </motion.div>
      {props.children}
    </div>
  );
}

export default Layout;
