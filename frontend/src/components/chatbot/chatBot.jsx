import React, { useState, useRef } from "react";
import AIChat from "./AIChat";
import "./chatBot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: window.innerWidth - 380, y: window.innerHeight - 450 });
  const dragRef = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    offset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      {/* Chatbot Button */}
      <button className="chatbot" onClick={toggleChat}>
        💬
      </button>

      {/* Draggable Chat Popup */}
      {isOpen && (
        <div
          className="chat-popup"
          ref={dragRef}
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          <div className="chat-header" onMouseDown={handleMouseDown}>
            <span>Capy the Capybara 🦦</span>
            <button onClick={toggleChat} className="close-button">
              ✖
            </button>
          </div>
          <div className="chat-body">
            <AIChat />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot; 
