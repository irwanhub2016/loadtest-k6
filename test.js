import { collection } from 'k6/postman';
import http from 'k6/http';

export let options = {
  // Set the desired number of VUs (Virtual Users) and duration
  vus: 10,
  duration: '1m',
};

export default function () {
  // Load the Postman collection using k6's collection()
  let result = collection('/Users/irwansyarifudin/Documents/k6/webhook.postman_collection.json');

  // Iterate over each request in the collection
  result.forEach(function (request) {
    // Send HTTP request using k6's http.request() function
    let res = http.request(request.method, request.url, request.body, request.headers);

    // Output the response details
    console.log('Request:', request.name);
    console.log('Response Status Code:', res.status);
    console.log('Response Body:', res.body);
  });
}