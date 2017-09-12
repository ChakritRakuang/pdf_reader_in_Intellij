'use strict';

var pdfjsVersion = PDFJSDev.eval('BUNDLE_VERSION');
var pdfjsBuild = PDFJSDev.eval('BUNDLE_BUILD');

var pdfjsCoreWorker = require('./core/worker.js');

exports.WorkerMessageHandler = pdfjsCoreWorker.WorkerMessageHandler;