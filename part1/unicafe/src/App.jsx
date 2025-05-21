import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>


const Button = ({onClick, text}) =>
  <button onClick={onClick}>{text}</button>

const Vote = ({increaseGoodByOne, increaseNeutralByOne, increaseBadByOne}) => {
  return (
    <>    
      <Button onClick={increaseGoodByOne} text='good' />
      <Button onClick={increaseNeutralByOne} text='neutral' />
      <Button onClick={increaseBadByOne} text='bad' />
    </>
  )
}

const StatisticLine = ({text, value, suffix = ''}) => 
  
  <tr>
    <td>{text}</td> 
    <td>{value}</td>
    <td>{suffix}</td>
  </tr>

const Statistics = ({good, neutral, bad}) =>  {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  const average =  (good - bad) /total
  const positive_percent = (good /total)*100

  return (
    <>
      <h2>Statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          <StatisticLine text="all" value ={total} />
          <StatisticLine text="average" value ={average} />
          <StatisticLine text="positive" value ={positive_percent} suffix='%' />
        </tbody>
      </table>

    </>
  )

}
  

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  console.log('good',good)
  console.log('neutral',neutral)
  console.log('bad',bad)

  const increaseByOne_Gen = (stateValue, setFunc) => () => {
    setFunc(stateValue + 1)
  }

  return (
    <div>
      <Header text = 'give feedback'/>
      <Vote increaseGoodByOne ={increaseByOne_Gen(good,setGood)} 
        increaseBadByOne= {increaseByOne_Gen(bad,setBad)} 
        increaseNeutralByOne = {increaseByOne_Gen(neutral, setNeutral)} />
      <Statistics good ={good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App