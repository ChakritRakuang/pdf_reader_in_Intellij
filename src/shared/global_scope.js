module.exports =
  (typeof window !== 'undefined' && window.Math === Math) ? window :
  // eslint-disable-next-line no-undef
  (typeof global !== 'undefined' && global.Math === Math) ? global :
  (typeof self !== 'undefined' && self.Math === Math) ? self : {};