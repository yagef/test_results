import {ResultTable} from "./Components/ResultTable";
import React from "react";

class App extends React.Component{
    render() {
        return (
            <div className="App">
                <ResultTable/>
                <button onClick={this.save}>Save</button>
                <button>Calculate</button>
            </div>
        );
    }
    
    save() {
        console.log("__saving__")
        fetch('api/Put/', {
            method: 'put'
        })
        console.log("__saved__")
    }
}

export default App;