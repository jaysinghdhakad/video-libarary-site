import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

let LikeContext = createContext();

export function LikeProvider({ children }) {
  const [state, dispatch] = useReducer(LikeReducer, {});
  return (
    <LikeContext.Provider value={{ state, dispatch }}>
      {children}
    </LikeContext.Provider>
  );
}

function LikeReducer(state, value) {
  switch (value.type) {
    case "ADD-DATA-FROM_SERVER":
      console.log("data add to the liked vides", value.payload);
      return value.payload;
    case "ADD-LIKED-VIDEO":
      const flag = state?.likedVideos?.some((video) => {
        return video.name === value.payload.video.name;
      });
      if (!flag) {
        return {
          _id: state._id,
          likedVideos: [...state?.likedVideos, value.payload.video],
        };
      } else {
        return state;
      }

      break;
    case "REMOVE-LIKED-VIDEO":
      return {
        _id: state._id,
        likedVideos: state.likedVideos.filter((video) => {
          return video.name !== value.payload.video.name;
        }),
      };
    
    default:
      break;
  }
}

export function useLikeVideo() {
  return useContext(LikeContext);
}
