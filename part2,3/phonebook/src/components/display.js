const Display=(props)=>
{ 
    let x=props.found.length===0&&props.showFilter===''? props.persons : props.found;  
    return (
        <div>
           <ul>{x.map(i=><li key={i.name}>{i.name} {i.number} <button onClick={()=>props.removeEntry(i)}>delete</button></li>)}</ul>
       </div>
    )
}
export default Display