import React, { useEffect, useState } from "react";
import "./Server.css";
import ServerBubble from "./ServerBubble";
import AddIcon from "@material-ui/icons/Add";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Icon, InlineIcon } from "@iconify/react";
import discordIcon from "@iconify-icons/simple-icons/discord";
import RemoveIcon from "@material-ui/icons/Remove";

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
      <div className="discordBubble">
        <Icon className="discordIcon" icon={discordIcon} />
      </div>
      <div className="divider">
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAA1BMVEU2OT8/fgR/AAAAR0lEQVR4nO3BAQEAAACCIP+vbkhAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO8GxYgAAb0jQ/cAAAAASUVORK5CYII="
          alt=""
        />
      </div>
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
