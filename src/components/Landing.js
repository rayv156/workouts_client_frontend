import React from 'react'
import './Landing.css'


const Landing = () => {

    return (
        <>
        <div className="jumbotron" style={{backgroundPosition: 'center' , backgroundRepeat: 'no-repeat', textAlign: 'left'}}>
        <div className="paragraph">
        <div className="highlight">
        <h1 className="display-4">See your progress</h1>
  <p className="lead">Keep your fitness logs organized and discover new workouts.</p>
  <hr className="my-4"/>
  <p>Sign up and get started.</p>
  </div>
  <p className="lead">
    <div id="slide"><a className="btn btn-primary btn-lg" href="/signup" role="button">Join Now</a></div>
  </p>
  </div>
        </div>
        <div class="container" style={{paddingBottom: 30}}>
  <div class="row">
    <div class="col-sm">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsIirQEk7KZ9s0_AFbToyXTjK9jN3ifvo2Zg&usqp=CAU" style={{width: '50%'}}></img>
      <h3>Find Workouts</h3>
      <p>Search through a database of at-home workouts</p>
    </div>
    <div class="col-sm">
        <img src="https://img.icons8.com/ios/452/notepad.png" style={{width: '50%'}}></img>
      <h3>Log Workouts</h3>
      <p>Keep a record and take notes once workouts are completed</p>
    </div>
    <div class="col-sm">
        <img src="https://2e1ev12qjpdy2khbbl1vc8vf16v3-wpengine.netdna-ssl.com/wp-content/uploads/2018/10/product-icon-integrated-marketing.png" style={{width: '50%'}}></img>
      <h3>Track Progress</h3>
      <p>View your log history and participate in weekly weigh-ins to see progress</p>
    </div>
  </div>
</div>
        </>
       
    )
}

export default Landing