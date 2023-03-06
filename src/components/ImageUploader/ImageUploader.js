import React, { useEffect, useState } from "react";
import "./ImageUploader.scss";

import { throttle } from "lodash";
import { useMediaQuery } from "react-responsive";

const ImageUploader = (props) => {
  const { onChange, List, setlist, setPostImages } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [id, setId] = useState(0);

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = throttle((e) => {
    e.preventDefault();
    setIsDragOver(true);
    setId(e.target.id);
  }, 500);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDragOver(false);

    List.splice(e.target.id, 1);
    List.splice(id, 0, e.target.src);
  };

  const onTouchStart = (e) => {
    setIsDragging(true);
    console.log("touch start");
  };

  const onTouchMove = throttle((e) => {
    console.log(e.nativeEvent.touches[0].screenX);
  }, 500);

  const onTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setIsDragOver(false);

    console.log("touch end", e.target.id);

    // List.splice(e.target.id, 1);
    // List.splice(id, 0, e.target.src);
  };

  const deleteImg = (e) => {
    e.preventDefault();
    setlist(List.filter((item) => item !== e.currentTarget.value));
  };

  useEffect(() => {
    // window.addEventListener("touchstart", onTouchStart, { passive: false });
    // window.addEventListener("touchmove", handleDragOver, { passive: false });
    // window.addEventListener("touchend", onTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", handleDragOver);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <div className="imageuploader">
      <input type={"file"} multiple onChange={onChange} />

      {List.map((item, index) => (
        <div className="imageuploader-box">
          <img
            src={item}
            alt={`${item}`}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDrop}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            draggable
            id={index}
          />
          <button
            className="imagedeleteBtn"
            onClick={deleteImg}
            value={item}
          ></button>
          {isMobile && index === 0 && (
            <div className="imageuploader-mainImg">대표사진</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageUploader;
