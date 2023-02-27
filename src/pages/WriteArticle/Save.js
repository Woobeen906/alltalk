import React, { useEffect, useState } from "react";
import "./Save.scss";

import axios from "axios";

const Save = (props) => {
  const { onClick } = props;
  const [saveData, setSaveData] = useState([]);
  const [test, setTest] = useState();

  const loadSaveData = async () => {
    let frm = new FormData();
    console.log(localStorage.setItem("id"));
    frm.append("id", "siugan");
    await axios({
      method: "POST",
      url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/write/story/temp/list",
      data: frm,
    })
      .then((res) => {
        if (res.data) setSaveData(res.data);
        // console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadSaveData();
  }, []);

  const saveItem = (props) => {
    const { day, idx, img, title } = props;

    axios({
      method: "POST",
      url: "http://ec2-13-125-123-39.ap-northeast-2.compute.amazonaws.com:5000/util/story/1/0",
    })
      .then((res) => {
        setTest(res.data);
        // console.log(res);
      })
      .catch((e) => console.log(e));
    return (
      <div className="save-item">
        <img src={test} />
      </div>
    );
  };

  return (
    <div className="save">
      <div className="save-box">
        <div className="save-box-top">
          임시저장 불러오기
          <div className="save-box-btn">
            <button onClick={onClick}>X</button>
          </div>
        </div>
        <div className="save-box-bottom">
          {saveData.map((item) => saveItem(item))}
        </div>
      </div>
    </div>
  );
};
export default Save;
