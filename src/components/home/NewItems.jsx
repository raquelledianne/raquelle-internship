import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import Countdown from "../countdown"

import "react-loading-skeleton/dist/skeleton.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setItems(data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const options = {
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 4 },
    },
  };

  const skeletonCards = new Array(4).fill(0);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">

        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        <OwlCarousel className="owl-theme" {...options}>

          {loading
            ? skeletonCards.map((_, i) => (
                <div className="item" key={i}>
                  <div className="nft__item">

                    <div className="author_list_pp">
                      <Skeleton circle height={40} width={40} />
                    </div>

                    <div className="nft__item_wrap">
                      <Skeleton height={200} />
                    </div>

                    <div className="nft__item_countdown">
                      <Skeleton height={20} width={80} />
                    </div>

                    <div className="nft__item_info">
                      <Skeleton height={20} width="80%" />
                      <Skeleton height={20} width="40%" />
                    </div>

                  </div>
                </div>
              ))
            : items.map((item) => (
                <div className="item" key={item.id}>
                  <div className="nft__item">

                    {/* Author */}
                    <div className="author_list_pp">
                      <Link to={`/author/${item.authorId}`}>
                        <img
                          className="lazy"
                          src={item.authorImage}
                          alt="author"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    
                    <div className="nft__item_countdown">
                      <Countdown expiryDate={item.expiryDate} />
                    </div>

                    
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>

                      <div className="nft__item_price">
                        {item.price} ETH
                      </div>

                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>

                  </div>
                </div>
              ))}

        </OwlCarousel>

      </div>
    </section>
  );
};

export default NewItems;