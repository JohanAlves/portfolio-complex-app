import Axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StateContext from "../context/StateContext";
import Loading from "./Loading";

function ProfileFollow(props) {
  const [isLoading, setIsLoading] = useState(true);
  const appState = useContext(StateContext);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await Axios.get(
          `/profile/${username}/${props.action}`,
          {
            CancelToken: ourRequest.token,
          }
        );
        setPosts(response.data);
        setIsLoading(false);
      } catch (e) {
        console.log("There was a problem");
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, [username, props.action]);

  if (isLoading) return <Loading />;

  //Messages to show if there's no following/followers
  if (!Boolean(posts.length) && !isLoading) {
    //Only if it's user's profile
    if (username === appState.user.username) {
      if (props.action === "followers")
        return <div>You don't have any followers yet.</div>;

      if (props.action === "following")
        return <div>You are't following anyone yet.</div>;
    }
    //Profile to others
    else {
      if (props.action === "followers")
        return <div>{username} doesn't have followers yet</div>;

      if (props.action === "following")
        return <div>{username} isn't following anyone yet</div>;
    }
  }

  return (
    <div className="list-group">
      {posts.map((follow, index) => {
        return (
          <Link
            key={index}
            to={"/profile/" + follow.username}
            className="list-group-item list-group-item-action"
          >
            <img className="avatar-tiny" src={follow.avatar} />{" "}
            {follow.username}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollow;
