import React, { useState } from "react";
import "./Hashtag.scss";

const extractHashtags = (text) => {
  return text.match(/#\w+/g);
};

const HashtagInput = ({ hashtags, setHashtags }) => {
  const [newTag, setNewTag] = useState("");

  const handleSubmit = (e) => {
    // 스페이스바 32 엔터 13
    if (e.which === 32 || e.which === 13) {
      e.preventDefault();
      setHashtags([...hashtags, newTag]);
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
      {/* <button type="submit">Add</button> */}
    </form>
  );
};

const Hashtag = ({ tag }) => {
  return <a href={`/hashtag/${tag.substring(1)}`}>{tag}</a>;
};

export const HashtagList = ({ hashtags }) => {
  return (
    <div>
      {hashtags.map((tag) => (
        <Hashtag key={tag} tag={tag} />
      ))}
    </div>
  );
};

const HashtagManager = () => {
  const [hashtags, setHashtags] = useState([]);
  return (
    <>
      <HashtagInput hashtags={hashtags} setHashtags={setHashtags} />
      {/* <HashtagList hashtags={hashtags} /> */}
    </>
  );
};

export default HashtagManager;
