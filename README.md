# require-tpl

AngularJS template loader plugin for RequireJS.


## Features

* Load AngularJS templates using RequireJS.
* Compile your AngularJS templates into your javascript during r.js optimization.


## Installation

Copy the `tpl.js` script into your RequireJS `baseURL`. You can also install require-tpl using [bower](http://bower.io/):

``` bash
$ bower install require-tpl
```


## Usage

Template should be stored in a directory named `templates`, at a relative path of `../templates` to your `baseURL`.
A recommended directory structure is as follows:

```
www
 |-- js
 |   |-- angular.js
 |   |-- tpl.js
 |   +-- main.js
 |
 +-- templates
     +-- widget.html
```

Load AngularJS templates in your RequireJS modules:

``` js
define([
    "angular",
    // Load a named AngularJS template.
    "tpl!widget.html"
], function(
    angular
) {
    
    angular.module("main", [
        // Inject the special `tpl` angular module that
        // contains all the loaded templates.
        "tpl"
    ])

    .directive("widget", function() {
        return {
            // Reference loaded AngularJS templates by URL
            // in your directives.
            templateUrl: "widget.html"
        };
    });

});
```


## How it works

The `tpl.js` loader plugin creates a special AngularJS module called `tpl`. Whenever you
load an AngularJS template using `require("tpl!widget.html")`, that template is added
to the AngularJS `$templateCache` inside the `tpl` module. By adding the `tpl` module to
you AngularJS app, you gain access to all the preloaded AngularJS templates.

When the r.js optimizer is run, templates loaded in your RequireJS modules are inlined
into the built file, avoiding additional network requests in production.



## Support and announcements

The require-tpl project was developed by Dave Hall. You can get the code
from the [require-tpl project site](http://github.com/etianen/require-tpl).


## More information
    
Dave Hall is a web developer, based in Cambridge, UK. You can usually
find him on the Internet in a number of different places:

*   [Website](http://www.etianen.com/ "Dave Hall's homepage")
*   [Twitter](http://twitter.com/etianen "Dave Hall on Twitter")
*   [Google Profile](http://www.google.com/profiles/david.etianen "Dave Hall's Google profile")
