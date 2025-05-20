const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const infos = [
    {part: part1,exercises: exercises1},
    {part: part2,exercises: exercises2},
    {part: part3,exercises: exercises3}
  ]
  const nums = [
    exercises1,
    exercises2,
    exercises3
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content infos = {infos} />
      <Total nums = {nums} />
    </div>
  )
}

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Content = (props) => {
  return (
    <>
      <p>
        {props.infos[0].part} {props.infos[0].exercises}
      </p>
      <p>
        {props.infos[1].part} {props.infos[1].exercises}
      </p>
      <p>
        {props.infos[2].part} {props.infos[2].exercises}
      </p>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.nums[0] + props.nums[1] + props.nums[2]}</p>
    </>
  )
}
export default App