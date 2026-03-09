import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const selectedItem = data.find(
          (nft) => String(nft.id || nft.nftId) === id
        );

        setItem(selectedItem);
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchItem();
  }, [id]);

  if (!item) {
    return <div className="container mt-5">NFT not found</div>;
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