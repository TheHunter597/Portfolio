import styles from "./Projects.module.scss";
import { projectsData } from "../../../data/projectsData";
import Project from "./Project/Project";

function Projects() {
  const result = projectsData.map((project, index) => {
    return <Project data={project} key={project.name} index={index} />;
  });
  return (
    <section className={styles["Projects"]} id="Projects">
      <h2 className={styles["Projects__title"]}>
        {" "}
        Projects <span>projects are ranked from newest to oldest</span>
      </h2>
      <div className={styles["Projects__content"]}>{result}</div>
    </section>
  );
}

export default Projects;
