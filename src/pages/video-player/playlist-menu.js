import "./playlist-menu.css";
import { useEffect, useState } from "react";
import { useVideo } from "../../contexts/videoplayer-context";
import { usePlaylist } from "../../contexts/playlist-context";
import {
  createplaylist,
  addVideoToPlaylist,
  fetchPlaylist,
} from "../../common-function/playlist-server-functions";
import SmallLoader from "../../common-components/smallLoader";
function PlayListMenu() {
  const [loader, setLoader] = useState(false);
  const { video } = useVideo();
  const [name, setName] = useState("");
  const { state: playState, dispatch } = usePlaylist();
  console.log("this is playlist state", playState);
  useEffect(() => {
    (async () => {
      setLoader(true);
      const response = await fetchPlaylist();
      console.log({ response: response });
      if (response) {
        console.log("i am working");
        dispatch({ type: "ADD-DATA-FROM_SERVER", payload: response });
      }
      setLoader(false);
    })();
  }, []);

  console.log("this is playlist required", playState);
  return (
    <div className="menu">
      <div className="playlist-heading">Playlist's</div>
      <div className="playlist-list">
        {loader ? (
          <SmallLoader />
        ) : (
          playState?.map((playlist) => {
            return (
              <div
                className="playlist"
                onClick={async () => {
                 
                  dispatch({
                    type: "ADD-SONG-TO-PLAYLIST",
                    payload: {
                      playlistName: playlist?.playlistName,
                      Video: video,
                    },
                  });
                  await addVideoToPlaylist(video?._id, playlist?._id);
                }}
              >
                {playlist.playlistName}
              </div>
            );
          })
        )}
      </div>

      <div className="create-playlist">
        <input
          placeholder="playlist name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button
          onClick={async () => {
            await createplaylist(name);
            dispatch({ type: "ADD-PLAYLIST", payload: { playlistName: name } });
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default PlayListMenu;
