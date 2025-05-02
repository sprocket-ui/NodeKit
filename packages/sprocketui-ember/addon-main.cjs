const { addonV1Shim } = require('@embroider/addon-shim');

module.exports = {
  ...addonV1Shim(__dirname),
  included(app) {
    this._super.included.apply(this, arguments);
  }
};
