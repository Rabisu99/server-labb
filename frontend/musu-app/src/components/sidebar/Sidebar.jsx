import React, { useState, useEffect } from "react";
import "./sidebar.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const Sidebar = ({ state }) => {
  let navigate = useNavigate();
  let userId = Cookies.get("userId");
  let username = Cookies.get("name");
  const [users, setUsers] = useState([]);
  const [pics, setPics] = useState([]);
  let count = 0;

  function handleUserProfile(user) {
    if ((state.comp === "feed" || state.comp === "profile") && user.id != state.userId) {
      navigate("/home", {
        state: { comp: "profile", userId: user.id, username: user.name },
      });
    } else if(state.comp === "message"){
      navigate("/home", {
        state: { comp: "message", userId: user.id, username: user.name },
      });
    }
  }

  useEffect(() => {
    axios
      .get("/api/v1/users/" + userId)
      .then((res) => {
        setUsers(res.data);
        let lastId = res.data.at(-1).id;
        if (lastId < userId) lastId = userId;
        let pics = [];
        pics.push("/assets/profile/" + (lastId - userId) + ".jpg");
        res.data.forEach((u) => {
          pics.push("/assets/profile/" + (lastId - u.id) + ".jpg");
        });
        setPics(pics);
        Cookies.set("lastId", lastId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarCard">
        <img src={pics[0]} className="profileImg" />
        <h1>{username}</h1>
        <h4 className="usersOnline">Users Online</h4>
        <hr className="sidebarHr" />
        <ul className="sidebarUsersList">
          {users.map((u) => (
            <div key={u.id}>
              <li
                key={u.id}
                className="sidebarUserItem"
                onClick={() => {
                  handleUserProfile(u);
                }}
              >
                <img className="sidebarUserImg" src={pics[++count]} />
                <span className="sidebarUsername">{u.name}</span>
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export default Sidebar;
