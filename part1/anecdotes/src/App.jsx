import { useState } from 'react'




const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteNum, setVoteNum] = useState(Array(anecdotes.length).fill(0))
  
  let maxIndex = 0
  for (let i = 1; i<voteNum.length;i++) {
    if (voteNum[i]>voteNum[maxIndex]){
      maxIndex = i
    }
  }
  console.log('maxindex',maxIndex)
  console.log('votenum',voteNum)

  const selectRandPara = () => {
    console.log(anecdotes.length)
    const randindex = Math.floor(Math.random() * anecdotes.length) 
    console.log(randindex)
    setSelected(randindex)
  }

  const voteSelected = () => {
    console.log(voteNum)
    const copy = [...voteNum]
    copy[selected] += 1
    setVoteNum(copy)
  }

  return (
    <div>
      <h2>Anecdotes of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {voteNum[selected]} votes</p>
      <Button onClick={voteSelected} text = 'vote' />
      <Button onClick={selectRandPara} text='next anecdote'/>

      <h2>Anecdotes with most votes</h2>
      <p>{anecdotes[maxIndex]}</p>
      <p>has {voteNum[maxIndex]} votes</p>
    </div>
  )
}

const Button = ({onClick, text}) =>
  <button onClick={onClick}>{text}</button>




export default App