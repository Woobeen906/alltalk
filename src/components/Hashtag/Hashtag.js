import React, { useState } from "react";
import "./Hashtag.scss";

const HashtagManager = (props) => {
  // const [hashtags, setHashtags] = useState([]);

  const HashtagInput = ({ hashtags, setHashtags }) => {
    const [newTag, setNewTag] = useState("");

    const handleSubmit = (e) => {
      // 스페이스바 32 엔터 13
      if (e.which === 32 || e.which === 13) {
        e.preventDefault();
        props.setHashtags([...props.hashtags, newTag]);
        setNewTag("");
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleSubmit}
          placeholder="원하는 태그 검색"
          className="hashtag-input"
        />
      </form>
    );
  };

  return (
    <>
      <HashtagInput hashtags={props.hashtags} setHashtags={props.setHashtags} />
      {/* <HashtagList hashtags={hashtags} /> */}
    </>
  );
};
export const HashtagList = (props) => {
  const Hashtag = ({ tag }) => {
    // return <a href={`/hashtag/${tag.substring(1)}`}>{tag}</a>;
    return <span className="hashtag">{tag}</span>;
  };
  return (
    <div>
      {props.hashtags.map((tag) => (
        <Hashtag key={tag} tag={tag} />
      ))}
    </div>
  );
};

export default HashtagManager;
