import React, { useContext, useEffect, useState } from "react";
import "./Header.scss";

import { useMediaQuery } from "react-responsive";

import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileCard from "components/ProfileCard/ProfileCard";
import axios from "axios";
import { BASE_URL } from "config";

const Header = (props) => {
  const { landing, page, onTop } = props;

  const isMobile = useMediaQuery({
    query: "(min-width:960px)",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { pathname } = location;

  const [headerCss, setHeaderCss] = useState(true);
  const [modal, setModal] = useState(false);
  const [profileImg, setProfileImg] = useState();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (page === 0 || page === 2) setHeaderCss(true);
    else setHeaderCss(false);
  }, [page]);

  const onTopBtn = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleModal = () => {
    setModal(!modal);
  };

  const Image = async () => {
    await axios({
      method: "POST",
      url: `${BASE_URL}/util/${localStorage.getItem("id")}/profile`,
      responseType: "blob",
    }).then((res) => {
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: res.headers["content-type"] })
      );
      setProfileImg(url);
    });
  };

  useEffect(() => {
    setModal(false);
    setTimeout(() => {
      setMount(true);
    }, 500);
  }, []);

  useEffect(() => {
    Image();
  }, [mount]);

  useEffect(() => {
    setModal(false);
  }, [location.pathname]);

  return (
    <header
      className="Header"
      style={{
        position: landing ? "fixed" : "relative",
        backgroundColor: headerCss && "transparent",
        transition: "all 0.5s",
        borderBottom: "0.1px solid #EEF1F4",
        display: pathname === "/WriteArticle" ? "none" : landing ? "" : "flex",
      }}
      onClick={onTopBtn}
    >
      {isMobile ? (
        <>
          <div
            className="title"
            onClick={() => navigate("/")}
            style={{ cursor: "pointer", color: headerCss && "#ffffff" }}
          >
            <img src={require("../../assets/imgs/default.png")} />
            ALL TALK
          </div>
          <div className="header-content">
            {pathname !== "/WriteArticle" && (
              <nav>
                <ul>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <li
                      style={
                        pathname === "/"
                          ? { color: "#00cb8e" }
                          : { color: headerCss && "#ffffff" }
                      }
                    >
                      ?????????
                    </li>
                  </Link>
                  <Link to="/story" style={{ textDecoration: "none" }}>
                    <li
                      style={
                        pathname === "/story"
                          ? { color: "#00cb8e" }
                          : { color: headerCss && "#ffffff" }
                      }
                    >
                      ?????????
                    </li>
                  </Link>
                  {pathname === "/Introduction" ? (
                    <li
                      onClick={onTop}
                      style={
                        pathname === "/Introduction"
                          ? { color: "#00cb8e" }
                          : { color: headerCss && "#ffffff" }
                      }
                    >
                      ????????????
                    </li>
                  ) : (
                    <Link to="/Introduction" style={{ textDecoration: "none" }}>
                      <li
                        style={
                          pathname === "/Introduction"
                            ? { color: "#00cb8e" }
                            : { color: headerCss && "#ffffff" }
                        }
                      >
                        ????????????
                      </li>
                    </Link>
                  )}
                </ul>
              </nav>
            )}
            <span className="login-container">
              {pathname === "/WriteArticle" ? (
                <>
                  <button className="loadBtn">????????????</button>
                  <button
                    className="loginBtn"
                    style={{
                      backgroundColor: headerCss && "transparent",
                      color: headerCss ? "#ffffff" : "#616269",
                    }}
                    onClick={() => navigate("/SignIn")}
                  >
                    ????????????
                  </button>
                  <button
                    className="signUpBtn"
                    style={{
                      backgroundColor: headerCss && "transparent",
                    }}
                    onClick={() => navigate("/SignUp")}
                  >
                    ?????????
                  </button>
                </>
              ) : (
                <>
                  {localStorage.getItem("login") ? (
                    <>
                      <button
                        className="loginBtn"
                        style={{
                          backgroundColor: headerCss && "transparent",
                          color: headerCss ? "#ffffff" : "#616269",
                        }}
                        onClick={() => navigate("/WriteArticle")}
                      >
                        ??? ????????? ??????
                      </button>
                      <button
                        className="profileBtn"
                        style={{
                          backgroundColor: headerCss && "transparent",
                        }}
                        onClick={() => handleModal()}
                      >
                        {profileImg ? (
                          <>
                            <img src={profileImg} alt="userProfile" />
                            {/* {localStorage.getItem("userProfile")} */}
                          </>
                        ) : (
                          <>
                            <img
                              src={require("../../assets/imgs/default.png")}
                            />
                          </>
                        )}
                      </button>
                      {modal && <ProfileCard onHandleModal={handleModal} />}
                    </>
                  ) : (
                    <>
                      <button
                        className="loginBtn"
                        style={{
                          backgroundColor: headerCss && "transparent",
                          color: headerCss ? "#ffffff" : "#616269",
                        }}
                        onClick={() => navigate("/SignIn")}
                      >
                        ?????????
                      </button>
                      <button
                        className="signUpBtn"
                        style={{
                          backgroundColor: headerCss && "transparent",
                        }}
                        onClick={() => navigate("/SignUp")}
                      >
                        ????????????
                      </button>
                    </>
                  )}
                </>
              )}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="header-mobile-top">
            <div
              className="title"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer", color: headerCss && "#ffffff" }}
            >
              <img src={require("../../assets/imgs/defaultNoword.jpeg")} />
              ALL TALK
            </div>
            <div className="header-content">
              <span className="login-container">
                {pathname === "/WriteArticle" ? (
                  <>
                    <button className="loadBtn">?????????</button>
                    <button
                      className="loginBtn"
                      style={{
                        backgroundColor: headerCss && "transparent",
                        color: headerCss ? "#ffffff" : "#616269",
                      }}
                      onClick={() => navigate("/SignIn")}
                    >
                      ????????????
                    </button>
                    <button
                      className="signUpBtn"
                      style={{
                        backgroundColor: headerCss && "transparent",
                      }}
                      onClick={() => navigate("/SignUp")}
                    >
                      ?????????
                    </button>
                  </>
                ) : (
                  <>
                    {localStorage.getItem("login") ? (
                      <>
                        <button
                          className="loginBtn"
                          style={{
                            backgroundColor: headerCss && "transparent",
                            color: headerCss ? "#ffffff" : "#616269",
                          }}
                          onClick={() => navigate("/WriteArticle")}
                        >
                          ??? ????????? ??????
                        </button>
                        <button
                          className="profileBtn"
                          style={{
                            backgroundColor: headerCss && "transparent",
                          }}
                          onClick={() => handleModal()}
                        >
                          {profileImg ? (
                            <img src={profileImg} alt="userProfile" />
                          ) : (
                            <img
                              src={require("../../assets/imgs/default.png")}
                              alt="noProfileImg"
                            />
                          )}
                        </button>
                        {modal && <ProfileCard onHandleModal={handleModal} />}
                      </>
                    ) : (
                      <>
                        <button
                          className="loginBtn"
                          style={{
                            backgroundColor: headerCss && "transparent",
                            color: headerCss ? "#ffffff" : "#616269",
                          }}
                          onClick={() => navigate("/SignIn")}
                        >
                          ?????????
                        </button>
                        <button
                          className="signUpBtn"
                          style={{
                            backgroundColor: headerCss && "transparent",
                          }}
                          onClick={() => navigate("/SignUp")}
                        >
                          ????????????
                        </button>
                      </>
                    )}
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="header-mobile-bottom">
            {pathname !== "/WriteArticle" && (
              <nav>
                <ul>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    <li
                      style={
                        pathname === "/"
                          ? { color: "#00cb8e" }
                          : { color: headerCss && "#ffffff" }
                      }
                    >
                      ?????????
                    </li>
                  </Link>
                  <Link to="/story" style={{ textDecoration: "none" }}>
                    <li
                      style={
                        pathname === "/story"
                          ? { color: "#00cb8e" }
                          : { color: headerCss && "#ffffff" }
                      }
                    >
                      ?????????
                    </li>
                  </Link>
                  {pathname === "/Introduction" ? (
                    <li
                      onClick={onTop}
                      style={
                        pathname === "/Introduction"
                          ? { color: "#00cb8e" }
                          : { color: headerCss && "#ffffff" }
                      }
                    >
                      ????????????
                    </li>
                  ) : (
                    <Link to="/Introduction" style={{ textDecoration: "none" }}>
                      <li
                        style={
                          pathname === "/Introduction"
                            ? { color: "#00cb8e" }
                            : { color: headerCss && "#ffffff" }
                        }
                      >
                        ????????????
                      </li>
                    </Link>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
