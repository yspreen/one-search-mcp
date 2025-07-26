#!/usr/bin/env node

import { localSearch } from './src/search/local.js';

async function testLocalSearch() {
  console.log('Testing LocalSearch...');
  
  try {
    const result = await localSearch({
      query: 'test search',
      limit: 2,
      provider: 'local'
    });
    
    console.log('Search successful!');
    console.log('Results:', result);
  } catch (error) {
    console.error('Search failed:', error);
    console.error('Error stack:', error.stack);
  }
}

testLocalSearch();
