import * as React from 'react';
import Result from "./Result";
import ReadOnly from "./ReadOnly"
import Modal from "./Modal";
import {Histogram} from "./Histogram";
import DataService from "./DataService";
import AddResult from "./AddResult";

interface FetchResultsState {
    results: Result[];
    loading: boolean;
    show: boolean;
}

export class ResultTable extends React.Component<{}, FetchResultsState>{
    
    public constructor(props: any) {
        super(props);
        this.state = { results: [], loading: true, show: false };
        this.loadData();
    }

    private loadData() {
        this.setState({ loading: true});
        this.load_async();
    }

    private async load_async() {
        let data = await DataService.load_async();
        this.setState({loading: false, results: data});
    }

    private async save() {
        if (this.state.loading){
            return;
        }        
        await DataService.put_async(this.state.results);
        await this.load_async();
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable(this.state.results);
        let retention = this.getRetention(this.state.results, 7);
        return <div>
            {contents}
            <button onClick={() => this.save()}>Save</button>
            <button onClick={() => this.showModal()}>{this.state.show ? "Close" : "Calculate"}</button>
            <Modal onClose={() => this.showModal()} show={this.state.show}>
                <h1>Rolling Retention 7 day: {retention} %</h1>
                {Histogram(this.state.results)}
            </Modal>
        </div>;
    }

    private renderTable(results: Result[]) {
        let undefId = 1;
        return <table className='table'>
            <thead>
                <tr>
                    <th />
                    <th>UserID</th>
                    <th>Date Registration</th>
                    <th>Date Last Activity</th>
                </tr>
            </thead>
            <tbody>
                {results.map(res => {
                    let key = res.id?.toString() ?? "u" + undefId++;
                    return <ReadOnly key={key} res={res} />
                })}
                <AddResult addCallback={(res: Result) => this.addRow(res)}/>
            </tbody>
        </table>;
    }

    private showModal = () => {
        this.setState({
            show: !this.state.show
        });
    };

    private addRow(row: Result) {
        const data = this.state.results.slice();
        data.push(row)
        this.setState({results: data});
    }

    private getRetention(results: Result[], days: number) {
        if (results.length == 0){
            return 0
        }
        let returned = 0;
        results.forEach(r => {
            let res = new Result(this.props);
            res.lastActivity = r.lastActivity
            res.registered = r.registered
            if (res.getDays() >= days){
                returned += 1;
            }
        })
        return Math.round(returned/results.length*100);
    }
}
