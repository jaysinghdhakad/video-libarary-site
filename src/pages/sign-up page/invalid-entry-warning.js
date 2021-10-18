import "./warning.css";
function InvalidEntry(){
    return (
        <div  className="warning-box">
            <div className="heading">Error 401: user-name already taken</div>
            <div className="message">take another username this one is aleady taken</div>
           
        </div>
    )
}
export default InvalidEntry;