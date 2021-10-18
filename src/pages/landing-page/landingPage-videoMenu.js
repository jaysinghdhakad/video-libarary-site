// import data from "../../datafile"
import "./landingPage.css"
import Loader from "../../common-components/loader"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useVideo} from "../../contexts/videoplayer-context"
import { faCoffee, faEye,faClock } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom"
import { useEffect } from "react"
import axios from "axios"

function Menu(){
    const [data,setdata] = useState();
    const [loader,setLoader] = useState(false);
    useEffect(()=>{
        (async()=>{
            try{
                setLoader(true)
                const response = await axios.get("https://video-library-server.jaysinghdhakad.repl.co/videos")
                setdata(response.data.videos) 
                setLoader(false);
            }catch(error){
                setLoader(false);
                console.log("this is vidoe axios call error", error.message)
            }
        })();
    },[])
    const {setVideo} = useVideo();
    const navigate = useNavigate();
    return(loader? <Loader/>  :
    <><div className="heading">MY LIBRARY</div>
        <div className="cardDisplay">
            {data?.map(item =>{
                return( 
                <div className="card">
                <img src={item?.image} onClick={()=>{
                    setVideo(item);
                    navigate("/player")
                }}/>
                <div className="title">{item?.name}</div>
                <div className="information" >
                    <div className="views">{item.views} <FontAwesomeIcon icon={faEye} /></div>
                    <div className="length">10:00 <FontAwesomeIcon icon={faClock} /></div>
         
                </div>
                </div>)
            })}
        </div>
        </>
    )
    
}
export default Menu;