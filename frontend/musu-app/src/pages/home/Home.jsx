import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./home.css";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import SignIn from "../signIn/SignIn";
import Message from "../../components/messages/Message";
import Drawspace from "../drawspace/Drawspace";
import Profile from "../../components/profile/Profile";

const Home = () => {
  const location = useLocation();
  const comp = location.state.comp;
  console.log(comp)
  if (Cookies.get("userId") === "null") {
    return <SignIn />;
  }

  const MiddleComp = () => {
    if (comp === "feed") {
      return <Feed />;
    } else if (comp === "message") {
      let user = {id: location.state.userId, name: location.state.username}
      return <Message user={user}/>;
    } else if (comp === "profile"){
      let user = {id: location.state.userId, name: location.state.username}
      return <Profile user={user}/>;
    }
  };

  if (comp === "drawspace") {
    return (
      <>
        <Topbar comp={comp} />
        <div className="homeContainer">
          <Drawspace />
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar comp={comp} />
      <div className="homeContainer">
        <Sidebar state={location.state}/>
        <MiddleComp />
      </div>
    </>
  );
};

export default Home;
