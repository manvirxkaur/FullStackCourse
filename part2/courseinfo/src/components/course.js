const Course = ({course}) =>
{
  let total=course.parts.reduce((sum,part)=>sum+part.exercises,0);

  return(
    <div>
      <h3>{course.name}</h3>
      {course.parts.map(c=><p key={c.id}>{c.name}   {c.exercises}</p>)}
      <b>total of {total} exercises</b>
    </div>
  )
}

export default Course