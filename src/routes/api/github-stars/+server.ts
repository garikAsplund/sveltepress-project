// src/routes/api/github-stars/+server.ts
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Cache duration: 1 week in seconds
const CACHE_DURATION = 7 * 24 * 60 * 60;

// In-memory cache (will reset on server restart)
const cache = new Map<string, { stars: number; timestamp: number }>();

export const GET: RequestHandler = async ({ url, fetch }) => {
  const repo = url.searchParams.get('repo');
  
  if (!repo) {
    return json({ error: 'Repository parameter is required' }, { status: 400 });
  }
  
  try {
    const cacheKey = `github-stars-${repo}`;
    const now = Date.now();
    
    // Check cache
    const cachedData = cache.get(cacheKey);
    if (cachedData && now - cachedData.timestamp < CACHE_DURATION * 1000) {
      return json({ stars: cachedData.stars });
    }
    
    // Fetch fresh data
    const response = await fetch(`https://api.github.com/repos/${repo}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    const starCount = data.stargazers_count || 0;
    
    // Update cache
    cache.set(cacheKey, {
      stars: starCount,
      timestamp: now
    });
    
    // Set cache headers for browsers/CDNs
    return json(
      { stars: starCount },
      {
        headers: {
          'Cache-Control': `public, max-age=${CACHE_DURATION}`
        }
      }
    );
  } catch (error) {
    console.error('Error fetching GitHub stars:', error);
    return json({ error: 'Failed to fetch GitHub stars', stars: 0 }, { status: 500 });
  }
};