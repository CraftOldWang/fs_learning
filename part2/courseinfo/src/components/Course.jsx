const Header = ({course}) => <h2>{course}</h2>

const Content = ({parts}) => 
  <div>
    {
      parts.map((part)=> <Part part={part} key = {part.id} /> )
    }
  </div>

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = (props) => <p>Number of exercises {props.total}</p>

const Course = ({course}) => {

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts} />
      <Total total = {
        course.parts.reduce((sum, part)=> sum += part.exercises, 0)
      } />
    </div>
  )
}

export default Course