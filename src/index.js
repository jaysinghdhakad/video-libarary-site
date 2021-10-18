import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { LikeProvider } from "./contexts/likevideo-context";
import { PlayerProvider } from "./contexts/videoplayer-context";
import { PlaylistProvider } from "./contexts/playlist-context";
import { BrowserRouter as Router } from "react-router-dom";
import { WatchLaterProvider } from "./contexts/watchLater-videosContext";
import {HistoryProvider} from "./contexts/watch-history-context"
import {AuthenticationProvider} from "./contexts/Authentication-Context"
ReactDOM.render(
  <React.StrictMode>
    <Router>
      
      <HistoryProvider>
      <WatchLaterProvider>
        <LikeProvider>
          <PlaylistProvider>
            <PlayerProvider>
            <AuthenticationProvider>
              <App />
              </AuthenticationProvider>
            </PlayerProvider>
          </PlaylistProvider>
        </LikeProvider>
      </WatchLaterProvider>
      </HistoryProvider>
     
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
