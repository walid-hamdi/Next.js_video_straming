import Head from "next/head";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";
import SectionCards from "../components/card/section-cards";
import { getVideos, getPopularVideos } from "../lib/videos";

export default function Home({ disneyVideo, travel, productivity, popular }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          title="Clifford the red dog"
          subTitle="a very cute dog"
          imgUrl="/static/clifford.webp"
          videoId="6OA-VmWXIRE"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" size="large" videos={disneyVideo} />
        </div>

        <div className={styles.sectionWrapper}>
          <SectionCards title="Travel" size="medium" videos={travel} />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Productivity"
            size="small"
            videos={productivity}
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SectionCards title="Popular" size="medium" videos={popular} />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const disneyVideo = await getVideos("disneyVideo");
  const travel = await getVideos("travel");
  const productivity = await getVideos("productivity");
  const popular = await getPopularVideos();

  return {
    props: { disneyVideo, travel, productivity, popular },
  };
}
