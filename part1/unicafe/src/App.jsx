import { useState } from 'react'


const Header = ({text}) => <h1>{text}</h1>

const Vote = ({increaseGoodByOne, increaseNeutralByOne, increaseBadByOne}) => {
  return (
    <>    
      <button onClick={increaseGoodByOne}>good</button>
      <button onClick={increaseNeutralByOne}>neutral</button>
      <button onClick={increaseBadByOne}>bad</button>
    </>
  )
}

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
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive_percent}%</p>

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