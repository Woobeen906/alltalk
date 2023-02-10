import React, { useState } from "react";
import "./Gallery.scss";
import image from "../../assets/imgs/cat.jpg";
import image2 from "../../assets/imgs/image1.jpg";
import image3 from "../../assets/imgs/image2.jpg";
import image4 from "../../assets/imgs/image3.jpg";
import image5 from "../../assets/imgs/calendar.jpg";

const Gallery = () => {
  const [data, setData] = useState([
    { id: 1, image: image, title: "고양이" },
    { id: 2, image: image2, title: "고양이" },
    { id: 3, image: image3, title: "고양이" },
    { id: 4, image: image4, title: "고양이" },
    { id: 5, image: image5, title: "고양이" },
    { id: 6, image: image, title: "고양이" },
    { id: 7, image: image, title: "고양이" },
    { id: 8, image: image, title: "고양이" },
    { id: 9, image: image, title: "고양이" },
    { id: 10, image: image, title: "고양이" },
  ]);
  const [currentItem, setCurrentItem] = useState(data[0]);

  const currentView = (id) => {
    setCurrentItem(data.find((item) => item.id === id));
  };

  return (
    <div className="gallery">
      <div className="gallery-view">
        <img src={currentItem.image} alt={currentItem.title} />
      </div>
      <div className="gallery-list">
        {data.map((item) => (
          <>
            <li onClick={() => currentView(item.id)}>
              {
                <img
                  src={item.image}
                  alt={item.title}
                  className={`${item.id === currentItem.id && "currentimg"}`}
                />
              }
            </li>
          </>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
