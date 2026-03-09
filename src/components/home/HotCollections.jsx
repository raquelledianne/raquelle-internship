import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
        );

        setTimeout(() => {
          setCollections(res.data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch Hot Collections:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 4 },
    },
  };

  const skeletons = new Array(4).fill(0);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>Hot Collections</h2>
          <div className="small-border bg-color-2"></div>
        </div>

<OwlCarousel className="owl-theme" {...options}>
  {collections.length > 0
    ? collections.map((item) => (
        <div className="item" key={item.nftId || item.title}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                <img src={item.nftImage} alt={item.title} />
              </Link>
            </div>
            <div className="nft_coll_pp">
              <Link to={`/author/${item.authorId}`}>
                <img className="pp-coll" src={item.authorImage} alt="author" />
              </Link>
              <i className="fa fa-check"></i>
            </div>
            <div className="nft_coll_info">
              <Link to={`/item-details/${item.nftId}`} state={{ item }}>
                <h4>{item.title}</h4>
              </Link>
              <span>{item.code}</span>
            </div>
          </div>
        </div>
      ))
    : skeletons.map((_, i) => (
        <div className="item" key={i}>
          <div className="nft_coll">
            <div className="nft_wrap">
              <Skeleton height={200} />
            </div>
            <div className="nft_coll_pp">
              <Skeleton circle height={50} width={50} />
            </div>
            <div className="nft_coll_info">
              <Skeleton height={20} width="80%" />
              <Skeleton height={15} width="50%" />
            </div>
          </div>
        </div>
      ))}
</OwlCarousel>
      </div>
    </section>
  );
};

export default HotCollections;