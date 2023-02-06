import React, { useState, useEffect, Fragment } from "react";
import "./Preview.scss";

const Preview = (props) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [dragId, setDragId] = useState("");

  useEffect(() => {
    setPreviewImages(props.imagesPreviewUrls);
  }, [props.imagesPreviewUrls]);

  const deleteImage = (id) => {
    props.deleteImage(id);
  };

  const handleOver = (ev) => {
    ev.preventDefault();
  };

  const handleDrag = (ev) => {
    setDragId(ev.currentTarget.id);
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    const dragImage = previewImages.find((image) => image.id == dragId);
    const dropImage = previewImages.find(
      (image) => image.id == ev.currentTarget.id
    );
    const arr = moveItem(dragImage.id - 1, dropImage.id - 1);

    setPreviewImages(arr);
  };

  const moveItem = (from, to) => {
    const f = previewImages.splice(from, 1)[0];
    previewImages.splice(to, 0, f);
    return previewImages;
  };

  const renderPreview = () => {
    if (previewImages.length > 0) {
      previewImages.map((items, index) => (items.id = index + 1));
    }
    return (
      <div className="preview">
        {previewImages.length > 0 &&
          previewImages.map((element, index) => {
            return (
              <div
                className="gallery"
                key={index}
                id={element.id}
                draggable
                onDragOver={(e) => handleOver(e)}
                onDragStart={(e) => handleDrag(e)}
                onDrop={(e) => handleDrop(e)}
              >
                <img src={element.file} alt={element.name} />
                {index === 0 && <div className="thumbnail">대표사진</div>}
                <div
                  className="image-order"
                  onClick={() => deleteImage(element.name)}
                ></div>
              </div>
            );
          })}
      </div>
    );
  };

  return <>{renderPreview()}</>;
};

export default Preview;
