import React from 'react'
import {render} from 'react-dom'

function HelloWorld(){
    return (
        <div>
            <h1>Hello world!</h1>
        </div>
    )
}

render(<HelloWorld/>, document.getElementById("root"))