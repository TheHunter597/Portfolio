import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";
import Head from "next/head";
import { useContext } from "react";
import context from "../context/context";
interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  const contextData = useContext(context) as { darkMode: boolean };
  const { darkMode } = contextData;
  return (
    <div
      className={darkMode ? styles.dark : styles.root}
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;
