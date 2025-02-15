import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import prevArrow from "../../images/chevron-left-solid.svg";
import nextArrow from "../../images/chevron-right-solid.svg";

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdowns, setCountdowns] = useState({});

  async function fetchNewItems() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
    setLoading(false);
    // useCountdown(data);
  }

  function useCountdown(expiryDate) {
    const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
      const targetDate = new Date(expiryDate).getTime();

      function updateCountdown() {
        const now = Date.now();
        const distance = targetDate - now;
        if (distance < 0) {
          setTimeLeft("");
          return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        setTimeout(updateCountdown, 1000);
      }
      updateCountdown();

      // Cleanup on unmount

      return () => clearTimeout(updateCountdown);
    }, [expiryDate]);
    return timeLeft;
  }

  function SampleNextArrow(props) {
    const { arrow__custom, style, onClick } = props;
    return (
      <div
        id="arrows__custom"
        className={arrow__custom}
        style={{
          ...style,
          display: "block",
          background: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          lineHeight: "40px",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          right: "-5px",
          transform: "translateY(-50%)",
          zIndex: 1,
          border: "1px solid lightgray",
          transition: "all ease .5s",
          ":hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 8px rgba(0,0,0,0.1)",
          },
        }}
        onClick={onClick}
      >
        <img
          src={nextArrow}
          style={{
            width: "25px",
            height: "10px",
            lineHeight: "25px",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "6.8px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { arrow__custom, style, onClick } = props;
    return (
      <div
        className={arrow__custom}
        style={{
          ...style,
          display: "block",
          background: "white",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          lineHeight: "40px",
          textAlign: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          left: "-5px",
          transform: "translateY(-50%)",
          zIndex: 1,
          border: "1px solid lightgray",
          transition: "all ease .5s",
          ":hover": {
            transform: "scale(1.05)",
            boxShadow: "0 8px 8px rgba(0,0,0,0.1)",
          },
        }}
        onClick={onClick}
      >
        <img
          src={prevArrow}
          style={{
            width: "25px",
            height: "10px",
            lineHeight: "25px",
            cursor: "pointer",
            position: "absolute",
            top: "50%",
            left: "6.8px",
            transform: "translateY(-50%)",
            zIndex: 1,
          }}
        />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 780,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      fetchNewItems();
    }, 5000);
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {loading ? (
            <>
              <Slider {...settings}>
                {new Array(4).fill(0).map((_, index) => (
                  <div className="newitems__loading" key={index}>
                    <div className="nft_newitems--loader">
                      <div className="skeleton__box"></div>
                      <div className="nft_newitem_pp--loader">
                        <i className="fa fa-check"></i>
                      </div>

                      <div className="nft_newitems__info--loader">
                        <div className="nft_newitems__topinfo--loader"></div>
                        <div className="nft_newitems__bottominfo--loader"></div>
                        <div className="nft_newitems__likeinfo--loader"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </>
          ) : (
            <Slider {...settings}>
              {newItems.map((newItem) => (
                <div
                  // className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={newItem.id}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link
                        to="/author"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <img
                          className="lazy"
                          src={newItem.authorImage}
                          alt=""
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">
                      {useCountdown(newItem.expiryDate)}
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <img
                          src={newItem.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{newItem.title}</h4>
                      </Link>
                      <div className="nft__item_price">{newItem.price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{newItem.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
