import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";

function Message({ timestamp, user, message, image }) {
  return (
    <div className="message">
      <Avatar className="message_avatar" src={user.photo} />
      <div className="message_info">
        <h4>
          {user.displayName}
          <span className="message_timestamp">
            {new Date(timestamp?.toDate()).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>

        <div className="post_image">
          <img src={image} width="500px" alt="" />
        </div>
      </div>
    </div>
  );
}

export default Message;
