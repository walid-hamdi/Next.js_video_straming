import Link from "next/link";
import React from "react";
import Card from "./card";

import styles from "./section-cards.module.css";

function SectionCards({ title, videos = [], size }) {
  return (
    <section className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.cardWrapper}>
        {videos &&
          videos.map((video, index) => {
            return (
              <Link key={index} href={`/video/${video.id}`}>
                <a>
                  <Card imgUrl={video.imgUrl} id={index} size={size} />
                </a>
              </Link>
            );
          })}
      </div>
    </section>
  );
}

export default SectionCards;
