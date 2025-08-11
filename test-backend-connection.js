const http = require('http');

function testBackend() {
  console.log('Testing backend API...');
  
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/dashboard/stats-mock',
    method: 'GET'
  }, (res) => {
    console.log('✅ Backend is responding!');
    console.log('Status:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const jsonData = JSON.parse(data);
        console.log('Response:', JSON.stringify(jsonData, null, 2));
      } catch (e) {
        console.log('Raw response:', data);
      }
    });
  });
  
  req.on('error', (err) => {
    console.log('❌ Failed to connect to backend:', err.message);
  });
  
  req.end();
}

testBackend();
