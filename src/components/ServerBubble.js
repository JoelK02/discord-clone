import React from "react";
import { Avatar } from "@material-ui/core";
import "./ServerBubble.css";
import { useDispatch, useSelector } from "react-redux";
import { selectServerId, setServerInfo } from "../features/appSlice";
import GroupIcon from "@material-ui/icons/Group";
import { useState } from "react";
import { useEffect } from "react";

function ServerBubble({ id, serverName, serverImage }) {
  const serverId = useSelector(selectServerId);
  const dispatch = useDispatch();

  useEffect(() => {}, [serverId]);

  return (
    <div
      className="serverBubble"
      onClick={() =>
        dispatch(
          setServerInfo({
            serverId: id,
            serverName: serverName,
            serverImage: serverImage,
          })
        )
      }
    >
      <div className="bubble" tabIndex="1">
        <img tabIndex="1" src={serverImage} alt="" />
        <div className="letter">
          <GroupIcon />
        </div>
      </div>
    </div>
  );
}

export default ServerBubble;
