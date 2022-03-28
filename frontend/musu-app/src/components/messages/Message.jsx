import React, { Component, useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import MessageItem from "./ChatItem";
import "./message.css";
import axios from "axios";
import { useEffect } from "react";
import Cookies from "js-cookie";

const Message = ({ user }) => {
  let loggedInUser = {
    id: Cookies.get("userId"),
    username: Cookies.get("name"),
  };
  let [unread, setUndread] = useState([]);
  let [conversation, setConversation] = useState([]);
  let [selectedUser, setCurrentChat] = useState(user);
  const [pics, setPics] = useState([]);
  let count = 0;

  useEffect(() => {
    axios
      .get("/api/v1/messages/get/unread/" + loggedInUser.id)
      .then((res) => {
        setUndread(res.data);
        let lastId = Cookies.get("lastId");
        res.data.forEach((u) => {
          pics.push("/assets/profile/" + (lastId - u.senderId) + ".jpg");
        });
        setPics(pics);
      })
      .catch((err) => {
        console.log(err);
      });

    if (selectedUser.id !== undefined) {
      axios
        .get(
          "/api/v1/messages/get/sender/" +
            selectedUser.id +
            "/receiver/" +
            loggedInUser.id
        )
        .then((res) => {
          setConversation(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMessage = {
      content: document.getElementById("content").value,
      senderId: loggedInUser.id,
      receiverId: selectedUser.id,
      senderName: loggedInUser.username,
    };
    try {
      await axios.post("/api/v1/messages/create", newMessage);
      window.location.reload(false);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div className="message">
      <div className="messageWrapper">
        {selectedUser.id ? (
          <>
            <div className="messageBoxTop">
              {conversation.map((m) => (
                <div key={m.id}>
                  <MessageItem
                    message={m}
                    own={m.senderId == loggedInUser.id}
                  />
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                id="content"
                label="Write a message"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" color="primary" type="submit">
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </form>
          </>
        ) : (
          <span className="noConversationText">Select user to chat</span>
        )}
      </div>
      <div className="messagerightbar">
        <div className="messagerightbarWrapper">
          <h4>New messages from</h4>
          <hr className="rightbarHr" />
          <ul>
            {unread.map((u) => (
              <div key={u.id}>
                <li
                  key={u.id}
                  className="rightbarUserItem"
                  onClick={() => {
                    console.log("clicked user");
                  }}
                >
                  <img className="rightbarUserImg" src={pics[count++]} />
                  <span className="rightbarUsername">{u.username}</span>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Message;
