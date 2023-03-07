import React, { useEffect, useState } from "react";
import "./Save.scss";

import axios from "axios";
import { BASE_URL } from "config";

const Save = (props) => {
  const { onClick, hashtags, setHashtags, inputData, setInputData } = props;
  const [saveDataList, setSaveDataList] = useState([]);
  const [saveData, setSaveData] = useState();

  const loadSaveDataList = async () => {
    let frm = new FormData();

    frm.append("id", localStorage.getItem("id"));

    let url = localStorage.getItem("admin")
      ? `${BASE_URL}/write/content/temp/list`
      : `${BASE_URL}/write/story/temp/list`;

    await axios({
      method: "POST",
      url: url,
      data: frm,
    })
      .then((res) => {
        console.log(res.data);

        if (res.data) setSaveDataList(res.data);
      })
      .catch((e) => console.log(e));
  };

  const loadSaveData = async (idx) => {
    let frm = new FormData();
    frm.append("idx", idx);

    let url = localStorage.getItem("admin")
      ? `${BASE_URL}/write/content/temp/load`
      : `${BASE_URL}/write/story/temp/load`;
    axios({
      method: "POST",
      url: url,
      data: frm,
    })
      .then((res) => {
        setSaveData(res.data);
        if (res.data) {
          setInputData({
            ...inputData,
            title: res.data.title,
            subTitle: res.data.subtitle,
            contents: res.data.content,
          });
          const tags = res.data.tag.split(",");
          setHashtags([...hashtags, ...tags]);

          onClick();
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadSaveDataList();
  }, []);

  const saveItem = (props) => {
    const { day, idx, img, title } = props;

    const date = new Date(day);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const dday = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();

    return (
      <div className="save-item" onClick={() => loadSaveData(idx)}>
        <div className="save-item-img">
          <img src={saveData} />
          {/* <img src={require("../../assets/imgs/defaultNoword.jpeg")} /> */}
        </div>
        <div className="save-item-text-box">
          <div className="save-item-text">{title}</div>
          <div className="save-item-date">
            {`${year}.${month}.${dday} ${hour}:${minute} `}저장
          </div>
        </div>
        <button className="save-item-delete"></button>
      </div>
    );
  };

  return (
    <div className="save">
      <div className="save-box">
        <div className="save-box-top">
          <div className="save-box-load">
            임시저장 불러오기<span>{saveDataList.length}</span>
          </div>
          <div className="save-box-btn">
            <button onClick={onClick}>X</button>
          </div>
        </div>
        <div className="save-box-bottom">
          {saveDataList.map((item) => saveItem(item))}
        </div>
      </div>
    </div>
  );
};
export default Save;
