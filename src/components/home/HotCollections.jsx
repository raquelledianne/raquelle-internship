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

        console.log("Hot Collections API response:", res.data);

        // Handle multiple possible API formats
        const collectionsData = res.data?.data || res.data || [];

        setCollections(Array.isArray(collectionsData) ? collectionsData : []);
      } catch (err) {
        console.error("Failed to fetch Hot Collections:", err);
      } finally {
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

        {/* Skeleton Loading */}
        {loading && (
          <div className="row">
            {skeletons.map((_, i) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={i}>
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
          </div>
        )}

        {/* Carousel */}
        {!loading && collections.length > 0 && (
          <OwlCarousel className="owl-theme" {...options}>
            {collections.map((item, index) => (
              <div className="item" key={item.id || index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link
                      to={`/item-details/${item.nftId || "#"}`}
                      state={{ item }}
                    >
                      <img
                        src={item.nftImage}
                        alt={item.title || "NFT"}
                      />
                    </Link>
                  </div>

                  <div className="nft_coll_pp">
                    <Link to={`/author/${item.authorId || "#"}`}>
                      <img
                        className="pp-coll"
                        src={item.authorImage}
                        alt="author"
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>

                  <div className="nft_coll_info">
                    <Link
                      to={`/item-details/${item.nftId || "#"}`}
                      state={{ item }}
                    >
                      <h4>{item.title || "Untitled"}</h4>
                    </Link>

                    <span>{item.code || ""}</span>
                  </div>
                </div>
              </div>
            ))}
          </OwlCarousel>
        )}

        {/* No Data */}
        {!loading && collections.length === 0 && (
          <p className="text-center mt-4">
            No hot collections available.
          </p>
        )}
      </div>
    </section>
  );
};

export default HotCollections;