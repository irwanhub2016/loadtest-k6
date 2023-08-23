// mock: https://run.mocky.io/v3/55358577-d10a-4645-97dc-f2223dee8057

import http from 'k6/http';
import { check } from 'k6';

export default function()
{
    var url = 'https://run.mocky.io/v3/55358577-d10a-4645-97dc-f2223dee8057'

    var headerParam = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const response = http.get(url, headerParam)

    check(response, {
        'is response status is 200: ' : (r) => r.status === 200
    })

    let body = JSON.parse(response.body)
    console.log(`response body ${JSON.stringify(body)}`)
    console.log(`response body ${body.Message}`)

    check(response, {
        'is response body message is correct ' : (r) => JSON.parse(r.body).Message == 'Data saved successfully'
    })
}

