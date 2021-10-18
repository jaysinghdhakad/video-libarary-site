import { createContext, useContext, useState, useReducer } from "react";

let PlaylistContext = createContext();
export function PlaylistProvider({ children }) {
  const [state, dispatch] = useReducer(PlaylistReducer, []);
  return (
    <PlaylistContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaylistContext.Provider>
  );
}

function PlaylistReducer(state, value) {
  let newPlaylist = [...state];
  switch (value.type) {
    case "ADD-DATA-FROM_SERVER":
      console.log("the reducer of playlist is working")
      return value.payload;
    case "ADD-PLAYLIST":
      const flag = state.some((item) => {
        return item?.playlistName === value?.payload?.playlistName;
      });
      if (flag) {
        return state;
      }
      return [
        ...state,
        {
          playlistName: value.payload.playlistName,
          playlist: [],
        },
      ];
    case "DELETE-PLAYLIST":
      
      return newPlaylist.filter((playlist)=>{
        return playlist.playlistName!== value.payload.playlistName;
      })
    case "ADD-SONG-TO-PLAYLIST":
     
      const newState = state.map((playlist) => {
        if (playlist?.playlistName === value.payload.playlistName) {
          const flag = playlist.playlist.some((video) => {
            return video.name === value.payload.Video.name;
          });
          if (!flag) {
            playlist.playlist = [...playlist.playlist, value.payload.song];
          }
        }
        return playlist;
      });
      return newState;
     case "DELETE-SONG-FROM-PLAYLIST":
        newPlaylist.map((playlist) =>{
          if(playlist.playlistName === value.payload.playlistName){
            let newPlaylist = [...playlist.playlist]
            playlist.playlist = newPlaylist.filter((Video)=>{
              return Video.name!== value.payload.videoName
            })
            return playlist;
          }
        })
        return newPlaylist;
    default:
      break;
  }
}

export function usePlaylist() {
  return useContext(PlaylistContext);
}
