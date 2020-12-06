import React from 'react'
import {GlobalCtx} from "../App"


const Display = () => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { url } = gState
    const [logs, setLogs]= React.useState([])
    const user = JSON.parse(window.localStorage.getItem("user"))
    const [formData, setFormData] = React.useState({
      duration: "",
      workout: "",
      notes: "",
      user_id: user.id
    })
  
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
        <div>
      <h1>{log.duration}</h1>
      <h2>{log.workout}</h2>
      <h3>{log.notes}</h3>
      <button onClick={async ()=> {
        const token = await window.localStorage.getItem("token") 
        await fetch("http://localhost:3000/logs/" + log.id, {
          method: "delete",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        getLogs()
      }}>Delete</button>
      </div>
    )
    })}
    </>
    )
  //our handlechange for our create form
    const createChange = (event) => {
      setFormData({...formData, [event.target.name]: event.target.value})
    }
  
    //our handle create function, for when the form is submitted
    const handleCreate = async (event) => {
      event.preventDefault() //prevent page refresh
      const token = await window.localStorage.getItem("token")
      await fetch("http://localhost:3000/logs", {
        method: "post",
        headers: {
          "Content-Type":"application/json",
          "Authorization": `bearer ${token}`
        },
        body: JSON.stringify(formData)
      })
      getLogs()
    }
  
    return (
      <div className="App">
        <h1>Create Log</h1>
        <form onSubmit={handleCreate}>
          <input type="text" name="duration" value={formData.duration} onChange={createChange}/>
          <input type="text" name="workout" value={formData.workout} onChange={createChange}/>
          <input type="text" name="notes" value={formData.notes} onChange={createChange}/>
          <input type="hidden" name="user_id" value={formData.user_id}/>
          <input type="submit" value="Create Notice"/>
        </form>
        <h1>Logs</h1>
      {logs.length > 0 ? loaded() : null}
      </div>
    );
}

export default Display