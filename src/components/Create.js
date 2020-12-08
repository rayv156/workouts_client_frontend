import React from 'react'
import {GlobalCtx} from "../App"
import './Create.css'

const Create = ({history}) => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { url } = gState

    const user = JSON.parse(window.localStorage.getItem("user"))
    const [formData, setFormData] = React.useState({
      duration: "",
      workout: "",
      notes: "",
      user_id: user.id
    })

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
        history.push("/")
      }

      return (
          <div>
        <h1>Create Log</h1>
        <form onSubmit={handleCreate}>
        <label>Duration: </label>
          <input type="time" className="without_ampm" name="duration" value={formData.duration} onChange={createChange}/>
        <label>Workout Type: </label>
          <input type="text" name="workout" value={formData.workout} onChange={createChange}/>
          <label>Notes: </label>
          <input type="text" name="notes" value={formData.notes} onChange={createChange}/>
          <input type="hidden" name="user_id" value={formData.user_id}/>
          <input type="submit" value="Create Workout Log"/>
        </form>
        </div>
      )
}

export default Create