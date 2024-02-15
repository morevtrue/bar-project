import React, { useState } from "react";
import { RWebShare } from "react-web-share";

const ShareButton = () => {
  return (
    <div>
      <RWebShare
        data={{
          text: "",
          url: "http://localhost:3001",
          title: "Share",
        }}
        disableNative={false}
        onClick={() => console.log("shared successfully!")}
      >
        <button>Share 🔗</button>
      </RWebShare>
    </div >
  );
};

export default ShareButton;