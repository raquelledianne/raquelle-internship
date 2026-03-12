import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "react-loading-skeleton";
import Countdown from "../countdown";

import "react-loading-skeleton/dist/skeleton.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems";

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setTimeout(() => {
          setItems(data || []);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("NewItems API error:", error);
        setLoading(false);
      }
    };
    fetchItems();
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

  const safeLink = (id, fallback = "#") => (id ? id : fallback);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="text-center">
          <h2>New Items</h2>
          <div className="small-border bg-color-2"></div>
        </div>

        {loading ? (
          <div className="row">
            {skeletonCards.map((_, index) => (
              <div
                key={index}
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              >
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
            ))}
          </div>
        ) : (
          <OwlCarousel className="owl-theme" {...options}>
            {items.map((item) => (
              <div className="item" key={item.id}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to={`/author/${safeLink(item.authorId)}`}
                      aria-label={`Go to ${item.authorName || "author"} page`}
                    >
                      <img
                        src={item.authorImage || "/fallback-avatar.png"}
                        className="lazy"
                        alt={item.authorName || "author"}
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>

                  <div className="nft__item_wrap">
                    <Link
                      to={`/item-details/${safeLink(item.nftId)}`}
                      aria-label={`Go to ${item.title || "item"} details`}
                    >
                      <img
                        src={item.nftImage || "/fallback-item.png"}
                        className="lazy nft__item_preview"
                        alt={item.title || "item"}
                      />
                    </Link>
                  </div>

                  {item.expiryDate && <Countdown expiryDate={Number(item.expiryDate)} />}

                  <div className="nft__item_info">
                    <Link
                      to={`/item-details/${safeLink(item.nftId)}`}
                      aria-label={`Go to ${item.title || "item"} details`}
                    >
                      <h4>{item.title || "Untitled"}</h4>
                    </Link>
                    <div className="nft__item_price">{item.price || 0} ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>{item.likes || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}
      </div>
    </section>
  );
};

export default NewItems;