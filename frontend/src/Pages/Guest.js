import React, { useContext } from "react";
import LinkItem from "../components/LinkItem";
import PostLink from "../components/PostLink";
import AppContext from "../Context";
import { isObjEmpty } from "../utils";

function Guest() {
  const { state } = useContext(AppContext);
  const { link } = state;

  return (
    <section className="container">
      <div>
        <PostLink />
        {!isObjEmpty(link) && <LinkItem {...link} />}
      </div>
    </section>
  );
}

export default Guest;
