import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import Message from "./Message";
import { useSelector } from "react-redux";
import {
  selectChannelId,
  selectChannelName,
  selectServerId,
  selectServerName,
} from "../features/appSlice";
import { selectUser } from "../features/userSlice";
import db from "../firebase";
import firebase from "firebase";
import ReactScrollableFeed from "react-scrollable-feed";

function Chat() {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const serverName = useSelector(selectServerName);
  const serverId = useSelector(selectServerId);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (channelId) {
      db.collection("server")
        .doc(serverId)
        .collection("channel")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("server")
      .doc(serverId)
      .collection("channel")
      .doc(channelId)
      .collection("messages")
      .add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        message: input,
        user: user,
        image: imageUrl,
      });

    setInput("");
  };

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat_messages">
        <ReactScrollableFeed>
          {messages.map((message) => (
            <Message
              timestamp={message.timestamp}
              message={message.message}
              user={message.user}
              image={message.image}
            />
          ))}
        </ReactScrollableFeed>
      </div>

      <div className="chat_input">
        <AddCircleIcon
          onClick={() => setShow(!show)}
          className="chat_circle"
          fontSize="large"
        />
        <form>
          <div className="chat_inputCenter">
            <div className="chat_inputText">
              <input
                value={input}
                disabled={!channelId}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Message #${channelName}`}
              />
            </div>

            {show ? (
              <div className="chat_inputImage">
                <input
                  value={imageUrl}
                  disabled={!channelId}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder={`Image`}
                />
              </div>
            ) : null}

            <button
              disabled={!channelId}
              className="chat_inputButton"
              type="submit"
              onClick={sendMessage}
            >
              Send Message
            </button>
          </div>
        </form>

        <div className="chat_inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
