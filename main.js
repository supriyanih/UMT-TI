
require.config({
    urlArgs: '_t=' + (+new Date()),
    paths: {
        'text'          : './lib/require/require.text'
    }
});

require([
    './app',
    './core/service/serviceajax.js'
],function(){
    angular.element(document).ready(function(){
        // bootstrapping angular module
        angular.bootstrap(document, ['app']);
    });
});