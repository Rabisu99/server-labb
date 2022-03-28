import Cookies from "js-cookie";
import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

const Feed = () => {
  let user = { id: Cookies.get("userId"), name: Cookies.get("name") };
  const [posts, setPosts] = useState([]);
  let count = 0;

  function getRandomInt() {
    if (Math.floor(Math.random() * 2) == 0) {
      return count++;
    }
  }

  useEffect(() => {
    axios
      .get("/api/v1/posts/get/" + user.id)
      .then((res) => {
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="feedparent">
      <div className="feed">
        <div className="feedWrapper">
          <Share />
        </div>
        <ul className="feedList">
          {posts.map((p) => (
            <Post key={p.id} post={p} user={user} />
          ))}
        </ul>
      </div>
      <div className="feedrightbar">
        <div className="rightbarWrapper">
          <div className="statsContainer">VERT.X DATA HERE</div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
