import * as React from 'react';
import Result from "./Result";
import ReadOnly from "./ReadOnly"
import Modal from "./Modal";
import {Histogram} from "./Histogram";

interface FetchResultsState {
    results: Result[];
    loading: boolean;
    show: boolean;
}

export class ResultTable extends React.PureComponent<{}, FetchResultsState>{
    
    public constructor(props: any) {
        super(props);
        this.state = { results: [], loading: true, show: false };
        this.loadData();
    }

    private loadData() {
        this.setState({ loading: true});
        fetch('api/Load')
            .then(response => {
                return response.json() as Promise<Result[]>
            })
            .then(data => {
                this.setState({loading: false, results: data});
            });
    }

    async save() {
        if (this.state.loading){
            return;
        }

        const data = new FormData();
        data.append("payLoad", JSON.stringify(this.state.results));

        const options = {
            method: 'Put',
            body: data
        };
        await fetch('api/Put/', options)
        this.loadData()
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable(this.state.results);
        let retention = this.getRetention(this.state.results, 7);
        return <div>
            {contents}
            <button onClick={() => this.save()}>Save</button>
            <button onClick={() => this.addRow(this.getNewRow())}>Add</button>
            <button  onClick={() => this.showModal()}>{this.state.show ? "Close" : "Calculate"}</button>
            <Modal onClose={() => this.showModal()} show={this.state.show}>
                <h1>Rolling Retention 7 day: {retention} %</h1>
                {Histogram(this.state.results)}
            </Modal>
        </div>;
    }

    renderTable(results: Result[]) {
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
                {results.map(res => <ReadOnly key={res.id} res={res} />)}
            </tbody>
        </table>;
    }

    showModal = () => {
        this.setState({
            show: !this.state.show
        });
    };

    private addRow(row: Result) {
        const data = this.state.results.slice();
        data.push(row)
        this.setState({results: data});
    }

    private getNewRow() {
        const row = new Result(this.props);
        row.userId = 1
        row.registered = new Date(Date.now())
        row.lastActivity = new Date(Date.now())
        return row
    }

    getRetention(results: Result[], days: number) {
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
