import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate('errors')
export let options = {
    thresholds:{
        errors: ['rate<0.5']
    }
}

export default function (){
    const response = http.get('https://run.mocky.io/v3/cf3e7843-ed20-4f07-a05a-34efd46c082f')
    // console.log(JSON.parse(response.body).status);
    const check1 = check(response, {
        'is response status is 200: ' : (r) => r.status === 200,
        // 'Has body status': (r) => JSON.parse(r.body).status === 'success',
    })
    errorRate.add(!check1);

    const check2 = check(response, {
        'body size ' : (r) => r.body.length === 45,
    })
    errorRate.add(!check2);   
}