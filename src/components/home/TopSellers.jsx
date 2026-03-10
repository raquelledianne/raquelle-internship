import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers";

const TopSellers = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
       
        setTimeout(() => {
          setAuthors(data);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("API error:", err);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const skeletons = new Array(12).fill(0); 

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="col-md-12">
            <ol className="author_list">
              {loading
                ? skeletons.map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Skeleton circle height={50} width={50} />
                      </div>
                      <div className="author_list_info">
                        <Skeleton height={20} width="80%" />
                        <Skeleton height={15} width="50%" />
                      </div>
                    </li>
                  ))
                : authors.map((author) => (
                    <li key={author.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt={author.name}
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${author.authorIdd}`}>{author.authorName}</Link>
                        <span>{author.totalVolume} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;