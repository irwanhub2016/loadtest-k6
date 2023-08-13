import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

export let errorRate = new Rate('errors')
export let options = {
    stages :[
        { duration: '10s', target: 5}
    ],
    thresholds:{
        errors: ['rate<1']
    }
}

export default function (){
    const response = http.get('https://run.mocky.io/v3/27a36e70-9540-41ad-a773-3e0f25da13d9')
    // console.log(JSON.parse(response.body).status);
    const check1 = check(response, {
        'is response status is 503: ' : (r) => r.status === 503
        // 'Has body status': (r) => JSON.parse(r.body).status === 'success',
    })

    errorRate.add(check1);
}