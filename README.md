# ExtendScript Project Boilerplate

This boilerplate is configured with the majority of ES5 through ES2018.  
Portions are shimmed via ES5-ES6 shims, which have been modified to work with 
Adobe's ExtendScript implementation of ES3 and does work in InDesign (Desktop and Server) as well as other ExtendScript environments.

* ES6 module `import` and `export` syntax is preferred.
* `global` is set
* `console` is shimmed


## Input

The files `src/*.js` will be built as entry files.  Files in nested directories are not included.  **All input files require a default export that is a function** that will be what is run when the script is loaded.

The following globals are exposed as imports for mocking/testing (see: `extendscript-library/passthrough/__mocks__/`

* `import console from 'console'`
* `import $ from 'helper'`
* `import app from 'app'`
* `import Window from 'window'`
* `import Folder from 'folder'`
* `import File from 'file'`


## Output

The built files are outputted to `dist/`.  Worth noting is there will also be a `dist/shims/` directory that is required and referenced as an `//@include` statement at the top of all output files.

Output files are wrapped in try/catch and the last statement is wrapped with `JSON.stringify` so that the output is easier to use from calling resources.


### Gotchas...

Use **`Date.create`** (non-standard extension added to this boilerplate) instead of `new Date(<string>)`.  It isn't possible to properly shim the `Date` object's constructor (broken inheritance in Indesign).

You can use `const` and `let` inside of functions, but at the module level stick to `import` statements and `var`.

`es5-shim` and `es5-sham` were hacked to work for use with InDesign within this boilerplate, some features may not work.

The `es6-shim-mini` is only a couple methods that were easily shimmed.


### What doesn't work...

Pretty much anything that relies on property getters/setters and inheritance will not work, this includes some portions of Date, Array, and Number that required shimmed constructors.

* **Class syntax** - InDesign has some serious limitations and prevents any
practical implementation of classes or inheritance.
* **getters/setters** - the ES5sham was hacked to work with webpack, but will not work properly for any use.
* **Promises, generators, async** - the usage of anything related to Promises, generators and async is problematic and should be avoided.
* **Maps** - Maps, WeakMaps and similar do not work.
* **Symbols** - Symbols do not work.
* **Async `import()`** method does not work, you can use ES6 module `import` and `export`

## TODO

* Flush out the test mocks for imports of runtime globals (`app`, `$`, `File`, `Folder`, `Window`).
* Enhanced wrappers for filesystem access
* Extend `JSON.parse` shime to use evalscript instead of parsing very large JSON.
* Other extensions and wrappers for better interaction with CEP Extensions.
  * Enhanced wrappers for event-emitters (CEP to ExtendScript and vice-versa).
  * Shims for `setTimeout` and `setInterval` (CEP only)
  * Wrapping methods for exposed functions to normalise and stringify JSON response.

## Future

* Boilerplate for CEP extension (React, Redux, MaterialUI)
* Stand alone CLI builder.
