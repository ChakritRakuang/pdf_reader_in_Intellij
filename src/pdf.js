'use strict';

var pdfjsVersion =
    typeof PDFJSDev !== 'undefined' ? PDFJSDev.eval('BUNDLE_VERSION') : void 0;
var pdfjsBuild =
    typeof PDFJSDev !== 'undefined' ? PDFJSDev.eval('BUNDLE_BUILD') : void 0;

var pdfjsSharedUtil = require('./shared/util.js');
var pdfjsDisplayGlobal = require('./display/global.js');
var pdfjsDisplayAPI = require('./display/api.js');
var pdfjsDisplayTextLayer = require('./display/text_layer.js');
var pdfjsDisplayAnnotationLayer = require('./display/annotation_layer.js');
var pdfjsDisplayDOMUtils = require('./display/dom_utils.js');
var pdfjsDisplaySVG = require('./display/svg.js');

if (typeof PDFJSDev === 'undefined' ||
    !PDFJSDev.test('FIREFOX || MOZCENTRAL')) {
    if (pdfjsSharedUtil.isNodeJS()) {
        var PDFNodeStream = require('./display/node_stream.js').PDFNodeStream;
        pdfjsDisplayAPI.setPDFNetworkStreamClass(PDFNodeStream);
    } else if (typeof Response !== 'undefined' && 'body' in Response.prototype &&
        typeof ReadableStream !== 'undefined') {
        var PDFFetchStream = require('./display/fetch_stream.js').PDFFetchStream;
        pdfjsDisplayAPI.setPDFNetworkStreamClass(PDFFetchStream);
    } else {
        var PDFNetworkStream = require('./display/network.js').PDFNetworkStream;
        pdfjsDisplayAPI.setPDFNetworkStreamClass(PDFNetworkStream);
    }
}

exports.PDFJS = pdfjsDisplayGlobal.PDFJS;
exports.build = pdfjsDisplayAPI.build;
exports.version = pdfjsDisplayAPI.version;
exports.getDocument = pdfjsDisplayAPI.getDocument;
exports.LoopbackPort = pdfjsDisplayAPI.LoopbackPort;
exports.PDFDataRangeTransport = pdfjsDisplayAPI.PDFDataRangeTransport;
exports.PDFWorker = pdfjsDisplayAPI.PDFWorker;
exports.renderTextLayer = pdfjsDisplayTextLayer.renderTextLayer;
exports.AnnotationLayer = pdfjsDisplayAnnotationLayer.AnnotationLayer;
exports.CustomStyle = pdfjsDisplayDOMUtils.CustomStyle;
exports.createPromiseCapability = pdfjsSharedUtil.createPromiseCapability;
exports.PasswordResponses = pdfjsSharedUtil.PasswordResponses;
exports.InvalidPDFException = pdfjsSharedUtil.InvalidPDFException;
exports.MissingPDFException = pdfjsSharedUtil.MissingPDFException;
exports.SVGGraphics = pdfjsDisplaySVG.SVGGraphics;
exports.NativeImageDecoding = pdfjsSharedUtil.NativeImageDecoding;
exports.UnexpectedResponseException =
    pdfjsSharedUtil.UnexpectedResponseException;
exports.OPS = pdfjsSharedUtil.OPS;
exports.UNSUPPORTED_FEATURES = pdfjsSharedUtil.UNSUPPORTED_FEATURES;
exports.isValidUrl = pdfjsDisplayDOMUtils.isValidUrl;
exports.createValidAbsoluteUrl = pdfjsSharedUtil.createValidAbsoluteUrl;
exports.createObjectURL = pdfjsSharedUtil.createObjectURL;
exports.removeNullCharacters = pdfjsSharedUtil.removeNullCharacters;
exports.shadow = pdfjsSharedUtil.shadow;
exports.createBlob = pdfjsSharedUtil.createBlob;
exports.RenderingCancelledException =
    pdfjsDisplayDOMUtils.RenderingCancelledException;
exports.getFilenameFromUrl = pdfjsDisplayDOMUtils.getFilenameFromUrl;
exports.addLinkAttributes = pdfjsDisplayDOMUtils.addLinkAttributes;
exports.StatTimer = pdfjsSharedUtil.StatTimer;