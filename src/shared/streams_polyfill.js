let isReadableStreamSupported = false;
if (typeof ReadableStream !== 'undefined') {
  // MS Edge may say it has ReadableStream but they are not up to spec yet.
  try {
    // eslint-disable-next-line no-new
    new ReadableStream({
      start(controller) {
        controller.close();
      },
    });
    isReadableStreamSupported = true;
  } catch (e) {
    // The ReadableStream constructor cannot be used.
  }
}
if (isReadableStreamSupported) {
  exports.ReadableStream = ReadableStream;
} else {
  if (typeof PDFJSDev !== 'undefined' && PDFJSDev.test('CHROME')) {
    throw new Error('ReadableStream polyfill is not found for Chrome bundle');
  }
  exports.ReadableStream =
    require('../../external/streams/streams-lib').ReadableStream;
}