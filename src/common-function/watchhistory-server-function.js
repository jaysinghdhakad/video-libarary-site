import  axios from "axios";
export async function fetchWatchHistory(){
     try{
         const response = await axios.get("https://video-library-server.jaysinghdhakad.repl.co/history");
         return response.data.historyObject
     }catch(error){
         console.log("this is fetch watch history error",error.message)
         return null;
     }
 }
 
export async function addVideoToWatchhistory(videoId,historyObjectId){
    try{
        const respose = await axios.post(`https://video-library-server.jaysinghdhakad.repl.co/history/${historyObjectId}`,{videoId:videoId})
    }catch(error){
        console.log("this is the add video to watch history error",error.message)
    }
}
export async function deleteVideoFromWatchhitory(videoIndex,historyObjectId){
    try{
        const respose = await axios.delete(`https://video-library-server.jaysinghdhakad.repl.co/history/${historyObjectId}`,{data:{index:videoIndex}})
    }catch(error){
        console.log("this is the delete video from watch history error",error.message)
    }
}
 