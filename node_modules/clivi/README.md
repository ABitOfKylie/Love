# node-clivi

Simple terminal colors.

## Install

	npm install clivi

## Use

```js
var clivi = require('clivi');

console.log(clivi('Hello World!', {fg: 'red', bg: 'blue', style: 'bold'}));
```

Available colors

 * black
 * red
 * green
 * yellow
 * blue
 * magenta
 * cyan
 * white
 * blackBright
 * redBright
 * greenBright
 * yellowBright
 * blueBright
 * magentaBright
 * cyanBright
 * whiteBright

Available styles

 * bold
 * dim
 * underline
 * blink
 * invert
 * hidden
