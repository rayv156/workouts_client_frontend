import React from 'react'
import {GlobalCtx} from "../App"
import './Create.css'

const Update = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { url, selectedLog } = gState

    const user = JSON.parse(window.localStorage.getItem("user"))
    const [formData, setFormData] = React.useState({
      duration: selectedLog.duration,
      workout: selectedLog.workout,
      notes: selectedLog.notes,
      user_id: selectedLog.user_id
    })

    const createChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
      }
    
      //our handle create function, for when the form is submitted
      const handleUpdate = async (event) => {
        event.preventDefault() //prevent page refresh
        const token = await window.localStorage.getItem("token")
        await fetch(url + "/logs/" + gState.selectedLog.id, {
          method: "put",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        history.push("/logs")
      }

      return (
          <div className="form-container">
        <h1>Update Log</h1>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
        <label>Duration: </label>
        <input type="text" className="without_ampm form-control" name="duration" value={formData.duration} onChange={createChange}/>
        </div>
        <div className="form-group">
        <label>Workout Type: </label>
          <input type="text" name="workout" className="form-control" value={formData.workout} onChange={createChange}/>
          </div>
          <div className="form-group">
          <label>Notes: </label>
          <textarea type="text" name="notes" className="form-control" value={formData.notes} onChange={createChange}/>
          </div>
          <input type="hidden" name="user_id" value={formData.user_id}/>
          <input type="submit" className="btn btn-primary btn-block" value="Update Log"/>
        </form>
        </div>
      )
}

export default Update