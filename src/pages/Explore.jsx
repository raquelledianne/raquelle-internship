import React, { useEffect, useState } from "react";
import SubHeader from "../images/subheader.jpg";
import ExploreItems from "../components/explore/ExploreItems";

const API_URL =
  "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore";

const Explore = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchExploreItems = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Explore API error:", err);
      }
    };

    fetchExploreItems();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="subheader"
          className="text-light"
          style={{ background: `url("${SubHeader}") top` }}
        >
          <div className="center-y relative text-center">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1>Explore</h1>
                </div>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <ExploreItems items={items} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Explore;