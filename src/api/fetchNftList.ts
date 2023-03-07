import type { WrapPromiseType } from "@/utils/wrapPromise";
import { wrapPromise } from "@/utils/wrapPromise";
import { GET_NFTS } from "@/utils/constants";
import type { NFT } from "./types";

export interface OwnedNftResponse {
  blockHash: string;
  ownedNfts: NFT[];
  totalCount: number;
}

async function fetchOwnedNfts(address: string): Promise<OwnedNftResponse> {
  const init = {
    method: "get",
    redirect: "follow",
  };
  return await fetch(
    `${GET_NFTS}?owner=${address}&withMetadata=true`,
    init as RequestInit
  ).then((res) => res.json());
}

export interface NftDataResponse {
  nfts: WrapPromiseType<OwnedNftResponse>;
}

export function fetchNftData(address: string): NftDataResponse {
  let nftsPromise = fetchOwnedNfts(address);

  return {
    nfts: wrapPromise(nftsPromise),
  };
}
