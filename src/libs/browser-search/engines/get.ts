import { BingSearchEngine } from './bing.js';
import { BaiduSearchEngine } from './baidu.js';
import type { LocalBrowserSearchEngine, SearchEngineAdapter, SearchResult } from '../types.js';
import { SogouSearchEngine } from './sogou.js';
import { GoogleSearchEngine } from './google.js';
import { 
  BING_EXTRACT_FUNCTION,
  GOOGLE_EXTRACT_FUNCTION,
  BAIDU_EXTRACT_FUNCTION,
  SOGOU_EXTRACT_FUNCTION,
} from './standalone.js';

/**
 * Factory function to get the appropriate search engine adapter instance.
 *
 * @param engine - The search engine identifier ('sogou', 'bing', or 'baidu')
 * @returns An instance of the requested search engine adapter
 */
export function getSearchEngine(engine: LocalBrowserSearchEngine): SearchEngineAdapter {
  const baseEngine = (() => {
    switch (engine) {
      case 'bing':
        return new BingSearchEngine();
      case 'baidu':
        return new BaiduSearchEngine();
      case 'sogou':
        return new SogouSearchEngine();
      case 'google':
        return new GoogleSearchEngine();
      default:
        return new BingSearchEngine();
    }
  })();

  // Override the extractSearchResults method with string-based functions
  switch (engine) {
    case 'bing':
      baseEngine.extractSearchResults = new Function('window', BING_EXTRACT_FUNCTION + '\nreturn extractSearchResults(window);') as (window: Window) => SearchResult[];
      break;
    case 'baidu':
      baseEngine.extractSearchResults = new Function('window', BAIDU_EXTRACT_FUNCTION + '\nreturn extractSearchResults(window);') as (window: Window) => SearchResult[];
      break;
    case 'sogou':
      baseEngine.extractSearchResults = new Function('window', SOGOU_EXTRACT_FUNCTION + '\nreturn extractSearchResults(window);') as (window: Window) => SearchResult[];
      break;
    case 'google':
      baseEngine.extractSearchResults = new Function('window', GOOGLE_EXTRACT_FUNCTION + '\nreturn extractSearchResults(window);') as (window: Window) => SearchResult[];
      break;
    default:
      baseEngine.extractSearchResults = new Function('window', BING_EXTRACT_FUNCTION + '\nreturn extractSearchResults(window);') as (window: Window) => SearchResult[];
  }

  return baseEngine;
}