'use strict';

// Patch importScripts to work around a bug in WebKit and Chrome 48-.
// See https://crbug.com/572225 and https://webkit.org/b/153317.
self.importScripts = (function (importScripts) {
    return function() {
        setTimeout(function () {}, 0);
        return importScripts.apply(this, arguments);
    };
})(importScripts);

importScripts('../node_modules/systemjs/dist/system.js');
importScripts('../systemjs.config.js');

SystemJS.import('pdfjs/core/worker').then(function () {
    // Worker is loaded at this point.
});