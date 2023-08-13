import { Rate } from 'k6/metrics';
import { sleep } from 'k6';
import http from 'k6/http';

const errorRate = new Rate('errorRate');

export let options = {
    vus: 1,
    duration: '30s',
    thresholds: {
        errorRate: [
        // more than 10% of errors will abort the test
        { threshold: 'rate < 0.1', abortOnFail: true, delayAbortEval: '3s' },
        ],
    },
    // thresholds:{
    //     errors: { threshold: 'rate < 0.1', abortOnFail: true, delayAbortEval: '5s' }
    // }
};

export default function () {
    // 503
    const response = http.get('https://run.mocky.io/v3/27a36e70-9540-41ad-a773-3e0f25da13d9')
    // const response = http.get('https://test-api.k6.io/public/crocodiles/1/');
    console.log(response.status);
    errorRate.add(response.status === 200);

    sleep(1);
}
