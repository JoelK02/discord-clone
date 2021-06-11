import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";

function Message() {
  return (
    <div className="message">
      <Avatar />
      <div className="message_info">
        <h4>
          Joel Kwoh
          <span className="message_timestamp">Timestamp</span>
        </h4>

        <p>message</p>
      </div>
    </div>
  );
}

export default Message;
