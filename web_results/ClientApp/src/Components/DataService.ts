import Result from "./Result";

class DataService {
    public static async put_async(results: Result[]){
        const headers = new Headers({
            'Content-Type': 'application/json'
        });

        const options = {
            method: 'Put',
            body: JSON.stringify(results),
            headers: headers
        };
        await fetch('api/Put/', options)
    }

    public static async load_async() {
        return await fetch('api/Load')
            .then(response => {
                return response.json() as Promise<Result[]>
            });
    }
}

export default DataService