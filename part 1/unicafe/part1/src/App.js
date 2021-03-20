import React, { useState } from 'react'

const Button=(props)=>
{
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Statistic=(props)=>
{
  return(
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}
const Statistics=(props)=>
{
  if(props.good==0 && props.bad==0 && props.neutral==0)
  {
    return(
      <>
      <h3>statistics</h3>
      <div>No feedback given</div>
      </>
    )
  }
  const all=props.good+props.bad+props.neutral
  const avg=props.good/all
  const positive=props.good*100/all
  return(
    <>
    <h3>statistics</h3>
      <Statistic value={props.good} text="good"/>
      <Statistic value={props.bad} text="bad"/>
      <Statistic value={props.neutral} text="neutral"/>
      <Statistic value={all} text="all"/>
      <Statistic value={avg} text="average"/>
      <Statistic value={positive} text="positive"/>
    </>
  )
}
const App = () => {  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={()=>setGood(good+1)} text="good"/>
      <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
      <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App