import React from "react";
import { Avatar } from "@material-ui/core";
import "./ServerBubble.css";
import { useDispatch } from "react-redux";
import { setServerInfo } from "../features/appSlice";
import GroupIcon from "@material-ui/icons/Group";

function ServerBubble({ id, serverName, serverImage }) {
  const dispatch = useDispatch();

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
      <div className="bubble">
        <img src={serverImage} alt="" />
        <div className="letter">
          <GroupIcon />
        </div>
      </div>
    </div>
  );
}

export default ServerBubble;
