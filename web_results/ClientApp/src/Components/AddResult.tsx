import React, {Component} from "react";
import dateFormat from "dateformat";
import Result from "./Result";


type AddResultProps = {
    addCallback: (res: Result) => void
}


class AddResult extends Component<AddResultProps>{
    private readonly userIdRef: React.RefObject<HTMLInputElement>;
    private readonly registeredRef: React.RefObject<HTMLInputElement>;
    private readonly lastActivityRef: React.RefObject<HTMLInputElement>;
    
    constructor(props: AddResultProps) {
        super(props);
        this.userIdRef = React.createRef();
        this.registeredRef = React.createRef();
        this.lastActivityRef = React.createRef();
    }
    
    render() {
        const today = dateFormat(new Date(Date.now()), "yyyy-mm-dd")
        return <tr>
            <td/>
            <td>
                <input ref={this.userIdRef} type="number" required placeholder="0" inputMode="numeric"/>
            </td>
            <td>
                <input ref={this.registeredRef} type="date" required placeholder={today} />
            </td>
            <td>
                <input ref={this.lastActivityRef} type="date" required placeholder={today}/>
                <button onClick={() => this.addRow()}>Add</button>
            </td>
        </tr>
    }

    private addRow() {
        if(!this.validateData()){
            return;
        }
        let row = this.getNewRow();
        this.props.addCallback(row);
        this.reset();
    }

    private getNewRow() {
        const row = new Result(this.props);
        row.userId = Number.parseInt(this.userIdRef.current!.value);
        row.registered = AddResult.getDate(this.registeredRef.current)!
        row.lastActivity = AddResult.getDate(this.lastActivityRef.current)!
        return row
    }

    private validateData() {
        function isValid(input: HTMLInputElement | null) {
            input?.checkValidity();
            return input?.validity.valid == true;            
        }

        return isValid(this.userIdRef.current) 
            && isValid(this.registeredRef.current)
            && isValid(this.lastActivityRef.current)
            && AddResult.getDate(this.registeredRef.current)! <= AddResult.getDate(this.lastActivityRef.current)!;
    }
    
    private static getDate(input: HTMLInputElement | null){
        return input?.valueAsDate;
    }

    private reset() {
        AddResult.reset(this.userIdRef.current!);
        AddResult.reset(this.registeredRef.current!);
        AddResult.reset(this.lastActivityRef.current!);
    }

    private static reset(input: HTMLInputElement) {
        input.value = ""; 
    }
}


export default AddResult;