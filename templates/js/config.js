/*jshint unused:false */

// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
var require = {

    baseUrl: '/js/vendor',

    // Initialize the application with the this file.
    deps: ['app/main'],

    paths: {

        app: '../app'

    }

};