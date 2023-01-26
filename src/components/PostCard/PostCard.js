import React from "react";
import "./PostCard.scss";

import Tag from "components/Tag/Tag";

const PostCard = (props) => {
  const { image, tags, title, content, member, maxMember } = props;
  const deadline = maxMember - member === 1;

  return (
    <div className="postCard">
      <div className="postCard-image-dday" style={image ? {} : { margin: 0 }}>
        D-2
      </div>
      {deadline && <div className="postCard-deadline-message">마감임박</div>}
      {image && (
        <div className="postCard-image">
          <img src={image} alt="cat" />
        </div>
      )}
      <div
        className="postCard-text"
        style={!image ? { marginTop: "32px" } : {}}
      >
        {tags && (
          <div className="postCard-tag">
            {tags.map((tag, index) => (
              <Tag text={tag} id={index} />
            ))}
          </div>
        )}
        {!title && (
          <div className="postCard-title">
            {title}
            asdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdf
          </div>
        )}

        {!image && (
          <div className="postCard-content">
            {content}
            asdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdfasdakljsdfhakjsdhfakjsdhfkajsdf
          </div>
        )}
        <div className="postCard-number">
          <img
            src={require("assets/imgs/memberNumber.jpg")}
            alt="postCardMemberNumber"
          />
          모집 인원{" "}
          <strong
            style={deadline ? { color: "red" } : { color: "black" }}
          >{`${member}/${maxMember}`}</strong>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
