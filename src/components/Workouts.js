import React from 'react'
import {GlobalCtx} from "../App"
import { Link } from 'react-router-dom'
import './Logs.css'



const Workouts = () => {
    const {gState, setgState} = React.useContext(GlobalCtx)
    const { url } = gState
    const [workouts, setWorkouts]= React.useState([])
  
    const getWorkouts = async () => {
    const token = await window.localStorage.getItem("token")
      const response = await fetch(url + "/workouts",  {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${token}`
        }
    })
      const data = await response.json()
      setWorkouts(data)
    }
  
    React.useEffect(() => {
      getWorkouts()
    }, [])

   
  
  const loaded = () => (
    <div className="workout-container" >
    {workouts.map((workout)=> {
        return (
            <div className="card" style={{width: 350, margin: 10, justifyContent: 'space-between', fontFamily: 'Permanent Marker, cursive'}}>
            <h2 className="card-header">Workout</h2>
      <table className="card-body table first">
                <thead>
                    <tr>
                        <th scope="col1">Level</th>
                        <th scope="col2">Sets</th>
                    </tr>
                </thead>
                <tbody>
                    
            {workout.level.map((item, index)=> {
                return (<>
                <tr>
                       <td className="text-center">{item}</td>
                       <td>{workout.sets[index]}</td>

            </tr>
                       </>
                       )
            })}
                </tbody>

      </table>

      <table className="card-body table second">
                <thead>
                    <tr>
                        <th scope="col1">Reps</th>
                        <th scope="col2">Exercise</th>
                    </tr>
                </thead>
                <tbody>
                    
            {workout.reps.map((item, index)=> {
                return (<>
                <tr>
                       <td className="text-center">{item}</td>
                       <td>{workout.exercise[index]}</td>

            </tr>
                       </>
                       )
            })}
                </tbody>

      </table>
      
      </div>
    )
    })}
    </div>
    )
  
  
    return (
      <div className="workouts">
        <h1>Workouts</h1>
      {workouts.length > 0 ? loaded() : null}
      </div>
    );
}

export default Workouts