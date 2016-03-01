# patternplate-transform-cssmodules
[patternplate](/sinnerschrader/patternplate) transform to enable usage of [css modules](/css-modules/css-modules).

## Installation
```shell
npm install --save patternplate-transform-cssmodules
```
## Configuration
```javascript
// file: configuration/patternplate-server/patterns.js
module.exports = {
  formats: {
    css: {
      name: 'Style',
      transforms: ['cssmodules']
    }
  }
};

// file: configuration/patternplate-server/transforms.js
module.exports = {
  cssmodules: {
    inFormat: 'css',
    outFormat: 'css'
  }
};
```
