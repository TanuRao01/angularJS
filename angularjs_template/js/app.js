var app = angular.module('myApp', ['myApp.controllers', 'ui.router', 'ngMessages'])
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'pages/home.html',
            controller: 'homeCtrl'
        })
        // nested list with custom controller
        .state('home.list', {
            url: '/list',
            templateUrl: 'pages/homeList.html',
            controller: 'homeListCtrl'
        })
        .state('about', {
            url: '/about',
            views: {
                '': { templateUrl: 'pages/about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                'columnTwo@about': {
                    templateUrl: 'pages/table-data.html',
                    controller: 'aboutCtrl'
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'pages/login.html',
            controller: 'loginCtrl'
        })
        .state('register', {
            url: '/logReg',
            templateUrl: 'pages/logReg.html',
            controller: 'logregisterCtrl'
        })
        .state('signin', {
            url: '/signin',
            templateUrl: 'pages/signin.html',
            controller: 'signInCtrl'
        })
        .state('paragraph', {
            url: '/paragraph',
            templateUrl: 'pages/paragraph.html'
        });
    $urlRouterProvider.otherwise('/home');

}]).run(['$rootScope', '$location', '$window', '$state', function($rootScope, $location, $window, $anchorScroll, $route, $state) {
    $rootScope.apiUrl = 'http://test.bhipos.bhimart.com:8081/pos/api/shopUser/'
      }]);
