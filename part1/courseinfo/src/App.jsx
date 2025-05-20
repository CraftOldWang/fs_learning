const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  const nums = [
    parts[0].exercises,
    parts[1].exercises,
    parts[2].exercises
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content parts = {parts} />
      <Total nums = {nums} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}
const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part info = {props.parts[0]} />
      <Part info = {props.parts[1]} />
      <Part info = {props.parts[2]} />
    </>
  )
}
// 果然，刚才重复的地方，可以组件化

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.info.name} {props.info.exercises}
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