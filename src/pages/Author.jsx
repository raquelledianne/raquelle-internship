import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers")
      .then((res) => res.json())
      .then((data) => {
        const foundAuthor = data.find(
          (item) => item.authorId === Number(authorId)
        );
        setAuthor(foundAuthor);
      })
      .catch((err) => console.error("API Error:", err));
  }, [authorId]);

  if (!author) {
    return <div className="container">Loading author...</div>;
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">

        <section
          id="profile_banner"
          className="text-light"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section>
          <div className="container">
            <div className="row">

              <div className="col-md-12">
                <div className="d_profile de-flex">

                  <div className="de-flex-col">
                    <div className="profile_avatar">

                      <img src={author.authorImage} alt={author.authorName} />

                      <i className="fa fa-check"></i>

                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">
                            @{author.authorName}
                          </span>

                          <span id="wallet" className="profile_wallet">
                            Wallet: {author.authorId}
                          </span>

                          <button id="btn_copy">
                            Copy
                          </button>

                        </h4>
                      </div>

                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {author.price} ETH sold
                      </div>

                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems authorId={authorId} />
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Author;