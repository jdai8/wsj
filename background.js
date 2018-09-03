function deleteHeader(headerName, requestHeaders) {
  let i;
  while ((i = requestHeaders.findIndex(h => h.name.toUpperCase() === headerName.toUpperCase())) > 0)
    requestHeaders.splice(i, 1);
}

function transform({ requestHeaders }) {
  deleteHeader('cookie', requestHeaders);
  deleteHeader('referer', requestHeaders);

  requestHeaders.push({
    name: 'referer',
    value: 'https://facebook.com'
  });

  return { requestHeaders };
}

chrome.webRequest.onBeforeSendHeaders.addListener(
  transform,
  {
    urls: [ '*://*.wsj.com/*' ],
    types: [ 'main_frame' ],
  },
  [ 'blocking', 'requestHeaders' ]
);

