import React, { useEffect, useState } from "react";
import "./Server.css";
import ServerBubble from "./ServerBubble";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

function Server() {
  const user = useSelector(selectUser);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    db.collection("server").onSnapshot((snapshot) =>
      setServers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          server: doc.data(),
        }))
      )
    );
  }, []);

  const addServer = () => {
    const serverName = prompt("Enter Server Name");
    const serverImage = prompt("Enter Server Image");
    if (serverName) {
      db.collection("server").add({
        serverName: serverName,
        serverImage: serverImage,
      });
    }
  };
  return (
    <div className="serverBar">
      <div className="serverBubble">
        {servers.map(({ id, server }) => (
          <ServerBubble
            key={id}
            id={id}
            serverName={server.serverName}
            serverImage={server.serverImage}
          />
        ))}
      </div>

      <div className="addServerButton">
        <AddIcon onClick={addServer} className="addIcon" fontSize="medium" />
      </div>
    </div>
  );
}

export default Server;
