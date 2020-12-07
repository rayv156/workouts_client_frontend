import React from 'react'
import {GlobalCtx} from "../App"

const Update = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { selectedLog } = gState

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
        await fetch("http://localhost:3000/logs/" + gState.selectedLog.id, {
          method: "put",
          headers: {
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        history.push("/")
      }

      return (
          <div>
        <h1>Update Log</h1>
        <form onSubmit={handleUpdate}>
          <input type="text" name="duration" value={formData.duration} onChange={createChange}/>
          <input type="text" name="workout" value={formData.workout} onChange={createChange}/>
          <input type="text" name="notes" value={formData.notes} onChange={createChange}/>
          <input type="hidden" name="user_id" value={formData.user_id}/>
          <input type="submit" value="Update Log"/>
        </form>
        </div>
      )
}

export default Update