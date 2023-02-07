import React, { useState } from "react";
import "./SignUpInput.scss";

import Input from "components/Input/Input";
import Space from "components/Space/Space";

const SignUpInput = () => {
  const [step, setStep] = useState(0);
  const nextButton = () => {
    setStep((prev) => {
      return prev + 1;
    });
  };
  const prevButton = () => {
    setStep((prev) => {
      return prev - 1;
    });
  };
  const SignUpInputStep1 = () => {
    return (
      <div className="signUpInputStep1">
        <div className="signUpInputStep1-title">기본정보 입력</div>

        <div className="signUpInputStep1-content">
          <Space size={40} />
          <div className="signUpInputStep1-input">
            아이디*
            <Space size={16} />
            <Input
              type="text"
              placeholder="5~16자의 영문, 숫자, ‘-’,’_’ 사용"
            />
          </div>
          <div className="signUpInputStep1-input">
            비밀번호*
            <Space size={16} />
            <Input
              type="password"
              placeholder="8~15자의 영문, 숫자,특수문자 사용"
            />
            <Space size={8} />
            <Input
              type="password"
              placeholder="비밀번호를 한 번 더 입력해주세요."
            />
          </div>
          <div className="signUpInputStep1-input">
            이름*
            <Space size={16} />
            <Input type="text" placeholder="2~8자의 이름을 입력해주세요." />
          </div>
          <div className="signUpInputStep1-input">
            휴대폰번호*
            <Space size={16} />
            <Input type="tel" placeholder="‘-’ 없이 입력 (ex:01012345678)" />
          </div>
          <div className="signUpInputStep1-input">
            이메일*
            <Space size={16} />
            <Input type="email" placeholder="이메일을 입력해주세요." />
          </div>

          <button className="signUpInputStep1-btn" onClick={nextButton}>
            다음
          </button>
        </div>
      </div>
    );
  };
  const SignUpInputStep2 = () => {
    const [hashtags, setHashtags] = useState([]);

    const HashtagInput = ({ hashtags, setHashtags, placeholder }) => {
      const [newTag, setNewTag] = useState("");

      const handleSubmit = (e) => {
        if (newTag !== " " && newTag.length > 0) {
          // 스페이스바 32 엔터 13
          if (e.which === 32 || e.which === 13) {
            e.preventDefault();
            setHashtags([...hashtags, newTag]);
            setNewTag("");
          }
        }
      };

      return (
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyPress={handleSubmit}
          placeholder={placeholder}
          className="signUpInputStep2-hashtag-input"
        />
      );
    };

    const HashtagList = (props) => {
      const onRemove = (e) => {
        e.preventDefault();
        setHashtags(
          hashtags.filter((hashtag) => hashtag !== e.currentTarget.value)
        );
      };
      const Hashtag = ({ tag }) => {
        return (
          <button
            className="signUpInputStep2-hashtag"
            onClick={onRemove}
            value={tag}
          >
            {tag}
            <span>X</span>
          </button>
        );
      };
      return (
        <div className="signUpInputStep2-hashtag-list">
          {props.hashtags.map((tag) => (
            <Hashtag key={tag} tag={tag} />
          ))}
        </div>
      );
    };
    return (
      <div className="signUpInputStep2">
        <div className="signUpInputStep2-title">상세정보 입력</div>

        <div className="signUpInputStep2-content">
          <Space size={40} />
          <div className="signUpInputStep2-input">
            닉네임*
            <Space size={16} />
            <Input type="text" placeholder="2~8글자의 한글,영문,숫자 사용" />
          </div>
          <div className="signUpInputStep2-input">
            비밀번호*
            <Space size={16} />
            <Input
              type="password"
              placeholder="8~15자의 영문, 숫자,특수문자 사용"
            />
          </div>
          <div className="signUpInputStep2-input">
            생년월일*
            <Space size={16} />
            <Input type="number" placeholder="8자리 입력 (ex:20001220)" />
          </div>
          <div className="signUpInputStep2-input">
            관심사 태그 (3개 이상)*
            <Space size={16} />
            <HashtagInput
              hashtags={hashtags}
              setHashtags={setHashtags}
              placeholder={"관심사 태그를 입력해주세요. (ex:스포츠)"}
            />
            {hashtags.length !== 0 && (
              <div>
                <HashtagList hashtags={hashtags} setHashtags={setHashtags} />
              </div>
            )}
          </div>

          <div className="signUpInputStep2-btn-container">
            <button className="signUpInputStep2-prevbtn" onClick={prevButton}>
              이전
            </button>
            <button className="signUpInputStep2-nextbtn">가입하기</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="signUpInput">
      <div className="signUpInput-container">
        <div
          className="signUpInput-list"
          style={{ transform: `translate(${-step * 480}px)` }}
        >
          <SignUpInputStep1 />
          <SignUpInputStep2 />
        </div>
      </div>
    </div>
  );
};

export default SignUpInput;
