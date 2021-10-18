import "./invalid-entries-warning.css"
function ServerErrorWarning(){
    return (
        <div  className="warning-box">
        <div className="heading">Error 500: Something wrong with server</div>
        <div className="message">Server Error while loggong in try again after some time</div>
       
    </div>
    )
}
export default ServerErrorWarning;