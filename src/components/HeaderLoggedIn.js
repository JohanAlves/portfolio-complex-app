import { useContext } from "react";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import DispatchContext from "../context/DispatchContext";
import StateContext from "../context/StateContext";

function HeaderLoggedIn() {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogout() {
    appDispatch({ type: "logout" });
    appDispatch({
      type: "flashMessage",
      value: "You have successfully logged out.",
    });
  }

  function handleSearchIcon(e) {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  }

  return (
    <div className="flex-row my-3 my-md-0">
      <Link
        onClick={handleSearchIcon}
        to="#"
        className="text-white mr-2 header-search-icon"
        data-tooltip-content="Search"
        data-tooltip-id="search"
      >
        <i className="fas fa-search"></i>
      </Link>
      <ReactTooltip place="bottom" id="search" />{" "}
      <span
        onClick={() => appDispatch({ type: "toggleChat" })}
        data-tooltip-content="Chat"
        data-tooltip-id="chat"
        className={
          "mr-2 header-chat-icon " +
          (appState.unreadChatCount ? "text-danger" : "text-white")
        }
      >
        <i className="fas fa-comment"></i>
        {appState.unreadChatCount ? (
          <span className="chat-count-badge text-white">
            {appState.unreadChatCount < 10 ? appState.unreadChatCount : "9+"}
          </span>
        ) : (
          ""
        )}
      </span>
      <ReactTooltip place="bottom" id="chat" />{" "}
      <Link
        data-tooltip-content="My Profile"
        data-tooltip-id="profile"
        to={"/profile/" + appState.user.username}
        className="mr-2"
      >
        <img className="small-header-avatar" src={appState.user.avatar} />
      </Link>
      <ReactTooltip place="bottom" id="profile" />{" "}
      <Link to="/create-post" className="btn btn-sm btn-success mr-2">
        Create Post
      </Link>{" "}
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
