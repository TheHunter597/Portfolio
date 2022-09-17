import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Project.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import context from "../../../../context/context";
interface props {
  data: {
    name: string;
    description: string;
    mainImage: StaticImageData;
    url: string;
    special?: string;
  };
  index: number;
}

function Project(props: props) {
  const [active, setActive] = useState(false);
  const { data, index } = props;
  const { name, description, mainImage, url, special } = data;
  const contextData = useContext(context) as { phoneUser: boolean };
  const { phoneUser } = contextData;
  const router = useRouter();
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rect = element.current!.getBoundingClientRect();
    window.addEventListener("scroll", () => {
      window.scrollY + 750 > rect.top && window.scrollY < rect.bottom
        ? setActive(true)
        : setActive(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        window.scrollY + 200 > rect.top && window.scrollY < rect.bottom
          ? setActive(true)
          : setActive(false);
      });
    };
  }, []);
  return (
    <article
      className={`${styles["Project"]}  ${
        active
          ? index % 2
            ? styles["Project--active--left"]
            : styles["Project--active--right"]
          : ""
      }`}
      ref={element}
    >
      <div className={styles["Project__content"]}>
        {special && !phoneUser ? (
          <div className={styles["Project__special"]}>{special}</div>
        ) : (
          ""
        )}
        <Image
          width={1000}
          height={!phoneUser ? 450 : 800}
          src={mainImage}
          alt="Main project image"
        />
        <h3 className={styles["Project__title"]}>{name}</h3>
        <p className={styles["Project__description"]}>{description}</p>
        <div className={styles["Project__info"]}>
          <button>
            <Link href={url}>
              <a target="_blank" rel="noopener noreferrer">
                Visit the website
              </a>
            </Link>
          </button>
          <button onClick={() => router.push(`/${name}`)}>More Info</button>
        </div>
      </div>
    </article>
  );
}

export default Project;
