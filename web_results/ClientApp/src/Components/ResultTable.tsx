import * as React from 'react';
import Result from "./Result";
import dateFormat from 'dateformat'

interface FetchResultsState {
    results: Result[];
    loading: boolean;
}

export class ResultTable extends React.PureComponent<{}, FetchResultsState>{
    
    public constructor(props: any) {
        super(props);
        this.state = { results: [], loading: true };
        console.log('__loading__')

        fetch('api/Load')
            .then(response => {
                const __data = response.json();
                console.log('__data__\n' + __data)
                return __data as Promise<Result[]>
            })
            .then(data => {
                this.setState({ results: data, loading: false });
                console.log('__loaded__')
            });

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderTable(this.state.results);
        console.log('__rendered__')
        return <div>
            {contents}
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
            {results.map(res =>
                <tr key={res.id}>
                    <td />
                    <td>{res.userId}</td>
                    <td>{dateFormat(res.registered, "[dd.mm.yyyy]")}</td>
                    <td>{dateFormat(res.lastActivity, "[dd.mm.yyyy]")}</td>
                </tr>
            )}
            </tbody>
        </table>;
    }
}