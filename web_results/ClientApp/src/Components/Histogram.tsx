import Chart from "react-google-charts";
import Result from "./Result";


export const Histogram = (data: Result[]) => {
    const results = data.map<Result>(r => {
        let res = new Result([])
        res.userId = r.userId
        res.lastActivity = r.lastActivity
        res.registered = r.registered
        res.id = r.id
        return res
    })
    const mapped = results.map<string[]>(r => {
        return ["User #" + r.userId.toString(), r.getDays().toString()]
    })
    let max = Math.max(...results.map(r => r.getDays()));
    return <Chart
        width={500}
        height={300}        
        chartType="Histogram"
        loader={<div>Loading Chart...</div>}
        data={mapped}
        options={{
            legend: { position: 'none' },
            title: 'User live time',
            vAxis: {
                minValue: 0,
                maxValue: max,
                gridlines: {
                    count: max
                }
            }
        }}
    />
}