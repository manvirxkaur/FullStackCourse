const Display=(props)=>
{
    return(
        <ul>{props.found.map(i=><li key={i.name}>{i.name} {i.number}</li>)}</ul>
    )
}
export default Display