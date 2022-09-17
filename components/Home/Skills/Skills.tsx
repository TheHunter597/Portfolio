import { useState, useRef, useContext } from "react";
import context from "../../../context/context";
import styles from "./Skills.module.scss";
import { skills } from "../../../data/skillsData";
import FlipCard from "../FlipCard/FlipCard";
function Skills() {
  const [showArrow, setShowArrow] = useState(false);
  const skillContainer = useRef<HTMLDivElement>(null);
  const contextData = useContext(context) as {
    phoneUser: boolean;
  };
  const { phoneUser } = contextData;
  function moveLeft() {
    skillContainer.current!.scrollLeft -= window.innerWidth;
  }
  function moveRight() {
    skillContainer.current!.scrollLeft += window.innerWidth;
  }

  const flipCards = skills.map((entry) => {
    return <FlipCard skill={entry} key={entry.name} />;
  });

  return (
    <div className={styles["Skills"]} id="Skills">
      <div
        className={styles["Skills__content"]}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        <h2 className={styles["Skills__title"]}>
          {" "}
          Skills<span>Use the arrows to navigate between them</span>
        </h2>
        <div className={styles["Skills__skills"]} ref={skillContainer}>
          {flipCards}
        </div>
        {showArrow && !phoneUser ? (
          <div className={styles["Skills__move"]}>
            <button
              className={styles["Skills__move--right"]}
              onClick={moveRight}
            >
              &rarr;
            </button>
            <button className={styles["Skills__move--left"]} onClick={moveLeft}>
              &larr;
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Skills;
