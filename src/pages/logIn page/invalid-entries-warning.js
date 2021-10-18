import "./invalid-entries-warning.css"
function InvalidEntries(){
    return (
        <div  className="warning-box">
            <div className="heading">Error 401: Invalid ID or Password</div>
            <div className="message">You entered wrong Id or Password. Please enter valid Id and Password</div>
           
        </div>
    )
}

export default InvalidEntries;