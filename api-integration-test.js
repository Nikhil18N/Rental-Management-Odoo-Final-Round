// Comprehensive API Integration Test
// Tests all major endpoints and functionalities

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000/api';
let authToken = '';

// Test data
const testUser = {
  email: 'test@example.com',
  password: 'password123',
  firstName: 'Test',
  lastName: 'User',
  role: 'customer'
};

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testAPI(endpoint, method = 'GET', data = null, token = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    };
    
    if (data && method !== 'GET') {
      options.body = JSON.stringify(data);
    }
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const result = await response.json();
    
    return {
      status: response.status,
      success: response.ok,
      data: result
    };
  } catch (error) {
    return {
      status: 0,
      success: false,
      error: error.message
    };
  }
}

async function runTests() {
  console.log('🚀 Starting Comprehensive API Integration Tests...\n');
  
  let passedTests = 0;
  let totalTests = 0;
  
  // Test 1: Health Check
  totalTests++;
  console.log('1️⃣ Testing Health Check...');
  const health = await testAPI('/health');
  if (health.success && health.data.status === 'OK') {
    console.log('✅ Health check passed');
    passedTests++;
  } else {
    console.log('❌ Health check failed:', health);
  }
  
  // Test 2: Get Products (Public)
  totalTests++;
  console.log('\n2️⃣ Testing Get Products...');
  const products = await testAPI('/products');
  if (products.success) {
    console.log('✅ Products fetched successfully');
    console.log(`📦 Found ${products.data.length} products`);
    passedTests++;
  } else {
    console.log('❌ Failed to fetch products:', products);
  }
  
  // Test 3: Get Categories
  totalTests++;
  console.log('\n3️⃣ Testing Get Categories...');
  const categories = await testAPI('/categories');
  if (categories.success) {
    console.log('✅ Categories fetched successfully');
    console.log(`📂 Found ${categories.data.length} categories`);
    passedTests++;
  } else {
    console.log('❌ Failed to fetch categories:', categories);
  }
  
  // Test 4: User Registration
  totalTests++;
  console.log('\n4️⃣ Testing User Registration...');
  const register = await testAPI('/auth/register', 'POST', testUser);
  if (register.success) {
    console.log('✅ User registration successful');
    passedTests++;
  } else {
    console.log('❌ User registration failed:', register);
  }
  
  // Test 5: User Login
  totalTests++;
  console.log('\n5️⃣ Testing User Login...');
  const login = await testAPI('/auth/login', 'POST', {
    email: testUser.email,
    password: testUser.password
  });
  if (login.success && login.data.token) {
    console.log('✅ User login successful');
    authToken = login.data.token;
    console.log(`🔐 Token received: ${authToken.substring(0, 20)}...`);
    passedTests++;
  } else {
    console.log('❌ User login failed:', login);
  }
  
  // Test 6: Protected Route - Dashboard Stats
  totalTests++;
  console.log('\n6️⃣ Testing Protected Route - Dashboard Stats...');
  const dashboard = await testAPI('/dashboard/stats', 'GET', null, authToken);
  if (dashboard.success) {
    console.log('✅ Dashboard stats accessed successfully');
    console.log('📊 Dashboard data:', dashboard.data);
    passedTests++;
  } else {
    console.log('❌ Failed to access dashboard:', dashboard);
  }
  
  // Test 7: Create Quotation
  totalTests++;
  console.log('\n7️⃣ Testing Create Quotation...');
  if (products.success && products.data.length > 0) {
    const quotationData = {
      items: [
        {
          productId: products.data[0].id,
          quantity: 2,
          durationType: 'daily',
          duration: 7,
          notes: 'Test quotation item'
        }
      ],
      notes: 'Test quotation from API integration test',
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    const quotation = await testAPI('/quotations', 'POST', quotationData, authToken);
    if (quotation.success) {
      console.log('✅ Quotation created successfully');
      console.log(`💰 Quotation ID: ${quotation.data.id}`);
      passedTests++;
    } else {
      console.log('❌ Failed to create quotation:', quotation);
    }
  } else {
    console.log('⚠️ Skipping quotation test - no products available');
  }
  
  // Test 8: Get User Quotations
  totalTests++;
  console.log('\n8️⃣ Testing Get User Quotations...');
  const userQuotations = await testAPI('/quotations/my', 'GET', null, authToken);
  if (userQuotations.success) {
    console.log('✅ User quotations fetched successfully');
    console.log(`📄 Found ${userQuotations.data.length} quotations`);
    passedTests++;
  } else {
    console.log('❌ Failed to fetch user quotations:', userQuotations);
  }
  
  // Test 9: Search Products
  totalTests++;
  console.log('\n9️⃣ Testing Product Search...');
  const searchResults = await testAPI('/products?search=chair');
  if (searchResults.success) {
    console.log('✅ Product search completed successfully');
    console.log(`🔍 Search results: ${searchResults.data.length} products found`);
    passedTests++;
  } else {
    console.log('❌ Product search failed:', searchResults);
  }
  
  // Test 10: Get Product by ID
  totalTests++;
  console.log('\n🔟 Testing Get Product by ID...');
  if (products.success && products.data.length > 0) {
    const productId = products.data[0].id;
    const product = await testAPI(`/products/${productId}`);
    if (product.success) {
      console.log('✅ Product fetched by ID successfully');
      console.log(`📦 Product: ${product.data.name}`);
      passedTests++;
    } else {
      console.log('❌ Failed to fetch product by ID:', product);
    }
  } else {
    console.log('⚠️ Skipping product by ID test - no products available');
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('🏁 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passedTests}/${totalTests} tests`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests} tests`);
  console.log(`📊 Success Rate: ${Math.round((passedTests/totalTests) * 100)}%`);
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! The API is fully functional!');
  } else if (passedTests > totalTests * 0.8) {
    console.log('\n👍 Most tests passed! The API is mostly functional.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the API implementation.');
  }
  
  console.log('\n🌐 Frontend: http://localhost:5173');
  console.log('🔌 Backend API: http://localhost:3000/api');
}

// Run tests
runTests().catch(console.error);
