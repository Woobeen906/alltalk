import React, { useEffect, useState } from "react";
import "./Mypage.scss";

import MypageCard from "components/MypageCard/MypageCard";
import MypageProfile from "components/MypageProfile/MypageProfile";

import axios from "axios";
import { useMediaQuery } from "react-responsive";

import { BASE_URL } from "config";

import List1 from "assets/imgs/list1.png";
import List1Active from "assets/imgs/list1Active.png";
import List2 from "assets/imgs/list2.png";
import List2Active from "assets/imgs/list2Active.png";

const Mypage = () => {
  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const [selectMenu, setSelectMenu] = useState("스토리");
  const [userData, setUserData] = useState({
    nickname: "",
    introduce: "",
    profile: "",
    story: [],
    storyLike: [],
    contentLike: [],
    participation: [],
  });
  const [curList, setCurList] = useState(userData.story);
  const [participationList, setParticipationList] = useState([]);
  const [storyLikeList, setStoryLike] = useState([]);
  const [mobileListType, setMobileListType] = useState(0);

  const onClickMenu = (e) => setSelectMenu(e.currentTarget.id);
  const onHandleListType = (e) => {
    setMobileListType(e.currentTarget.value);
  };

  const loadData = async () => {
    const frm = new FormData();
    frm.append("id", localStorage.getItem("id"));

    const url = localStorage.getItem("admin") ? "admin" : "user";

    await axios({
      method: "POST",
      url: `${BASE_URL}/my/${url}`,
      data: frm,
    }).then((res) => {
      if (res.data !== "error") {
        setUserData({
          ...userData,
          nickname: res.data.nickname,
          introduce: res.data.introduce,
          profile: res.data.profile,
          story: [...res.data.story],
          storyLike: [...res.data.storyLike],
          contentLike: [...res.data.contentLike],
          participation: [...res.data.participation],
        });

        setCurList(res.data.story);
      }
    });
  };

  const loadParticipation = async (idx) => {
    await axios({
      method: "POST",
      url: `${BASE_URL}/content/${idx}`,
    }).then((res) => {
      setParticipationList((prev) => {
        return [...prev, res.data];
      });
    });
  };

  const loadStoryLikeData = async (idx) => {
    await axios({
      method: "POST",
      url: `${BASE_URL}/story/${idx}`,
    }).then((res) => {
      setStoryLike((prev) => {
        return [...prev, res.data];
      });
    });
  };

  useEffect(() => {
    setSelectMenu("스토리");
    loadData();
    setCurList(userData.story);
  }, []);
  useEffect(() => {
    userData.participation &&
      userData.participation.map((item) => loadParticipation(item.idx));
  }, [userData.participation]);

  useEffect(() => {
    userData.storyLike &&
      userData.storyLike.map((item) => loadStoryLikeData(item.idx));
  }, [userData.storyLike]);

  useEffect(() => {
    switch (selectMenu) {
      case "스토리":
        setCurList(userData.story);
        break;
      case "좋아요":
        setCurList(storyLikeList);
        break;
      case "신청":
        setCurList(participationList);
        break;
      default:
        break;
    }
  }, [selectMenu]);

  return (
    <div className="mypage">
      <MypageProfile item={userData} />

      <div className="mypage-list">
        <ul className="mypage-list-menu">
          <li
            className={`${selectMenu === "스토리" && "selectedMenu"}`}
            onClick={onClickMenu}
            id={"스토리"}
          >
            {`스토리 ${userData.story.length}`}
          </li>
          <li
            className={`${selectMenu === "좋아요" && "selectedMenu"} `}
            onClick={onClickMenu}
            id={"좋아요"}
          >
            {`좋아요 ${userData.storyLike.length}`}
          </li>
          <li
            className={`${selectMenu === "신청" && "selectedMenu"}`}
            onClick={onClickMenu}
            id={"신청"}
          >
            {`신청 ${userData.participation.length}`}
          </li>
        </ul>

        {isMobile ? (
          <div className="mypage-itemlist">
            {curList.map((item, index) =>
              selectMenu === "스토리" ? (
                <MypageCard
                  item={item}
                  img={item.img}
                  key={`${item}${index}`}
                  selectMenu={selectMenu}
                />
              ) : selectMenu === "좋아요" ? (
                <MypageCard
                  item={item.story}
                  img={item.img}
                  key={`${item}${index}`}
                  selectMenu={selectMenu}
                />
              ) : (
                <MypageCard
                  item={item.content}
                  img={item.img}
                  key={`${item}${index}`}
                  selectMenu={selectMenu}
                />
              )
            )}
          </div>
        ) : (
          <div className="mypage-mobileList">
            <div className="mypage-mobileList-type">
              <button
                className="mypage-mobileList-list1"
                value={0}
                onClick={onHandleListType}
                style={{
                  backgroundImage: `url(${
                    mobileListType == 0 ? List1Active : List1
                  })`,
                }}
              ></button>
              <button
                className="mypage-mobileList-list2"
                value={1}
                onClick={onHandleListType}
                style={{
                  backgroundImage: `url(${
                    mobileListType == 1 ? List2Active : List2
                  })`,
                }}
              ></button>
            </div>
            <div
              className={`mypage-itemlist ${
                mobileListType == 1 && !isMobile && "mypage-type2List"
              }`}
            >
              {curList.map((item, index) =>
                selectMenu === "스토리" ? (
                  <MypageCard
                    item={item}
                    img={item.img}
                    title={item.title}
                    day={item.day}
                    key={`${item}${index}`}
                    selectMenu={selectMenu}
                    listType={mobileListType}
                  />
                ) : selectMenu === "좋아요" ? (
                  <MypageCard
                    item={item.story}
                    img={item.img}
                    // title={item.story.title}
                    // day={item.story.day}
                    key={`${item}${index}`}
                    selectMenu={selectMenu}
                    listType={mobileListType}
                  />
                ) : (
                  <></>
                  // <MypageCard
                  //   item={item}
                  //   img={item.img}
                  //   title={item.content.title}
                  //   day={item.content.day}
                  //   key={`${item}${index}`}
                  //
                  //   selectMenu={selectMenu}
                  // />
                )
              )}
              {/* {curList.map((item, index) => (
                <MypageCard
                  img={item.img}
                  title={item.title}
                  day={item.day}
                  key={`${item}${index}`}
                  listType={mobileListType}
                  
                  selectMenu={selectMenu}
                />
              ))} */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Mypage;
