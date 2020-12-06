import React from 'react'
import {GlobalCtx} from "../App"
import { Link } from 'react-router-dom'


const Display = () => {
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
  
  
  const loaded = () => (
    <>
    {logs.map((log)=> {
      return (
        <div class="card" style={{width: '80%', margin: 'auto'}}>
            
      <h1>{log.duration}</h1>
      <h2>{log.workout}</h2>
      <h3>{log.notes}</h3>
      <button class="btn btn-primary" onClick={async ()=> {
        const token = await window.localStorage.getItem("token") 
        await fetch("http://localhost:3000/logs/" + log.id, {
          method: "delete",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          }
        })
        getLogs()
      }}>Delete</button>
      </div>
    )
    })}
    </>
    )
  
  
    return (
      <div className="App">
        <button class="btn btn-primary"><Link to="/create" style={{textDecoration: 'none', color: 'white'}}>Create New Log</Link></button>
        <h1>Logs</h1>
      {logs.length > 0 ? loaded() : null}
      </div>
    );
}

export default Display