import "./signUp-box.css";
import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useAuthentication } from "../../contexts/Authentication-Context";
import ServerError from "./server-warning";
import InvalidEntry from "./invalid-entry-warning";
import Loader from "../../common-components/loader";
function SignUpBox() {
  const { state } = useLocation();
  console.log(state);
  const navigate = useNavigate();
  const [screen, setScreen] = useState("signup");
  const [match, setMatch] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [emailId, setEmailId] = useState();
  const { signUpUser, loader,setLoader } = useAuthentication();
  function getUserName(e) {
    setUsername(e.target.value);
  }
  function getUserEmail(e) {
    setEmailId(e.target.value);
  }
  function getUserPassword(e) {
    setPassword(e.target.value);
  }
  function checkUserPassword(e) {
    setMatch(password === e.target.value);
    console.log("this is flag", password === e.target.value);
  }
  async function userSignup() {
    let response;
    if (match) {
      response = await signUpUser(username, password, emailId);
    }
    if (!response.flag) {
      if (response.error.response.status === 401) {
        setScreen("invalid-entries");
      } else {
        setScreen("server-error");
      }
    } else {
      let route = state?.from ? state.from : "/";
      navigate(route);
    }
    setLoader(false);
  }
  return loader ? <Loader/> :  screen === "signup" ? (
    <div className="signup-area">
      <label>Name</label>
      <input name="name" onChange={(e) => getUserName(e)} />
      <label>E-mail</label>
      <input name="email" onChange={(e) => getUserEmail(e)} />
      <label>Password</label>
      <input
        name="password"
        type="password"
        onChange={(e) => getUserPassword(e)}
      />
      <label>Retype-pasword</label>
      <input
        class="check"
        type="password"
        name="checkPassword"
        onChange={(e) => checkUserPassword(e)}
      />
      {match ? <div>Password matches</div> : null}
      <button onClick={() => userSignup()}>sign-up</button>
    </div>
  ) : screen === "invalid-entries" ? (
    <InvalidEntry/>
  ) : (
    <ServerError/>
  );
}

export default SignUpBox;
