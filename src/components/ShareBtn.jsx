import React from "react"

function ShareBtn({url, title}) {
    const sendTitle = encodeURI(title);
  return (
    <button className="saveBtn">
        <i className="bx bx-send"></i>
    </button>
  );
}

export default ShareBtn;