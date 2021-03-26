import React, { useState } from 'react'

const Add=(props)=>
{
    return(
    <form onSubmit={props.addPerson}>
        <div>
            name: <input value={props.newName} onChange={props.handleNameChange}/><br/>
            number: <input value={props.newNumber} onChange={props.handleNumberChange}/><br/>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}
export default Add;