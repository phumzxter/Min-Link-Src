import axios from "axios";
import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import LinkItem from "../components/LinkItem";
import PostLink from "../components/PostLink";
import AppContext from "../Context";
import { BASE_URL } from "../utils";

function User() {
  // const [shorts, setShorts] = useState([]);
  const { state, dispatch } = useContext(AppContext);
  const { user, userLinks } = state;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/shorts?email=${user.email}`)
      .then((data) =>
        dispatch({ type: "SET_USER_LINKS", payload: data.data.reverse() })
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="container">
      <div>
        <div>
          <Greeting>Welcome {user.name}</Greeting>
        </div>
        <PostLink />
        <div className="list">
          {userLinks.length > 0 ? (
            userLinks.map((item, index) => <LinkItem key={index} {...item} />)
          ) : (
            <p className="note">No links added here...</p>
          )}
        </div>
      </div>
    </section>
  );
}
const Greeting = styled.h2`
  font-weight: bold;
  text-transform: capitalize;
  font-size: 2rem;
`;
export default User;
