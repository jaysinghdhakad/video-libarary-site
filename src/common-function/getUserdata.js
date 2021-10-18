import {
  
    fetchLikedVideos,
  } from "../common-function/likedvideo-server-function";
  import {
   
    fetchWatchHistory,
  } from "../common-function/watchhistory-server-function";
  import {
   
    fetchWatchLater,
  } from "../common-function/watch-later-server-function";
  
async function getUserdata(){
   
    const likedObject = await fetchLikedVideos();
    console.log("thus is the liked videos at videoPlayer ", likedObject);

    

    const watchLaterObject = await fetchWatchLater();
   

    const historyObject = await fetchWatchHistory();
    
    return {likedObject,watchLaterObject,historyObject}
}

export default getUserdata;