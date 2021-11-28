import axios from "axios";
import { ethers } from "ethers";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "../styles/Home.module.css";

import { nftaddress, nftmarketAddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState("not-loaded");

  useEffect(() => {
    loadNFTs();
  }, []);

  async function loadNFTs() {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketAddress,
      Market.abi,
      provider
    );

    const data = await marketContract.fetchMarketItems();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");

        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          location: meta.data.location,
          description: meta.data.description,
        };

        return item;
      })
    );

    console.log(items);

    setNfts(items);
    setLoading("loaded");
  }

  async function buyNft(nft) {
    const web3Modal = new web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.web3Modal(connection);

    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketAddress, Market.abi, signer);

    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );

    await transaction.wait();
    loadNFTs();
  }

  if (loading === "loaded" && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl"> No Lands </h1>;

  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: "1600px" }}>
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className=" border shadow overflow-hidden">
              <img src={nft.image} style={{ height: "200px", width: "100%" }} />
              <div className="p-4">
                <p
                  style={{ height: "34px" }}
                  className="text-2xl font-semibold"
                >
                  {nft.location}
                </p>
                <div style={{ height: "30px", overflow: "hidden" }}>
                  <p className="text-gray-400">{nft.description}</p>
                </div>
              </div>

              <button
                className="w-full bg-blue-500 text-white font-bold py-2 px-12"
                onClick={() => buyNft(nft)}
              >
                Transfer Ownership
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
