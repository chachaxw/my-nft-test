/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import styles from "@/styles/NftGallery.module.css";

export type ID = {
  tokenId: string;
  tokenMetadata: { tokenType: string };
};

export type Metadata = {
  name: string;
  image: string;
  description: string;
};

export type TokenUri = {
  gateway: string;
  raw: string;
};

export type Contract = {
  address: string;
};

export type OpenSea = {
  imageUrl: string;
  floorPrice: string;
  description: string;
  collectionName: string;
  safelistRequestStatus: string;
  twitterUsername: string;
  lastIngestedAt: string;
};

export type ContractMetadata = {
  contractDeployer: string;
  deployedBlockNumber: number;
  name: string;
  openSea: OpenSea;
  symbol: string;
  tokenType: string;
  totalSupply: string;
};

export type Media = {
  bytes: number;
  format: string;
  gateway: string;
  raw: string;
  thumbnail: string;
};

export type NftProps = {
  title: string;
  balance: string;
  description: string;
  timeLastUpdated: string;
  media: Media[];
  metadata: Metadata;
  contractMetadata: ContractMetadata;
  contract: Contract;
  id: ID;
  tokenUri: TokenUri;
};

export interface Props {
  nft: NftProps;
}

function Placeholder() {
  return (
    <img
      alt="Placeholder"
      style={{ objectFit: "scale-down" }}
      src={"/placeholder.png"}
    />
  );
}

export default function NftCard(props: Props) {
  const { nft } = props;
  const format = nft.media.length ? nft.media[0].format : "";
  const thumbnail = nft.media.length ? nft.media[0].thumbnail : "";

  return (
    <div className={styles.card_container}>
      <div className={styles.image_container}>
        {format == "mp4" ? (
          <video src={nft.media[0].gateway} controls>
            Your browser does not support the video tag.
          </video>
        ) : thumbnail ? (
          <img alt={nft.title} src={`${thumbnail}`} />
        ) : (
          <Placeholder />
        )}
      </div>
      <div className={styles.info_container}>
        <div className={styles.title_container}>
          <h3>{nft.contractMetadata?.openSea?.collectionName ?? nft.title}</h3>
        </div>
        <hr className={styles.separator} />
        <div className={styles.symbol_contract_container}>
          <div className={styles.symbol_container}>
            <p>{nft.contractMetadata?.symbol}</p>
            {nft.contractMetadata?.openSea?.safelistRequestStatus ==
            "verified" ? (
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                }
                width="20px"
                height="20px"
                alt="verified"
              />
            ) : null}
          </div>
          <div className={styles.contract_container}>
            <p className={styles.contract_container}>
              {nft.contract.address.slice(0, 6)}...
              {nft.contract.address.slice(38)}
            </p>
            <Image
              src={
                "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
              }
              width={15}
              height={15}
              alt="etherscan-logo-circle"
            />
          </div>
        </div>

        <div className={styles.description_container}>
          <p>{nft.contractMetadata?.openSea?.description ?? nft.description}</p>
        </div>
      </div>
    </div>
  );
}
