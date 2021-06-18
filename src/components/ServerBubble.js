import React from "react";
import { Avatar } from "@material-ui/core";
import "./ServerBubble.css";
import { useDispatch } from "react-redux";
import { setServerInfo } from "../features/appSlice";

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
      </div>
    </div>
  );
}

export default ServerBubble;
