// Simple API test for dashboard endpoints
const testAPI = async () => {
  try {
    console.log('Testing dashboard API endpoints...');
    
    // Test stats-mock endpoint
    const response = await fetch('http://localhost:3000/api/dashboard/stats-mock');
    const data = await response.json();
    
    console.log('Status:', response.status);
    console.log('Success:', data.success);
    console.log('Data keys:', Object.keys(data.data || {}));
    
    if (data.success) {
      console.log('✅ API endpoint is working!');
      console.log('Stats:', JSON.stringify(data.data.stats, null, 2));
    } else {
      console.log('❌ API returned error');
    }
    
  } catch (error) {
    console.error('❌ API call failed:', error.message);
  }
};

testAPI();
