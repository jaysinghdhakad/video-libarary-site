import { useWatchLater } from "../../contexts/watchLater-videosContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./watch-later-videoDisplay.css";
import { useEffect,useState } from "react";
import {
  fetchWatchLater,
  deleteVideoFromWatchLater,
} from "../../common-function/watch-later-server-function";
import Loader from "../../common-components/loader";
function WatchLaterVideos() {
  const { state, dispatch } = useWatchLater();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await fetchWatchLater();
      console.log({watchLater: response})
     if( response) { dispatch({ type: "ADD-DATA-FROM_SERVER", payload: response });
      }
      setLoader(false);
    })();
  },[]);
  return loader ? (
    <Loader />
  ) : (
    <div className="watch-later-videos">
      {state?.watchLaterVideos?.map((video) => {
        return (
          <div className="song">
            <img className="song-thumbnail" src={video?.image} />
            <div className="song-name">{video?.name}</div>
            <FontAwesomeIcon
              className="song-delete"
              onClick={async () => {
                dispatch({
                  type: "DELETE-WATCHLATER-VIDEO",
                  payload: { video: video },
                });
                await deleteVideoFromWatchLater(video._id, state._id);
              }}
              icon={faTrashAlt}
            />
          </div>
        );
      })}
    </div>
  );
}
export default WatchLaterVideos;
