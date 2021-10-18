import logo from "./logo.svg";
import "./App.css";
import Header from "./common-components/header";
import Menu from "./pages/landing-page/landingPage-videoMenu";
import VideoPlayer from "./pages/video-player/videoPlayer";
import PlaylistViewer from "./pages/playlist-page/playlist-view";
import WatchLaterVideos from "./pages/watch-later-page/watch-later-videoDisplay";
import { Routes, Route } from "react-router-dom";
import LikeVideoDisplay from "./pages/like-video-page/likevideo-display";
import WatchHistory from "./pages/history-page/watchHistory-Display";
import SignUpBox from "./pages/sign-up page/signUp-box";
import LogInBox from "./pages/logIn page/logIn-box.js"
import PrivateRoute from "./common-components/privateRoute"
function App() {
  return (
    <>
      <Header />
   
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/player" element={<VideoPlayer />} />
        <Route path="/log-in" element={<LogInBox/>}/>
        <Route path="/sign-up" element={<SignUpBox/>}/>
        <PrivateRoute path="/play-list" element={<PlaylistViewer />} />
        <PrivateRoute path="/liked-video" element={<LikeVideoDisplay />} />
        <PrivateRoute path="/watch-later" element={<WatchLaterVideos />} />
        <PrivateRoute path="/history"element={<WatchHistory/>}/>
      </Routes>
    </>
  );
}

export default App;
