import React from 'react'
import {GlobalCtx} from "../App"
import { Link } from 'react-router-dom'


const Display = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { url } = gState
    const [logs, setLogs]= React.useState([])
  
    const getLogs = async () => {
    const token = await window.localStorage.getItem("token")
      const response = await fetch(url + "/logs",  {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${token}`
        }
    })
      const data = await response.json()
      setLogs(data)
    }
  
    React.useEffect(() => {
      getLogs()
    }, [])

    const selectWord = (log) => {
        setSelectedLog(log);
      };
  
  
  const loaded = () => (
    <div className="log-container" style={{display: 'flex'}}>
    {logs.map((log)=> {
      return (
        <div className="card" style={{width: '80%', margin: 10, height: 350, justifyContent: 'space-between'}}>
            
      <h2 className="card-header">{log.workout}</h2>
      <h3 className="card-title">Time: {log.duration}</h3>
      <p className="card-text">Notes: {log.notes}</p>
      <button className="card-footer btn btn-secondary" style={{width: 70, margin: '10px auto', justifySelf: 'flex-end', backgroundColor: 'gray'}} onClick={() => {
          setgState({...gState, selectedLog: log})
          history.push("/update")}}>Edit</button>
      <button className="card-footer btn btn-danger" style={{width: 70, margin: '10px auto', justifySelf: 'flex-end', backgroundColor: 'red'}} onClick={async ()=> {
        const token = await window.localStorage.getItem("token") 
        await fetch("http://localhost:3000/logs/" + log.id, {
          method: "delete",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          }
        })
        getLogs()
      }}><ion-icon name="trash-outline" style={{fontSize: 25}}></ion-icon></button>
      </div>
    )
    })}
    </div>
    )
  
  
    return (
      <div className="logs">
        <button class="btn btn-primary" style={{margin: 15}}><Link to="/create" style={{textDecoration: 'none', color: 'white'}}>Create New Log</Link></button>
        <h1>Logs</h1>
      {logs.length > 0 ? loaded() : null}
      </div>
    );
}

export default Display