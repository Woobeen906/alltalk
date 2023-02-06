import React, { useState } from "react";
import "./Uploader.scss";

const Uploader = (props) => {
  const [imageValidationError, setImageValidationError] = useState(null);

  const filesSelectedHandler = (e) => {
    if (checkMimeType(e)) {
      const { imagesPreviewUrlsHandler } = props;

      const files = Array.from(e.target.files);

      files.forEach((file, index) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const result = {
            file: reader.result,
            size: file.size,
            name: file.name,
          };
          // console.log(result);
          setImageValidationError(null);
          imagesPreviewUrlsHandler(result);
        };
      });
    }
  };

  const checkMimeType = (event) => {
    const { files } = event.target;
    let err = "";
    const types = ["image/png", "image/jpeg", "image/jpg"];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format\n`;
      }
    }

    if (err !== "") {
      event.target.value = null;
      setImageValidationError(err);
      return false;
    }
    return true;
  };

  return (
    <div className="uploader">
      <input
        type="file"
        name="file"
        id="file"
        className="custom-file-input"
        onChange={filesSelectedHandler}
        accept="image/png, image/jpeg"
        multiple
      />

      {imageValidationError ? (
        <span className="error-msg">{imageValidationError}</span>
      ) : null}
    </div>
  );
};

export default Uploader;
