// add referer header to wsj requests
function addHeader({ requestHeaders }) {
  requestHeaders.push({
    name: 'referer',
    value: 'https://facebook.com'
  });

  return { requestHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  addHeader,
  {
    urls: [ '*://*.wsj.com/*' ],
    types: [ 'main_frame' ],
  },
  [ 'blocking', 'requestHeaders' ]
);

