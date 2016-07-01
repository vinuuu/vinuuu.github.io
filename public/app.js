'use strict';

/**
 * @ngdoc overview
 * @name bestbuddyApp
 * @description
 * # bestbuddyApp
 *
 * Main module of the application.
 */
var app=angular
    .module('bestbuddyApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.sortable',
        'door3.css',
        'ngFileUpload',
        'ui.bootstrap',
        'infinite-scroll',
        'ngFileUpload'
    ])
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/DashBoard.html',
                controller: 'DashBoardCtrl'
            })
            .when('/idea/', {
                templateUrl: 'views/IdeaView.html',
                controller: 'ideaCrtl'
            })
            .when('/IdeaInsert/', {
                templateUrl: 'views/IdeaInsert.html',
                controller: 'ideaInsertCtrl'
            })
            .when('/games/', {
                templateUrl: 'views/Games.html',
                controller: 'serviceCtrl'
            })
            .when('/playgames/', {
                templateUrl: 'views/dumbshellview.html',
                controller: 'dumbshellCtrl'
            })
            .when('/contact/', {
                templateUrl: 'views/contact.html',
                controller: 'contactCtrl'
            })
            .when('/contact2/', {
                templateUrl: 'views/contact2.html',
                controller: 'contact2Ctrl'
            })
            .when('/404/', {
                templateUrl: 'views/404.html',
                controller: '404Ctrl'
            })
            .when('/coming-soon/', {
                templateUrl: 'views/coming-soon.html',
                controller: 'coming-soonCtrl'
            })
            .when('/blog/', {
                templateUrl: 'views/blog.html',
                controller: 'blogCtrl'
            })
            .when('/blogtwo/', {
                templateUrl: 'views/blogtwo.html',
                controller: 'blogtwoCtrl'
            })
            .when('/blogone/', {
                templateUrl: 'views/blogone.html',
                controller: 'blogoneCtrl'
            })
            .when('/blogthree/', {
                templateUrl: 'views/blogthree.html',
                controller: 'blogthreeCtrl'
            })
            .when('/blogfour/', {
                templateUrl: 'views/blogfour.html',
                controller: 'blogfourCtrl'
            })
            .when('/blogdetails/', {
                templateUrl: 'views/blogdetails.html',
                controller: 'blogdetailsCtrl'
            })
            .when('/portfolio/', {
                templateUrl: 'views/portfolio.html',
                controller: 'portfolioCtrl'
            })
            .when('/portfoliofour/', {
                templateUrl: 'views/portfoliofour.html',
                controller: 'portfoliofourCtrl'
            })
            .when('/portfolioone/', {
                templateUrl: 'views/portfolioone.html',
                controller: 'portfoliooneCtrl'
            })
            .when('/gallery/', {
                templateUrl: 'views/portfoliotwo.html',
                controller: 'portfolioCtrl'
            })
            .when('/portfoliothree/', {
                templateUrl: 'views/portfoliothree.html',
                controller: 'portfoliothreeCtrl'
            })
             .when('/portfolio-details/', {
                templateUrl: 'views/portfolio-details.html',
                controller: 'portfolio-detailsCtrl'
            })
              .when('/shortcodes/', {
                templateUrl: 'views/shortcodes.html',
                controller: 'shortcodesCtrl'
            })
            .when('/login', {
              templateUrl: 'views/login.html',
              controller: 'LoginCtrl'
            })
            .when('/registartion', {
              templateUrl: 'views/registartion.html',
              controller: 'RegistartionCtrl',
              controllerAs: 'registartion'
            })
            .when('/album', {
              templateUrl: 'views/album.html',
              controller: 'AlbumCtrl',
              controllerAs: 'album'
            })
            .when('/performance', {
              templateUrl: 'views/performance.html',
              controller: 'PerformanceCtrl',
              controllerAs: 'performance'
            })
            .when('/timeline', {
              templateUrl: 'views/timeline.html',
              controller: 'TimelineCtrl',
              controllerAs: 'timeline'
            })
            .when('/tilesAlbum', {
              templateUrl: 'views/tilesalbum.html',
              controller: 'TilesalbumCtrl',
              controllerAs: 'tilesAlbum'
            })
            .when('/feedback', {
              templateUrl: 'views/feedback.html',
              controller: 'FeedbackCtrl',
              controllerAs: 'feedback'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).factory('_', function() {
        return window._;
    });
