import Axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

//Context
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";

//Components
import Page from "./Page";

function CreatePost() {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const navigate = useNavigate();
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        token: appState.user.token,
      });
      //Redirect to new post url
      appDispatch({
        type: "flashMessage",
        value: "Congrats, you successfully created a post.",
      });
      navigate("/post/" + response.data);
      console.log("New post was created");
    } catch (error) {
      console.log(error + "There was an error!");
    }
  }

  return (
    <Page title="Create New Post">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input
            autoFocus
            name="title"
            id="post-title"
            className="form-control form-control-lg form-control-title"
            type="text"
            placeholder=""
            autoComplete="off"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea
            className="body-content tall-textarea form-control"
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </Page>
  );
}

export default CreatePost;
