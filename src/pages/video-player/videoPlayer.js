import React, { useEffect, useState } from "react";

import ReactPlayer from "react-player";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useVideo } from "../../contexts/videoplayer-context";
import { useLikeVideo } from "../../contexts/likevideo-context";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import PlayListMenu from "./playlist-menu";
import { useWatchLater } from "../../contexts/watchLater-videosContext";
import { useHistory } from "../../contexts/watch-history-context";
import "./videoPlayer.css";
import {
  addVideotoLikedVideos,
  fetchLikedVideos,
} from "../../common-function/likedvideo-server-function";
import {
  addVideoToWatchhistory,
  fetchWatchHistory,
} from "../../common-function/watchhistory-server-function";
import {
  addVideoToWatchLater,
  fetchWatchLater,
} from "../../common-function/watch-later-server-function";

function VideoPlayer() {
  const [style, setStyle] = useState(["something"]);
  const { video } = useVideo();
  const { state: likeVideosObject, dispatch: likedVideoDispatch } =
    useLikeVideo();
  console.log("this is the liked object", { likeVideosObject });
  const { state: watchLaterObject, dispatch: watchLaterDispatch } =
    useWatchLater();
  const { state: historyObject, dispatch: historyDispatch } = useHistory();
  console.log("this is the imp watchLaterObject", watchLaterObject);
  return (
    <>
      <div class="player">
        <div className="video-playing-window">
          <ReactPlayer
            className="reactPlayer"
            width="100%"
            height="100%"
            url={video?.url}
            onStart={async () => {
              historyDispatch({
                type: "ADD-VIDEO-TO-WATCH-HISTORY",
                payload: { video: video },
              });
              await addVideoToWatchhistory(video._id, historyObject._id);
            }}
          />
        </div>
        <div className="title">{video?.name}</div>
        <div className="information-and-options">
          <div className="views">
            {video?.views} <FontAwesomeIcon icon={faEye} />
          </div>
          <div className="buttons">
            <div
              className="button"
              onClick={async () => {
                likedVideoDispatch({
                  type: "ADD-LIKED-VIDEO",
                  payload: { video: video },
                });
                await addVideotoLikedVideos(video._id, likeVideosObject._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <path d="M2 42h8V18H2v24zm44-22c0-2.21-1.79-4-4-4H29.37l1.91-9.14c.04-.2.07-.41.07-.63 0-.83-.34-1.58-.88-2.12L28.34 2 15.17 15.17C14.45 15.9 14 16.9 14 18v20c0 2.21 1.79 4 4 4h18c1.66 0 3.08-1.01 3.68-2.44l6.03-14.1c.18-.46.29-.95.29-1.46v-3.83l-.02-.02L46 20z" />
              </svg>
              {video.likes}
            </div>
            <div className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <path d="M30 6H12c-1.66 0-3.08 1.01-3.68 2.44l-6.03 14.1C2.11 23 2 23.49 2 24v3.83l.02.02L2 28c0 2.21 1.79 4 4 4h12.63l-1.91 9.14c-.04.2-.07.41-.07.63 0 .83.34 1.58.88 2.12L19.66 46l13.17-13.17C33.55 32.1 34 31.1 34 30V10c0-2.21-1.79-4-4-4zm8 0v24h8V6h-8z" />
              </svg>
              {video.dislike}
            </div>
            <div
              className="button"
              onClick={async () => {
                watchLaterDispatch({
                  type: "ADD-WATCHLATER-VIDEO",
                  payload: { video: video },
                });
                await addVideoToWatchLater(video._id, watchLaterObject._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
              >
                <path d="M23.99 4C12.94 4 4 12.95 4 24s8.94 20 19.99 20C35.04 44 44 35.05 44 24S35.04 4 23.99 4zM24 40c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16zm1-26h-3v12l10.49 6.3L34 29.84l-9-5.34z" />
              </svg>
              Later
            </div>
            <div className="button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                onClick={() => {
                  if (style[1] === "animate") {
                    console.log(style);
                    setStyle(["something"]);
                  } else {
                    console.log(style);

                    setStyle([...style, "animate"]);
                  }
                }}
              >
                <path d="M28 20H4v4h24v-4zm0-8H4v4h24v-4zm8 16v-8h-4v8h-8v4h8v8h4v-8h8v-4h-8zM4 32h16v-4H4v4z" />
              </svg>
              Playlist
              <div className={style.join(" ")}>
                <PlayListMenu />
              </div>
            </div>
          </div>
        </div>
        <div className="line"></div>
      </div>
    </>
  );
}
export default VideoPlayer;
