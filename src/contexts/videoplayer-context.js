import {createContext, useContext, useState} from "react"

let PlayerContext = createContext();

export function PlayerProvider({children}){
    const [video,setVideo] = useState({})
    return(
        <PlayerContext.Provider  value={{video,setVideo}}>
        {children}
    </PlayerContext.Provider>
    )
   
}

export function useVideo(){
    return useContext(PlayerContext);
}