import Chart from "react-google-charts";
import Result from "./Result";


export const Histogram = (data: Result[]) => {
    const mapped = data.map<string[]>(r => {
        let res = new Result([])
        res.userId = r.userId
        res.lastActivity = r.lastActivity
        res.registered = r.registered
        res.id = r.id
        return ["User #" + res.userId.toString(), res.getDays().toString()]
    })
    return <Chart
        width={500}
        height={300}
        chartType="Histogram"
        loader={<div>Loading Chart...</div>}
        data={mapped}
        options={{
            legend: { position: 'none' },
            title: 'User live time',
        }}
    />
}