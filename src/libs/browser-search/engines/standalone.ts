/**
 * Standalone search result extraction functions as strings for browser evaluation
 * These are string templates to avoid any module context issues with tsx/esbuild
 */

export const BING_EXTRACT_FUNCTION = `
function extractSearchResults(window) {
  const links = [];
  const document = window.document;

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const searchResults = document.querySelectorAll('.b_algo');

  searchResults.forEach((result) => {
    const titleElement = result.querySelector('h2 a');
    const snippetElement = result.querySelector('.b_caption p');

    if (titleElement) {
      const title = titleElement.textContent?.trim() || '';
      const href = titleElement.getAttribute('href');
      const snippet = snippetElement?.textContent?.trim() || '';

      if (href && isValidUrl(href)) {
        links.push({
          title,
          url: href,
          snippet,
          content: '',
        });
      }
    }
  });

  return links;
}`;

export const GOOGLE_EXTRACT_FUNCTION = `
function extractSearchResults(window) {
  const links = [];
  const document = window.document;

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const searchResults = document.querySelectorAll('div[data-ved] > div > div');

  searchResults.forEach((result) => {
    const titleElement = result.querySelector('h3');
    const linkElement = result.querySelector('a[href]');
    const snippetElement = result.querySelector('[data-sncf="1"], [data-sncf="2"]');

    if (titleElement && linkElement) {
      const title = titleElement.textContent?.trim() || '';
      const href = linkElement.getAttribute('href');
      const snippet = snippetElement?.textContent?.trim() || '';

      if (href && isValidUrl(href)) {
        links.push({
          title,
          url: href,
          snippet,
          content: '',
        });
      }
    }
  });

  return links;
}`;

export const BAIDU_EXTRACT_FUNCTION = `
function extractSearchResults(window) {
  const links = [];
  const document = window.document;

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const searchResults = document.querySelectorAll('.result');

  searchResults.forEach((result) => {
    const titleElement = result.querySelector('h3 a');
    const snippetElement = result.querySelector('.c-abstract');

    if (titleElement) {
      const title = titleElement.textContent?.trim() || '';
      const href = titleElement.getAttribute('href');
      const snippet = snippetElement?.textContent?.trim() || '';

      if (href && isValidUrl(href)) {
        links.push({
          title,
          url: href,
          snippet,
          content: '',
        });
      }
    }
  });

  return links;
}`;

export const SOGOU_EXTRACT_FUNCTION = `
function extractSearchResults(window) {
  const links = [];
  const document = window.document;

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const searchResults = document.querySelectorAll('.result');

  searchResults.forEach((result) => {
    const titleElement = result.querySelector('h3 a');
    const snippetElement = result.querySelector('.str_info');

    if (titleElement) {
      const title = titleElement.textContent?.trim() || '';
      const href = titleElement.getAttribute('href');
      const snippet = snippetElement?.textContent?.trim() || '';

      if (href && isValidUrl(href)) {
        links.push({
          title,
          url: href,
          snippet,
          content: '',
        });
      }
    }
  });

  return links;
}`;
