import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchItem = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`
        );

        const data = await res.json();

        setItem(data);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [nftId]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section aria-label="section" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div className="container">

            <div className="row align-items-start g-5">

              
              <div className="col-lg-6">
                {loading ? (
                  <Skeleton height={520} />
                ) : (
                  <img
                    src={item.nftImage}
                    alt={item.title}
                    className="img-fluid rounded shadow"
                  />
                )}
              </div>

              
              <div className="col-lg-6">

                
                <h2 className="mb-3" style={{ display: "flex", alignItems: "center" }}>
                  {loading ? (
                    <Skeleton width={300} />
                  ) : (
                    <>
                      {item.title}
                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "inherit",
                          fontWeight: "inherit",
                          color: "inherit"
                        }}
                      >
                        #{item.tag}
                      </span>
                    </>
                  )}
                </h2>

                <p className="mb-4">
                  {loading ? <Skeleton count={3} /> : item.description}
                </p>

                <div className="mb-4">
                  {loading ? (
                    <Skeleton width={120} />
                  ) : (
                    <h3>{item.price} ETH</h3>
                  )}
                </div>

                <div className="d-flex mb-4">

                  <div className="me-4">
                    {loading ? (
                      <Skeleton width={80} />
                    ) : (
                      <>❤️ {item.likes} Likes</>
                    )}
                  </div>

                  <div>
                    {loading ? (
                      <Skeleton width={80} />
                    ) : (
                      <>👁 {item.views} Views</>
                    )}
                  </div>

                </div>

                <hr />

                <div className="d-flex align-items-center mt-4">

                  {loading ? (
                    <Skeleton circle height={50} width={50} />
                  ) : (
                    <img
                      src={item.creatorImage}
                      alt={item.creatorName}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "12px"
                      }}
                    />
                  )}

                  <div>
                    <small>Creator</small>
                    <br />

                    {loading ? (
                      <Skeleton width={140} />
                    ) : (
                      <Link to={`/author/${item.creatorId}`}>
                        {item.creatorName}
                      </Link>
                    )}
                  </div>

                </div>

                <div className="d-flex align-items-center mt-4">

                  {loading ? (
                    <Skeleton circle height={50} width={50} />
                  ) : (
                    <img
                      src={item.ownerImage}
                      alt={item.ownerName}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        marginRight: "12px"
                      }}
                    />
                  )}

                  <div>
                    <small>Owner</small>
                    <br />

                    {loading ? (
                      <Skeleton width={140} />
                    ) : (
                      <Link to={`/author/${item.ownerId}`}>
                        {item.ownerName}
                      </Link>
                    )}
                  </div>

                </div>

                <div className="mt-5">
                  <Link to="/explore" className="btn-main">
                    Back to Explore
                  </Link>
                </div>

              </div>

            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default ItemDetails;