import { usePlaylist } from "../../contexts/playlist-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./playlist-page.css";
import {deletePlaylist, deleteVideoFromPlaylist,fetchPlaylist} from "../../common-function/playlist-server-functions"
import { useEffect,useState } from "react";
import Loader from "../../common-components/loader"
function PlaylistViewer() {
  const [loader,setLoader] = useState(false);
  useEffect(()=>
    {(async()=>{
      setLoader(true)
      const response = await fetchPlaylist();
      console.log({mainresponse: response})
      if(response) {dispatch({type:"ADD-DATA-FROM_SERVER",payload:response}) }
      setLoader(false)
    })();},[]
  )
  const { state, dispatch } = usePlaylist();
  console.log(state);
  return(loader? <Loader/>  :
    <><div className="heading">PLAYLISTS</div>
    <div className="playlist-view">
      {state?.map((playlist) => {
        return (
          <div className="playlist">
            <div className="playlist-name">
              {playlist?.playlistName}
              <FontAwesomeIcon
                className="playlist-delete"
                onClick={async() =>
                 {
                   
                  dispatch({
                    type: "DELETE-PLAYLIST",
                    payload: { playlistName: playlist.playlistName },
                  });
                 await  deletePlaylist(playlist.playlistName);
                  
                }
                }
                icon={faTrashAlt}
              />
            </div>
            <div className="playlist-songs">
              {" "}
              {playlist?.playlist?.map((video) => {
                return (
                  <div className="song">
                    <img className="song-thumbnail" src={video?.image} />
                    <div className="song-name">{video?.name}</div>
                    <FontAwesomeIcon
                      className="song-delete"
                      onClick={async() =>
                       { dispatch({
                          type: "DELETE-SONG-FROM-PLAYLIST",
                          payload: {
                            playlistName: playlist.playlistName,
                            videoName: video.name,
                          },
                        })
                      await deleteVideoFromPlaylist(video._id,playlist._id);
                      }
                      }
                      icon={faTrashAlt}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
export default PlaylistViewer;
