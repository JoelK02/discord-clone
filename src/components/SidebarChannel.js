import React from "react";
import { useDispatch } from "react-redux";
import { setChannelInfo } from "../features/appSlice";
import "./SidebarChannel.css";
import CloseIcon from "@material-ui/icons/Close";
import db, { auth } from "../firebase";

function SidebarChannel({ id, channelName }) {
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
        <h4 className="channel_text">
          <span className="sidebarChannel_hash">#</span>
          {channelName}
        </h4>
        <h4 className="channel_delete">
          <CloseIcon
            className="channelDelete"
            onClick={() => {
              let confirmDelete = window.confirm(
                "Are you sure you want to delete this channel?"
              );
              if (confirmDelete) {
                db.collection("channels").doc(id).delete();
              } else {
              }
            }}
          />
        </h4>
      </div>
    </div>
  );
}

export default SidebarChannel;
