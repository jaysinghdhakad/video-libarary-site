import { useLikeVideo } from "../../contexts/likevideo-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./likevideo-display.css";
import { useEffect, useState } from "react";
import {
  fetchLikedVideos,
  deleteVideofromLikedVideos,
} from "../../common-function/likedvideo-server-function";
import Loader from "../../common-components/loader";
function LikeVideoDisplay() {
  const { state, dispatch } = useLikeVideo();
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await fetchLikedVideos();

      console.log("this is resposne for liked video", response);
      if (response) {
        dispatch({ type: "ADD-DATA-FROM_SERVER", payload: response });
      }
      setLoader(false);
    })();
  }, []);
  console.log("this is like video list", state);
  return loader ? (
    <Loader />
  ) : (
    <>
      <div className="heading">LIKED VIDEOS</div>
    <div className="liked-video-display">
      {state?.likedVideos?.map((video) => {
        return (
          
        
          <div className="song">
            <img className="song-thumbnail" src={video.image} />
            <div className="song-name">{video.name}</div>
            <FontAwesomeIcon
              className="song-delete"
              onClick={async () => {
                dispatch({
                  type: "REMOVE-LIKED-VIDEO",
                  payload: { video: video },
                });
                await deleteVideofromLikedVideos(video._id, state._id);
              }}
              icon={faTrashAlt}
            />
          </div>
        );
      })}
    </div>
    </>
    
  );
}
export default LikeVideoDisplay;
