import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";

const Author = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        const data = await res.json();

        setAuthor({
          authorName: data.authorName,
          authorImage: data.authorImage,
          wallet: data.wallet,
        });

        setFollowersCount(data.followers); 
        setNfts(data.nftCollection || []);
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleFollow = () => {
    if (isFollowing) {
      setFollowersCount((prev) => prev - 1);
    } else {
      setFollowersCount((prev) => prev + 1);
    }
    setIsFollowing(!isFollowing);
  };

  if (loading) return <div className="container mt-5">Loading author...</div>;
  if (!author) return <div className="container mt-5">Author not found</div>;

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
                            Wallet: {author.wallet}
                          </span>
                          <button id="btn_copy">Copy</button>
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{followersCount} followers</div>
                      <button onClick={handleFollow} className="btn-main">
                        {isFollowing ? "Unfollow" : "Follow"}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems items={nfts} author={author} authorId={authorId}/>
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