import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import getUserdata from "../common-function/getUserdata";
import { useHistory } from "./watch-history-context";
import { useLikeVideo } from "./likevideo-context";
import { useWatchLater } from "./watchLater-videosContext";
let AuthenticationContext = createContext();

export function AuthenticationProvider({ children }) {
  const { dispatch: likedVideoDispatch } = useLikeVideo();

  const { dispatch: watchLaterDispatch } = useWatchLater();
  const { dispatch: historyDispatch } = useHistory();
  const { token } = JSON.parse(localStorage?.getItem("token")) || {
    token: null,
  };
  let flag;
  token !== null ? (flag = true) : (flag = false);

  const [isUserLoggin, setIsUserLoggin] = useState(flag);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
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
    })();
  }, []);
  setupAuthHeaderForServiceCalls(token);

  async function logInUser(username, password) {
    console.log("this is payload", { username, password });
    try {
      setLoader(true);
      const response = await axios.post(
        "https://video-library-server.jaysinghdhakad.repl.co/logIn",
        { username: username, password: password }
      );
      console.log({ response });
      setupAuthHeaderForServiceCalls(response.data.token);
      localStorage?.setItem(
        "token",
        JSON.stringify({ token: response.data.token })
      );
      setIsUserLoggin(true);

      return { flag: true };
    } catch (error) {
      console.log(error.response.data);

      console.log("this is authentication error", error.message);
      return { flag: false, error: error };
    }
  }
  async function signUpUser(username, password, emailId) {
    try {
      setLoader(true);
      const response = await axios.post(
        "https://video-library-server.jaysinghdhakad.repl.co/signUp",
        { name: username, password: password, emailId: emailId }
      );
      console.log("this is response", response);
      setupAuthHeaderForServiceCalls(response.data.token);
      localStorage?.setItem(
        "token",
        JSON.stringify({ token: response.data.token })
      );
      setIsUserLoggin(true);

      return { flag: true };
    } catch (error) {
      console.log("this is signUp error", error.message);
      return { flag: false, error: error };
    }
  }

  function setupAuthHeaderForServiceCalls(token) {
   
    if (token) {
      return (axios.defaults.headers.common["authorization"] = token);
    }
    delete axios.defaults.headers.common["authorization"];
  }
  function logOut() {
    setIsUserLoggin(false);
    localStorage?.removeItem("token");
    setupAuthHeaderForServiceCalls(null);
  }

  return (
    <AuthenticationContext.Provider
      value={{ isUserLoggin, logInUser, signUpUser, logOut, loader, setLoader }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export function useAuthentication() {
  return useContext(AuthenticationContext);
}
