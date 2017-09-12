import {
  assert, MissingPDFException, UnexpectedResponseException
} from '../shared/util';

function validateRangeRequestCapabilities({ getResponseHeader, isHttp,
                                            rangeChunkSize, disableRange, }) {
  assert(rangeChunkSize > 0);
  let returnValues = {
    allowRangeRequests: false,
    suggestedLength: undefined,
  };
  if (disableRange || !isHttp) {
    return returnValues;
  }
  if (getResponseHeader('Accept-Ranges') !== 'bytes') {
    return returnValues;
  }

  let contentEncoding = getResponseHeader('Content-Encoding') || 'identity';
  if (contentEncoding !== 'identity') {
    return returnValues;
  }

  let length = parseInt(getResponseHeader('Content-Length'), 10);
  if (!Number.isInteger(length)) {
    return returnValues;
  }

  returnValues.suggestedLength = length;
  if (length <= 2 * rangeChunkSize) {
    // The file size is smaller than the size of two chunks, so it does not
    // make any sense to abort the request and retry with a range request.
    return returnValues;
  }

  returnValues.allowRangeRequests = true;
  return returnValues;
}

function createResponseStatusError(status, url) {
  if (status === 404 || status === 0 && /^file:/.test(url)) {
    return new MissingPDFException('Missing PDF "' + url + '".');
  }
  return new UnexpectedResponseException(
    'Unexpected server response (' + status +
    ') while retrieving PDF "' + url + '".', status);
}

function validateResponseStatus(status) {
  return status === 200 || status === 206;
}

export {
  createResponseStatusError,
  validateRangeRequestCapabilities,
  validateResponseStatus,
};
