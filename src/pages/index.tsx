import Head from "next/head";
import Image from "next/image";
import { TEST_ADDRESS } from "@/utils/constants";
import styles from "@/styles/Home.module.css";
import NFTGallery from "@/components/NftGallery";

export default function Home() {
  return (
    <>
      <Head>
        <title>My NFT Test</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
          <p>
            Test Address:&nbsp;
            <code className={styles.code}>{TEST_ADDRESS}</code>
          </p>
        </div>
        <div className={styles.center} />
        <NFTGallery />
      </main>
    </>
  );
}
