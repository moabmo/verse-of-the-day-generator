import React, { useState } from "react";
import { toPng } from "html-to-image";
import download from "downloadjs";
import { FaArrowLeft, FaEllipsisH } from "react-icons/fa";
import "./VerseImage.css";
import logo from "../logo.png"; // Replace with your actual logo path

function VerseImage() {
  const [verse, setVerse] = useState("");
  const [reference, setReference] = useState("");
  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const handleDownload = () => {
    const node = document.getElementById("verseImage");
    const scale = 3; // Set scale factor to 2 for doubling the size
  
    toPng(node, {
      width: node.offsetWidth * scale,  // Scale the width
      height: node.offsetHeight * scale, // Scale the height
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${node.offsetWidth}px`,
        height: `${node.offsetHeight}px`,
      },
    })
    .then((dataUrl) => {
      download(dataUrl, "verse-of-the-day.png");
    })
    .catch((err) => {
      console.error("Failed to generate image", err);
    });
  };
    
  

  return (
    <div className="verse-container">
      <div className="input-container">
        <textarea
          placeholder="Enter your verse here..."
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter book, chapter, verse (e.g., John 3:16)"
          value={reference}
          onChange={(e) => setReference(e.target.value)}
        />
        <button onClick={handleDownload}>Generate Image</button>
      </div>
      <div id="verseImage" className="verse-image">
        <div className="header">
          <FaArrowLeft className="icon" />
          <span className="verse-text">Verse of the Day</span>
          <FaEllipsisH className="icon" />
        </div>
        <div className="date">{currentDate}</div>
        <hr className="separator" />
        <div className="content">
          <p>{verse || "But love your enemies, do good to them, and lend to them without expecting to get anything back."}</p>
          <span className="reference">{reference || "Luke 6:35"}</span>
        </div>
        <div className="footer">
          <img src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
}

export default VerseImage;
