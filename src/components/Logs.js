import React from 'react'
import {GlobalCtx} from "../App"
import { Link } from 'react-router-dom'
import './Logs.css'


const Logs = ({history}) => {
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
    <div className="log-container" >
    {logs.map((log)=> {
      return (
        <div className="card" style={{width: '350px', margin: 10, height: 350, justifyContent: 'space-between', fontFamily: 'Permanent Marker, cursive', boxShadow: '5px 5px 20px gray'}}>
            
      <h2 className="card-header">{log.workout}</h2>
      <h3 className="card-title">Time: {log.duration}</h3>
      <p className="card-text">Notes: {log.notes}</p>
      <div className="card-footer" style={{display: 'flex', justifyContent: 'space-between'}}>
      <button className="btn btn-secondary" style={{width: 70, margin: '10px', backgroundColor: 'gray'}} onClick={() => {
          setgState({...gState, selectedLog: log})
          history.push("/update")}}><ion-icon name="create-outline" style={{fontSize: 25}}></ion-icon></button>
      <button className="btn btn-danger" style={{width: 70, margin: '10px', backgroundColor: 'red'}} onClick={async ()=> {
        const token = await window.localStorage.getItem("token") 
        await fetch(url + "/logs/" + log.id, {
          method: "delete",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          }
        })
        getLogs()
      }}><ion-icon name="trash-outline" style={{fontSize: 25}}></ion-icon></button>
      </div>
      </div>
    )
    })}
    </div>
    )
  
  
    return (
      <div className="logs">
        <button class="btn btn-secondary" style={{margin: 15}}><Link to="/create" style={{textDecoration: 'none', color: 'white'}}>Create New Log</Link></button>
        <h1>Logs</h1>
      {logs.length > 0 ? loaded() : null}
      </div>
    );
}

export default Logs