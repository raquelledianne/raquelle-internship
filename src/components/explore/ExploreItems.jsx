import React, { useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "../countdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";

const ExploreItems = ({ items = [], loading }) => {
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(8);

  const sortedItems = [...items].sort((a, b) => {
    if (filter === "price_low_to_high") return a.price - b.price;
    if (filter === "price_high_to_low") return b.price - a.price;
    if (filter === "likes_high_to_low") return b.likes - a.likes;
    return 0;
  });

  const loadMore = () => {
    setVisible((prev) => prev + 4);
    setTimeout(() => AOS.refresh(), 100);
  };

  const skeletonCards = new Array(8).fill(0);

  const safeLink = (id, fallback = "#") => (id ? id : fallback);

  return (
    <>
      <div className="col-md-12 mb-4">
        <select
          id="filter-items"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {loading
        ? skeletonCards.map((_, i) => (
            <div
              key={i}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton circle height={40} width={40} />
                </div>

                <div className="nft__item_countdown">
                  <Skeleton height={20} width={80} />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton height={200} />
                </div>

                <div className="nft__item_info">
                  <Skeleton height={20} width="80%" />
                  <Skeleton height={20} width="40%" />
                </div>
              </div>
            </div>
          ))
        : sortedItems.slice(0, visible).map((item, i) => (
            <div
              key={item.id || i}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              data-aos="fade-up"
              data-aos-delay={i * 100}
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${safeLink(item.authorId)}`}
                    aria-label={`Go to ${item.authorName || "author"} page`}
                  >
                    <img
                      className="lazy"
                      src={item.authorImage || "/fallback-avatar.png"}
                      alt={item.authorName || "author"}
                    />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>

                <Countdown expiryDate={item.expiryDate} />

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

      {!loading && visible < sortedItems.length && (
        <div className="col-md-12 text-center">
          <button onClick={loadMore} className="btn-main lead">
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreItems;