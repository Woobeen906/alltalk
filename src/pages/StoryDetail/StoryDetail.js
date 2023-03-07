import React, { useEffect, useState } from "react";
import "./StoryDetail.scss";

import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { BASE_URL } from "config";
import { useMediaQuery } from "react-responsive";

import StoryDetailTitle from "components/StoryDetailTitle/StoryDetailTitle";
import StoryDetailContent from "components/StoryDetailContent/StoryDetailContent";

import heart from "../../assets/imgs/like.jpg";

import { getDayMinuteCounter } from "assets/utils/getDayCouter";

const StoryDetail = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [page, setPage] = useState({
    left: state.idx - 1 > 0,
    mid: true,
    right: false,
  });
  const [imgs, setImgs] = useState([]);
  const [story, setStory] = useState({
    idx: "",
    content: "",
    day: "",
    subtitle: "",
    tag: "",
    title: "",
  });
  const [user, setUser] = useState({
    introduce: "",
    nickname: "",
    profile: "",
  });
  const [content, setContent] = useState({
    content: "",
    day: "",
    deadline: "",
    idx: "",
    maxMember: "",
    member: "",
    subtitle: "",
    tag: "",
    title: "",
  });

  const [nextContent, setNextContent] = useState({});
  const [preContent, setPreContent] = useState({});
  const [nextImg, setNextImg] = useState("");
  const [curImg, setCurImg] = useState("");
  const [prevImg, setPrevImg] = useState("");

  const loadPrevData = async () => {
    await axios({
      method: "POST",
      url: preContent.img,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setPrevImg(url);
    });
  };
  const loadNextData = async () => {
    await axios({
      method: "POST",
      url: nextContent.img,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setNextImg(url);
    });
  };
  const loadCurImg = async () => {
    await axios({
      method: "POST",
      url: imgs[0],
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setCurImg(url);
    });
  };

  const loadData = async () => {
    await axios({
      method: "POST",
      url: `${BASE_URL}/${state.root}/${state.idx}`,
    }).then((res) => {
      console.log(res.data);
      if (!res.data.result) {
        if (res.data.nextContent) {
          setNextContent(res.data.nextContent);
        } else if (res.data.nextStory) {
          setNextContent(res.data.nextStory);
        }
        if (res.data.preContent) {
          setPreContent(res.data.preContent);
        }
        if (res.data.preStory) {
          setPreContent(res.data.preStory);
        }
        setImgs(res.data.img);
        setUser(res.data.user);
        setStory(res.data.story);
        setContent(res.data.content);
      }
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (imgs.length !== 0) loadCurImg();
  }, [imgs]);
  useEffect(() => {
    if (Object.keys(nextContent).length !== 0) {
      loadNextData();
      setPage({ ...page, right: true });
    }
  }, [nextContent]);
  useEffect(() => {
    if (Object.keys(preContent).length !== 0) {
      loadPrevData();
    }
  }, [preContent]);

  const onClickPrevPage = () => {
    navigate(`/StoryDetail/${preContent.idx}`, {
      state: { idx: preContent.idx, root: state.root },
    });
    window.location.reload();
  };
  const onClickNextPage = () => {
    navigate(`/StoryDetail/${nextContent.idx}`, {
      state: { idx: nextContent.idx, root: state.root },
    });
    window.location.reload();
  };

  const participation = () => {
    let frm = new FormData();
    frm.append("id", localStorage.getItem("id"));
    frm.append("idx", state.idx);
    axios({
      method: "POST",
      url: `${BASE_URL}/${state.root}/participation`,
      data: frm,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="storyDetail">
      <div className="storyDetail-title">
        {state.root === "content" ? (
          <StoryDetailTitle story={content} user={user} root={state.root} />
        ) : (
          <StoryDetailTitle story={story} user={user} root={state.root} />
        )}
      </div>
      <div className="storyDetail-content">
        {state.root === "content" ? (
          <StoryDetailContent
            story={content}
            user={user}
            imgs={imgs}
            root={state.root}
          />
        ) : (
          <StoryDetailContent
            story={story}
            user={user}
            imgs={imgs}
            root={state.root}
          />
        )}
      </div>
      <div className="storyDetail-bottom">
        {page.left && (
          <button
            className="storyDetail-btn-left"
            onClick={() => onClickPrevPage()}
          >
            <img src={prevImg} alt={prevImg} />
            <div className="storyDetail-btn-title">이전 스토리</div>
            <div className="storyDetail-btn-content">{preContent.title}</div>
            <div className="storyDetail-btn-time">
              {preContent.day && getDayMinuteCounter(preContent.day)}
            </div>
          </button>
        )}

        {isMobile && page.mid && (
          <button
            className="storyDetail-btn-mid"
            style={{
              borderRadius: `${
                !isMobile
                  ? "0px"
                  : !page.left
                  ? "10px 0px 0px 10px"
                  : !page.right && "0px 10px 10px 0px"
              }`,
              cursor: "default",
            }}
          >
            <img src={curImg} alt={curImg} />
            <div className="storyDetail-btn-title">현재 스토리</div>
            <div className="storyDetail-btn-content">
              {state.root === "content" ? content.title : story.title}
            </div>
            <div className="storyDetail-btn-time">
              {getDayMinuteCounter(
                state.root === "content" ? content.day : story.day
              )}
            </div>
          </button>
        )}
        {page.right && (
          <button
            className="storyDetail-btn-right"
            onClick={() => onClickNextPage()}
          >
            <img src={nextImg} alt={nextImg} />

            <div className="storyDetail-btn-title">다음 스토리</div>
            <div className="storyDetail-btn-content">{nextContent.title}</div>
            <div className="storyDetail-btn-time">
              {getDayMinuteCounter(nextContent.day)}
            </div>
          </button>
        )}
      </div>

      {
        <div className="storyDetail-bottombar">
          <div className="storyDetail-bottombar-left">
            <img src={heart} />
            {state.like}
          </div>
          {state.root === "content" && (
            <button
              className="storyDetail-bottombar-right"
              onClick={participation}
              style={{
                backgroundColor:
                  content.member > content.maxMember && "#00CB8E",
              }}
            >
              {content.member > content.maxMember
                ? "신청하기"
                : "이미 신청한 콘텐츠입니다"}
            </button>
          )}
        </div>
      }
    </div>
  );
};

export default StoryDetail;
