import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styles from "./banner.module.css";

function Banner({ title, subtitle, imageUrl, videoId }) {
  const router = useRouter();
  const handlePlayButton = () => {
    console.log("Handle play button");
    router.push(`/video/${videoId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nseriesWrapper}>
            <h1 className={styles.firstLetter}>N</h1>
            <h1 className={styles.series}>S E R I E S</h1>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <h1 className={styles.subtitle}>{subtitle}</h1>
          <div className={styles.playButtonWrapper}>
            <button className={styles.btnWithIcon} onClick={handlePlayButton}>
              <Image
                alt="Play icon"
                src={"/static/play_arrow.svg"}
                width={32}
                height={32}
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>

      <div
        className={styles.bannerImg}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
    </div>
  );
}

export default Banner;
