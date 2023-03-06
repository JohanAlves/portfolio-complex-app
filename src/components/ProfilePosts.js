import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";
import Post from "./Post";

function ProfilePosts() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();
    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          CancelToken: ourRequest.token,
        });
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
  }, [username]);

  if (isLoading) return <Loading />;
  return (
    <div className="list-group">
      {posts.map((post) => {
        return <Post noAuthor={true} post={post} key={post._id} />;
      })}
    </div>
  );
}

export default ProfilePosts;
