import axios from "axios";
export async function fetchLikedVideos() {
  try {
    const response = await axios.get(
      "https://video-library-server.jaysinghdhakad.repl.co/likedVideo"
    );
    console.log(
      "this is the response at the function fetchlikedVideos",
      response
    );
    return response.data.likedObject;
  } catch (error) {
    console.log("this is the fetch liked videos error.", error.message);
    return "response";
  }
}
export async function deleteVideofromLikedVideos(videoId, likedObjectId) {
  try {
    console.log("this is the video id ", videoId);
    const response = await axios.delete(
      `https://video-library-server.jaysinghdhakad.repl.co/likedVideo/${likedObjectId}`,
      {data:  { videoId: videoId }}
    );
  } catch (error) {
    console.log(
      "this is the delete video from the liked Videos error",
      error.message
    );
  }
}
export async function addVideotoLikedVideos(videoId, likedObjectId) {
  console.log({ videoId, likedObjectId });
  try {
    const response = await axios.post(
      `https://video-library-server.jaysinghdhakad.repl.co/likedVideo/${likedObjectId}`,
   { videoId: videoId }
    );
  } catch (error) {
    console.log("this is the add video to the liked Videos error", error);
  }
}
