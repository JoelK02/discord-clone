import React, { useState } from "react";
import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SidebarChannel from "./SidebarChannel";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import db, { auth } from "../firebase";
import { useEffect } from "react";
import { selectServerId, selectServerName } from "../features/appSlice";

function Sidebar() {
  const user = useSelector(selectUser);
  const serverName = useSelector(selectServerName);
  const serverId = useSelector(selectServerId);
  const [channels, setChannels] = useState([]);
  const [servers, setServers] = useState([]);

  useEffect(() => {
    db.collection("channels").onSnapshot((snapshot) =>
      setChannels(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          channel: doc.data(),
        }))
      )
    );
    db.collection("servers").onSnapshot((snapshot) =>
      setServers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          server: doc.data(),
        }))
      )
    );
  }, []);

  useEffect(() => {
    if (serverId) {
      db.collection("server")
        .doc(serverId)
        .collection("channel")
        .onSnapshot((snapshot) =>
          setServers(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [serverId]);

  const handleAddChannel = () => {
    const channelName = prompt("Enter a new channel name");
    if (channelName) {
      db.collection("server").doc(serverId).collection("channel").add({
        channelName: channelName,
      });
    }
  };

  return (
    <div>
      <div className="sidebar">
        <div className="sidebar_top">
          <h3>{serverName}</h3>
          <ExpandMoreIcon />
        </div>

        <div className="sidebar_channels">
          <div className="sidebar_channelsHeader">
            <div className="sidebar_header">
              <ExpandMoreIcon />
              <h4>Text Channels</h4>
            </div>
            <AddIcon
              onClick={handleAddChannel}
              className="sidebar_addChannel"
            />
          </div>

          <div className="sidebar_channelsList">
            {servers.map(({ id, channel }) => (
              <SidebarChannel
                key={id}
                id={id}
                channelName={channel.channelName}
              />
            ))}
          </div>
        </div>

        <div className="sidebar_profile">
          <Avatar onClick={() => auth.signOut()} src={user.photo} />
          <div className="sidebar_profileInfo">
            <h4>{user.displayName}</h4>
            <p>#{user.uid.substring(0, 5)}</p>
          </div>

          <div className="sidebar_profileIcons">
            <MicIcon />
            <HeadsetIcon />
            <SettingsIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
