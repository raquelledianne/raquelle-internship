import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuthorItems = ({ items, author, loading = false }) => {
  const skeletonCards = new Array(8).fill(0);

  if (!items && !loading) {
    return <div className="text-center">This author has no NFTs yet.</div>;
  }

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? skeletonCards.map((_, index) => (
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
                    <div className="nft__item_info">
                      <Skeleton height={20} width="80%" />
                      <Skeleton height={20} width="40%" />
                    </div>
                  </div>
                </div>
              ))
            : items.map((item) => (
                <div
                  key={item.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
                  <div className="nft__item">
                    
                    <div className="author_list_pp">
                      <Link to={`/author/${author.id}`}>
                        <img
                          className="lazy"
                          src={author.authorImage}
                          alt={author.authorName}
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>

                    
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
                        />
                      </Link>
                    </div>

                    
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.nftId}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;