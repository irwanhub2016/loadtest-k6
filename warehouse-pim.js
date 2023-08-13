import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export default function () {
  const url = 'https://api-staging.jurnal.id/pim/warehouses';

  // Generate random name and code
  const randomName = Math.random().toString(36).substring(7);
  const randomCode = Math.random().toString(36).substring(7);

  // Create a timestamp string
  const timestamp = Date.now().toString();

  // Combine variables with timestamp
  const uniqueName = randomName + '_' + timestamp;
  const uniqueCode = randomCode + '_' + timestamp;

  const payload = {
    company_id: 2240,
    name: uniqueName,
    code: uniqueCode,
    description: 'located in east jakarta as main warehouse',
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI4SDhZbUQxNFJIeFFId1ExN2ljdXNKVzlLYm1zZjBGUSIsInVzZXJfaWQiOjIwNDQzNiwiY29tcGFueV9pZCI6MjI0MCwiZ2VuZXJhdGVkX2F0IjoiMTY4NjczNzU2Njg1OCJ9.umv3SAYpjGYmqXFTpmwwDBBg76IJaWRHE9VjFtxw1tY',
  };

  // Send POST request
  const response = http.post(url, JSON.stringify(payload), { headers });

  // Output response status and body
  console.log(`Response status: ${response.status}`);
  console.log(`Response body: ${response.body}`);

  sleep(0.5); // Wait for 1 second between each request
}

export function handleSummary(data) {
  return {
    'result.html': htmlReport(data),
  };
}
