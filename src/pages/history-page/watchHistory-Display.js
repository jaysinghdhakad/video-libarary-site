import { useHistory } from "../../contexts/watch-history-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./watchHistory-Display.css";
import {fetchWatchHistory,deleteVideoFromWatchhitory} from "../../common-function/watchhistory-server-function"
import { useEffect,useState } from "react";
import Loader from "../../common-components/loader"
function WatchHistory() {
  const { state, dispatch } = useHistory();
  const [loader,setLoader] = useState(false);
  useEffect(()=>{
    (async()=>{
      setLoader(true)
        const response = await fetchWatchHistory();
       if( response ){ dispatch({type:"ADD-DATA-FROM_SERVER",payload: response})
       }
       setLoader(false);
    })();
  },[])
  console.log("this is history", state);
  return(loader? <Loader/>  :
    <div className="watch-history-display">
      {state?.history?.map((video,index) => {
        return (
          <div className="song">
            <img className="song-thumbnail" src={video.image} />
            <div className="song-name">{video.name}</div>
            <FontAwesomeIcon
              className="song-delete"
              onClick={async() =>
               { dispatch({
                  type: "DELETE-VIDEO-FROM-WATCH-HISTORY",
                  payload: { video: video , index : index}
                })
              await deleteVideoFromWatchhitory(index,state._id)
            }
              }
              icon={faTrashAlt}
            />
          </div>
        );
      })}
    </div>
  );
}
export default WatchHistory;
