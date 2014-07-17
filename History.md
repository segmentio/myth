1.1.1 - July 17, 2014
---------------------

* fix `browsers` option [#97](https://github.com/segmentio/myth/pull/97)
* add CLI options to disable features

1.1.0 - July 14, 2014
---------------------

* add [custom media](http://dev.w3.org/csswg/mediaqueries/#custom-mq) feature
* add [rebeccapurple](http://lists.w3.org/Archives/Public/www-style/2014Jun/0312.html) support (mapping to [`#663399`](http://dev.w3.org/csswg/css-color/#valuedef-rebeccapurple))
* improved `calc()`
* improved `@import`
* update autoprefixer to 2.x
* sourcemap support thanks to rework 1.x
* fixed `maximum call stack` issue ([#91](https://github.com/segmentio/myth/issues/91))
* fixed empty `font-feature` value issue ([#79](https://github.com/segmentio/myth/issues/79))

1.0.4 - June 3, 2014
--------------------
* bump `rework-inline` to `0.2.0` fix import bugs

1.0.3 - May 16, 2014
--------------------
* fix returning plugin on empty string

1.0.2 - May 7, 2014
-------------------
* upgrade to `read-file-stdin` version `0.0.4`

1.0.1 - May 5, 2014
-------------------
* add `compress` CLI flag

1.0.0 - May 5, 2014
-------------------
* add `@import` support
* add support for new CSS variables syntax
* add `compress` option
* add `browsers` option

0.3.4 - March 31, 2014
----------------------
* update to `rework-vars#2.0.3` to properly clear variables

0.3.3 - March 18, 2014
----------------------
* pass options to `rework.toString`

0.3.2 - March 18, 2014
----------------------
* add bower support

0.3.1 - March 4, 2014
---------------------
* bump color plugins to fix media query support

0.3.0 - January 7, 2014
-----------------------
* add browser support
* add component support

0.2.0 - December 25, 2013
-------------------------
* add nice error logging
* update `rework-color-function` to `0.1.2`

0.1.8 - December 23, 2013
-------------------------
* update logger

0.1.7 - December 23, 2013
-------------------------
* change to `node-watch`, by [@shanepelletier](https://github.com/shanepelletier)

0.1.6 - December 19, 2013
-------------------------
* add cli tests

0.1.5 - December 19, 2013
-------------------------
* add `read-file-stdin`
* add `write-file-stdout`
* fix exists check

0.1.4 - December 18, 2013
-------------------------
* update `rework-vars` to `2.0.2`

0.1.3 - December 18, 2013
-------------------------
* add exists check

0.1.1 - December 17, 2013
-------------------------
* add returning rework plugin
* update `rework-calc` dependency, by [@micrypt](https://github.com/micrypt)

0.1.0 - December 17, 2013
-------------------------
* public release
