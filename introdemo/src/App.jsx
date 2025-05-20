import { useState } from 'react'


const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {
    console.log('clicked')
  }

  // setTimeout(
  //   () => setCounter(counter + 1),
  //   1000
  // )

  console.log('rendering...', counter)

  const increaseByOne = () => setCounter(counter +1 )
  

  const setToZero = () => setCounter(0)
  
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>
        plus
      </button>
      <button onClick={setToZero}>
        zero
      </button>
    </div>

  )
}

export default App