import axios from "axios";
async function fetchVideos(){
    try{
        const response = await axios.get("https://video-library-server.jaysinghdhakad.repl.co/videos");
        return response.data.videoObject
    }catch(error){
        console.log("this is fetch video error", error.message)
    }
}
export default fetchVideos;