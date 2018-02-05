import React from "react";
import "../styles/Message.css";

const Message = ({ message }) => {
  if (message) {
    return <div class={message.type}>{message.text}</div>;
  }
  return null
};

export default Message;
