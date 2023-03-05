import React, { useEffect, useState } from "react";
import "./Gallery.scss";

import axios from "axios";
import { useMediaQuery } from "react-responsive";

const Gallery = (props) => {
  const { imgs } = props;

  let images = document.getElementsByClassName("gallery-list");

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [step, setStep] = useState(0);
  const [curPos, setCurPos] = useState(0);
  const [position, setPosition] = useState(0);
  const [pageWidth, setPageWidth] = useState(
    document.getElementsByClassName("gallery-li")
  );

  const [image, setImage] = useState([]);
  const [mount, setMount] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    id: "",
    image: "",
    title: "",
  });

  const currentView = (id) => {
    setCurrentItem(image.find((item) => item.id === id));
  };

  const Image = (img, id) => {
    axios({
      method: "POST",
      url: img,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      if (id === 0)
        setCurrentItem({ id: id, image: url, title: `${id}${url}` });

      setImage((prev) => [
        ...prev,
        { id: id, image: url, title: `${id}${url}` },
      ]);
    });
  };

  const resizeWidth = () => {
    const stepPage = document.getElementsByClassName("gallery-li");

    const str = window.getComputedStyle(stepPage[0], null).width;
    let regex = /[^0-9]/g;
    let result = str.replace(regex, "");
    setPageWidth(result);
  };

  function prev() {
    if (curPos > 0) {
      const newPosition = step + pageWidth[0].scrollWidth;

      images[0].style.transform = `translateX(${newPosition}px)`;
      setCurPos(curPos - 1);
      setStep(newPosition);
    }
  }

  function next() {
    if (curPos < image.length - 1) {
      const newPosition = step - pageWidth[0].scrollWidth;

      images[0].style.transform = `translateX(${newPosition}px)`;
      setCurPos(curPos + 1);
      setStep(newPosition);
    }
  }

  function touchStart(event) {
    const startX = event.touches[0].pageX;
    setPosition(startX);
  }

  function touchEnd(event) {
    const endX = event.changedTouches[0].pageX;

    if (position > endX) {
      next();
    } else {
      prev();
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setMount(true);
    }, 500);

    window.addEventListener("resize", resizeWidth);

    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  useEffect(() => {
    imgs.map((item, index) => Image(item, index));
  }, [mount]);

  return (
    <div className="gallery">
      {isMobile && (
        <div className="gallery-view">
          <img src={currentItem.image} alt={currentItem.title} />

          <div className="gallery-view-number">{`${currentItem.id + 1}/${
            imgs.length
          }`}</div>
        </div>
      )}
      {!isMobile && (
        <div className="gallery-view-number">{`${curPos + 1}/${
          imgs.length
        }`}</div>
      )}
      <div
        className="gallery-list"
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
      >
        {image
          .sort((a, b) => a.id - b.id)
          .map((item) => (
            <React.Fragment key={item.image}>
              <li onClick={() => currentView(item.id)} className="gallery-li">
                {
                  <img
                    src={item.image}
                    alt={item.title}
                    className={`${item.id === currentItem.id && "currentimg"}`}
                  />
                }
              </li>
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};

export default Gallery;
