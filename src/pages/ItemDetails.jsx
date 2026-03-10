import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EthImage from "../images/ethereum.svg";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        const data = await res.json();

        setItem(data);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchItem();
  }, [nftId]);

  if (!item) {
    return <div className="container mt-5">Loading NFT...</div>;
  }

  return (
    <div id="wrapper">
      <div className="container mt-5">

        <h2>{item.title}</h2>

        <img
          src={item.nftImage}
          alt={item.title}
          className="img-fluid"
        />

        <p>{item.description}</p>

        <div className="nft-item-price">
          <img src={EthImage} alt="" />
          <span>{item.price} ETH</span>
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;