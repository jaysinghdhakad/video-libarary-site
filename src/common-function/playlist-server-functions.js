import axios from "axios";
export async function fetchPlaylist(){
    try{
        const response = await axios.get("https://video-library-server.jaysinghdhakad.repl.co/playlist");
        console.log({server:response})
        return response.data.userPlaylists
    }catch(error){
        console.log("this is fetch playlist error",error.message)
        return null;
    }
} 

export async function createplaylist(playlistName){
    try{
        const response = await axios.post("https://video-library-server.jaysinghdhakad.repl.co/playlist",{playlistName:playlistName})
    }catch(error){
        console.log("this is the create playlist error",error.message)
    }
}
export async function deletePlaylist(playlistName){
    try{
        const response = await  axios.delete("https://video-library-server.jaysinghdhakad.repl.co/playlist",{
          data: {playlistName:playlistName}})
    }catch(error){
        console.log("this is the delete playlist error", error.message)
    }
}

export async function deleteVideoFromPlaylist(videoId, playlistId ){
    try{
        const resposne = await axios.delete(`https://video-library-server.jaysinghdhakad.repl.co/playlist/${playlistId}`,{data : {videoId:videoId}})
    }catch(error){
        console.log("this is the delete song from playlist error",error.message)
    }
}
export async function addVideoToPlaylist(videoId, playlistId ){
    try{
        const response = await axios.post(`https://video-library-server.jaysinghdhakad.repl.co/playlist/${playlistId}`,{videoId:videoId})
    }catch(error){
        console.log("this is the add song to the playlist error", error.message)
    }
}
