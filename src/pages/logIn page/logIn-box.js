import "./logIn-box.css";
import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuthentication } from "../../contexts/Authentication-Context";
import getUserdata from "../../common-function/getUserdata";
import { useLikeVideo } from "../../contexts/likevideo-context";
import { useWatchLater } from "../../contexts/watchLater-videosContext";
import { useHistory } from "../../contexts/watch-history-context";
import InvalidEntries from "./invalid-entries-warning";
import ServerErrorWarning from "./server-error-warning";
import Loader from "../../common-components/loader";
function LogInBox() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [screen, setScreen] = useState("login");
  const { dispatch: likedVideoDispatch } = useLikeVideo();

  const { dispatch: watchLaterDispatch } = useWatchLater();
  const { dispatch: historyDispatch } = useHistory();
  const { logInUser, loader,setLoader } = useAuthentication();
  function getUserName(e) {
    setUsername(e.target.value);
  }
  function getUserPassword(e) {
    setPassword(e.target.value);
  }
  async function loggingIn() {
    const response = await logInUser(username, password);

    if (response.flag) {
      const { likedObject, watchLaterObject, historyObject } =
        await getUserdata();
      console.log({ likedObject, watchLaterObject, historyObject });
      if (likedObject) {
        likedVideoDispatch({
          type: "ADD-DATA-FROM_SERVER",
          payload: likedObject,
        });
      }
      if (watchLaterObject) {
        watchLaterDispatch({
          type: "ADD-DATA-FROM_SERVER",
          payload: watchLaterObject,
        });
      }
      if (historyObject) {
        historyDispatch({
          type: "ADD-DATA-FROM_SERVER",
          payload: historyObject,
        });
      }
      let route = state?.from ? state.from : "/";
      navigate(route);
    } else {
      if (response.error.response.status === 401) {
        setScreen("invalid-entries");
      } else {
        setScreen("server-error");
      }
    }
    setLoader(false)
  }
  console.log({ screen });
  return loader ? (
    <Loader />
  ) : screen === "login" ? (
    <div className="Authentication">
      <div>Sign In</div>
      <label for="Email">User name</label>
      <input name="Email" onChange={(e) => getUserName(e)} />
      <label for="Password">Password</label>
      <input name="Password" onChange={(e) => getUserPassword(e)} />
      <button className="signin" onClick={() => loggingIn()}>
        Sign In
      </button>
      <div class="other-options">
        <div>Other Options</div>
        <div className="email-verification">
          <img src="google.signup.png" class="login" />
          <img src="facebook.signup.webp" class="login" />
        </div>
        <NavLink to="/sign-up" state={{ from: state.from }} className="signup">
          Sign Up
        </NavLink>
      </div>
    </div>
  ) : screen === "invalid-entries" ? (
    <InvalidEntries />
  ) : (
    <ServerErrorWarning />
  );
}
export default LogInBox;
