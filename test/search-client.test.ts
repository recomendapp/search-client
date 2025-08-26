import { SearchClient } from '../src/client';

const TEST_CONFIG = {
  baseUrl: 'http://127.0.0.1:9000/v1',
  accessToken: 'access_token'
};

async function runTests() {
  console.log('🚀 Initializing Search Client...');
  const client = new SearchClient({
    baseUrl: TEST_CONFIG.baseUrl,
  });

  try {
    console.log('\n🔍 Testing global search for "weapons"...');
    const allResults = await client.searchAll(
      { query: 'weapons' },
      { accessToken: TEST_CONFIG.accessToken, locale: 'en-US' }
    );
    console.log('✅ Global search successful! Found movies:', allResults.movies.data.length);
    if (allResults.bestResult) {
      console.log('🏆 Best result:', allResults.bestResult.type, (allResults.bestResult.data as any).title || (allResults.bestResult.data as any).name);
    }
    
    console.log('\n🎬 Testing movie search for "inception"...');
    const movieResults = await client.searchMovies({
      query: 'inception',
      page: 1,
      per_page: 3,
      sort_by: 'popularity'
    });
    console.log('✅ Movie search successful! Found', movieResults.data.length, 'movies.');
    console.log('First result:', movieResults.data[0]?.title);

  } catch (error) {
    console.error('❌ A test failed:', error);
  }
}

runTests();