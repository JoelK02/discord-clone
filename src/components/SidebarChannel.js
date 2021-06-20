import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectServerId, setChannelInfo } from "../features/appSlice";
import "./SidebarChannel.css";
import CloseIcon from "@material-ui/icons/Close";
import db, { auth } from "../firebase";
import { Icon, InlineIcon } from "@iconify/react";
import hash24 from "@iconify-icons/octicon/hash-24";

function SidebarChannel({ id, channelName }) {
  const serverId = useSelector(selectServerId);
  const dispatch = useDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        dispatch(
          setChannelInfo({
            channelId: id,
            channelName: channelName,
          })
        )
      }
    >
      <div className="channelSection">
        <div className="channel_text">
          <span className="sidebarChannel_hash">
            <Icon icon={hash24} />
          </span>
          <div className="channelName">{channelName}</div>

          <div className="channel_delete">
            <CloseIcon
              fontSize="small"
              className="channelDelete"
              onClick={() => {
                let confirmDelete = window.confirm(
                  "Are you sure you want to delete this channel?"
                );
                if (confirmDelete) {
                  db.collection("server")
                    .doc(serverId)
                    .collection("channel")
                    .doc(id)
                    .delete();
                } else {
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarChannel;
