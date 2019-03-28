angular.module('tracknme', ['ngRoute', 'ngMap', 'ui.materialize', 'ngStorage', 'ngResource']).config(config);

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