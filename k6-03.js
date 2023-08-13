import http from "k6/http";
import { check } from "k6";

export let options = {
    stages :[
        { duration: '10s', target: 5}
    ]
}

export default function (){
    let response = http.get('https://run.mocky.io/v3/cf3e7843-ed20-4f07-a05a-34efd46c082f')
    // console.log(JSON.parse(response.body).status);
    check(response, {
        'is response status is 200: ' : (r) => r.status === 200,
        'Has body status': (r) => JSON.parse(r.body).status === 'success',
    })
}