import { useCallback, useEffect, useState } from "react";

import styles from "@/styles/NftGallery.module.css";
import { TEST_ADDRESS } from "@/utils/constants";
import NftCard, { NftProps } from "./NftCard";

export default function NFTGallery() {
  const [nfts, setNfts] = useState<NftProps[]>([]);
  const [address] = useState(TEST_ADDRESS);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNFTs = useCallback(
    async (pageKey?: string) => {
      setIsLoading(true);
      setNfts([]);

      const endpoint = `${process.env.NEXT_PUBLIC_DEFAULT_CHAIN}/getNFTs?owner=${address}`;

      try {
        const res = await fetch(endpoint, {
          method: "get",
          redirect: "follow",
        }).then((res) => res.json());

        console.log("res", res);

        setNfts(res.ownedNfts);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    },
    [setIsLoading, address]
  );

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return isLoading ? (
    <div className={styles.loading_box}>
      <p>Loading...</p>
    </div>
  ) : (
    <div className={styles.nft_gallery}>
      <div className={styles.nfts_display}>
        {nfts?.length ? (
          nfts.map((nft) => {
            return <NftCard key={nft.id.tokenId} nft={nft} />;
          })
        ) : (
          <div className={styles.loading_box}>
            <p>No NFTs found for the address {address}</p>
          </div>
        )}
      </div>
    </div>
  );
}
