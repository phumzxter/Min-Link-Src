import React from "react";
import { IoIosCopy } from "react-icons/io";
import { BASE_URL } from "../utils";

function LinkItem({ short }) {
  return (
    <div className="link-field">
      <label className="sr-only">URL</label>
      <input type="url" value={short ? `${BASE_URL}/${short}` : ""} readOnly />
      <button
        type="submit"
        onClick={() => {
          navigator.clipboard.writeText(short ? `${BASE_URL}/${short}` : "");
          alert("Copied");
        }}
      >
        <span className="sr-only">minimise</span>
        <IoIosCopy />
      </button>
    </div>
  );
}

export default LinkItem;
