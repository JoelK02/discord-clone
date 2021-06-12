import React from "react";
import "./ChatHeader.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";

function ChatHeader({ channelName }) {
  return (
    <div className="chatHeader">
      <div className="chatHeader_left">
        <h3>
          <span className="chatHeader_hash">#</span>
          {channelName}
        </h3>
      </div>
      <div className="chatHeader_right">
        <NotificationsIcon />
        <EditLocationRoundedIcon />
        <PeopleAltIcon />

        <div className="chatHeader_search">
          <input placeholder="search" />
          <SearchIcon />
        </div>

        <SendIcon />
        <HelpRoundedIcon />
      </div>
    </div>
  );
}

export default ChatHeader;
