import React, { useState } from "react";

import "./ImageUploader.scss";

import Preview from "./Preview";
import Uploader from "./Uploader";

const Imageuploader = () => {
  const [imagesPreviewUrls, setImagesPreviewUrls] = useState([]);

  const imagesPreviewUrlsHandler = (result) => {
    console.log(result);

    setImagesPreviewUrls([...imagesPreviewUrls, result]);
  };

  const deleteImage = (name) => {
    if (imagesPreviewUrls.length > 0) {
      const filteredImages = imagesPreviewUrls.filter(
        (image) => image.name !== name
      );
      setImagesPreviewUrls(filteredImages);
    }
  };

  return (
    <div className="imageuploader">
      <div className="imageuploader-top">
        <Uploader imagesPreviewUrlsHandler={imagesPreviewUrlsHandler} />
      </div>
      {imagesPreviewUrls.length > 0 && (
        <div className="imageuploader-bottom">
          <Preview
            imagesPreviewUrls={imagesPreviewUrls}
            deleteImage={deleteImage}
          />
        </div>
      )}
    </div>
  );
};

export default Imageuploader;
