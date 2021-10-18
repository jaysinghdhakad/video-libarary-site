import axios from "axios";

export async function fetchWatchLater() {
  try {
    const response = await axios.get(
      "https://video-library-server.jaysinghdhakad.repl.co/watchLater"
    );
    return response.data.watchLaterObject;
  } catch (error) {
    console.log("this is the fetch watch later error", error.message);
    return null;
  }
}

export async function addVideoToWatchLater(videoId, watchlaterId) {
  console.log("this is watchLater", { videoId, watchlaterId });
  try {
    const resposne = await axios.post(
      `https://video-library-server.jaysinghdhakad.repl.co/watchLater/${watchlaterId}`,
      { videoId: videoId }
    );
  } catch (error) {
    console.log("this is the add video to the watch later", error.message);
  }
}
export async function deleteVideoFromWatchLater(videoId, watchlaterId) {
  try {
    const response = await axios.delete(
      `https://video-library-server.jaysinghdhakad.repl.co/watchLater/${watchlaterId}`,
      { data: { videoId: videoId } }
    );
  } catch (error) {
    console.log("this is the delete video from the watch later", error.message);
  }
}
