import axios from "axios";
import React, { useContext, useState } from "react";
import { HiLink } from "react-icons/hi";
import AppContext from "../Context";
import { BASE_URL, isObjEmpty } from "../utils";

function PostLink() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const { state, dispatch } = useContext(AppContext);
  const { user } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      const payload = !isObjEmpty(user)
        ? {
            full: url,
            email: user.email,
          }
        : {
            full: url,
          };
      axios
        .post(`${BASE_URL}/short`, payload, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (!isObjEmpty(user)) {
            dispatch({ type: "ADD_USER_LINK", payload: res.data });
          } else {
            dispatch({ type: "SET_LINK", payload: res.data });
          }
        });
    } else {
      setError("Enter a valid url");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="link-field">
        <label className="sr-only">URL</label>
        <input
          type="text"
          name="full"
          value={url}
          placeholder="Enter full url"
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">
          <span className="sr-only">minimise</span>
          <HiLink />
        </button>
      </div>
      {error && !url && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </form>
  );
}

export default PostLink;
