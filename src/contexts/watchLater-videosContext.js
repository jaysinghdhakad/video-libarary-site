import { createContext, useContext, useReducer} from "react";

 let WatchLaterContext = createContext();
  
export function WatchLaterProvider({children}){
    const [state,dispatch] = useReducer(WatchReducer,[])
    return (
        <WatchLaterContext.Provider  value={{state,dispatch}}>
            {children}
        </WatchLaterContext.Provider>
    )
}

function WatchReducer(state,value){
    switch (value.type) {
        case "ADD-DATA-FROM_SERVER":
            console.log("is this working",value)
            return value.payload;
        case "ADD-WATCHLATER-VIDEO":
            const Flag = state.watchLaterVideos.some(video=>{
                return video.name === value.payload.video.name
            })
            if(!Flag){
              return  [...state.watchLaterVideos, value.payload.video]
            }else{
                return state
            }
            
          case "DELETE-WATCHLATER-VIDEO":
            return {
                _id:state._id,
                watchLaterVideos : state.watchLaterVideos.filter(video=>{
                    return video.name!==value.payload.video.name
                })
            }
        default:
            break;
    }
}

export function useWatchLater(){
    return useContext(WatchLaterContext)
}