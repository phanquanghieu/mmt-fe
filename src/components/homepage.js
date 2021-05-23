import React, { useState, useContext } from "react";
import { AuthModal } from "../components/layout/header";
import authCtx from "../contexts/auth";

const HomePage = () => {
  const { authUser } = useContext(authCtx);
  const [show, setShow] = useState(false);
  const onClick = () => {
    authUser ? (document.location.pathname = "/dashboard") : setShow(!show);
  };
  return (
    <>
      <AuthModal show={show} onHide={() => setShow(false)} />
      <div id="introduce-body">
        <div className="left-body">
          <div className="title">
            <h2> SmartCard</h2>
          </div>
          <div>Learn new words with your friends</div>
          <div>
            <button className="code" onClick={onClick}>
              Start Now
            </button>
          </div>
        </div>
        <div className="right-body">
          <img src="/homepage.jpg" alt="img" width="100%" height="100%"/>
        </div>
      </div>
    </>
  );
};

export default HomePage;
