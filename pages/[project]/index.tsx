import Image, { StaticImageData } from "next/image";
import styles from "./ProjectPage.module.scss";
import { projectsData } from "../../data/projectsData";
import { useContext, useRef } from "react";
import context from "../../context/context";
import Head from "next/head";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
const infoListAnimation = {
  initial: {
    x: "100%",
    opacity: 0,
  },
  original: (i: number) => {
    return {
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
        type: "spring",
        stiffness: 70,
      },
    };
  },
};

interface props {
  projectData: {
    name: string;
    description: string;
    mainImage: StaticImageData;
    url: string;
    images: StaticImageData[];
    details: string[];
  };
}

function ProjectPage(props: props) {
  const { projectData } = props;
  const { name, description, mainImage, images, url, details } = projectData;
  const contextData = useContext(context) as {
    fixNavbar: boolean;
    phoneUser: boolean;
  };
  const { fixNavbar, phoneUser } = contextData;
  const [ref, inView] = useInView();
  const detailsInfo = details.map((info, i) => {
    const firstWord = info.split(" ")[0];
    return (
      <motion.li
        variants={infoListAnimation}
        initial="initial"
        animate={inView ? "original" : ""}
        key={info}
        custom={i}
        className={
          firstWord === "Currently" || firstWord === "Next"
            ? styles["ProjectPage__details--active"]
            : ""
        }
      >
        {info}
      </motion.li>
    );
  });
  const gallery = images.map((image, index) => {
    return (
      <div key={index}>
        <Image src={image} width={700} height={450} alt="image" />
      </div>
    );
  });
  return (
    <div
      className={styles["ProjectPage"]}
      style={fixNavbar ? { marginTop: "8rem" } : { marginTop: "0rem" }}
    >
      <Head>
        <title>{name + " " + "Project"}</title>
      </Head>
      <div className={styles["ProjectPage__image"]}>
        <Image
          src={mainImage}
          height={!phoneUser ? 600 : 900}
          width={1200}
          alt="main image"
        />
      </div>
      <div className={styles["ProjectPage__content"]}>
        <div className={styles["ProjectPage__info"]}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <ul className={styles["ProjectPage__details"]} ref={ref}>
          {detailsInfo}
        </ul>
        <h3 className={styles["ProjectPage__galleryHeader"]}>Gallery</h3>
        <div className={styles["ProjectPage__gallery"]}> {gallery}</div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = projectsData.map((project) => {
    return {
      params: {
        project: project.name,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { project: string } }) {
  const project = projectsData.find(
    (project) => project.name === context.params.project
  );
  return {
    props: {
      projectData: project,
    },
  };
}

export default ProjectPage;
