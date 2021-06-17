import React from "react";
import "./Server.css";
import ServerBubble from "./ServerBubble";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";

function Server() {
  return (
    <div className="serverBar">
      <div className="serverBubble">
        <ServerBubble />
      </div>

      <div className="addServerButton">
        <AddIcon className="addIcon" fontSize="medium" />
      </div>
    </div>
  );
}

export default Server;
