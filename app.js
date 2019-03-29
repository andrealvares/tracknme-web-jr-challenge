angular.module('tracknme', ['ngRoute', 'ngMap', 'ui.materialize', 'ngStorage', 'ngResource', 'materialize']).config(config);

function config($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController',
        controllerAs: 'Home'
    })
    .otherwise({
        redirectTo: '/'
    });
}