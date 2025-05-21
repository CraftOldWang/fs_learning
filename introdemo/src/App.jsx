import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({onClick, text}) =>
  <button onClick={onClick}>{text}</button>

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState(0)

  const handleLeftClick = () => {
    setLeft(left+1)
    const updatedLeft = left + 1;
    setAll(allClicks.concat('L'))
    setTotal(updatedLeft+ right)
  }

  const handleRightClick = () => {
    setRight(right+1)
    const updatedRight = right + 1;
    setAll(allClicks.concat('R'))
    setTotal(left + updatedRight);
  }

  const hello = (who) => () => {
    console.log('hello', who)
  }
  
  const setToValue = (newValue) => () => {
    console.log('value now', newValue)  // print the new value to console
    setValue(newValue)
  }



  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
      <Button onClick={hello("craftoldw")} text = 'test' />


      <p>value {value}</p>
      <Button onClick={setToValue(1000)} text = 'thousand' />
      <Button onClick={setToValue(0)} text='reset' />
    </div>
  )
}
export default App