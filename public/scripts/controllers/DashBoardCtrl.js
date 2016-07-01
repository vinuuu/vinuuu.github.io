'use strict';
/**
 * @ngdoc function
 * @name bestbuddyApp.controller:DashBoardCtrl
 * @description
 * # DashBoardCtrl
 * Controller of the bestbuddyApp
 */
app.controller('DashBoardCtrl', function ($scope,$http) {
$http.get('/api/getslides').success(function(response){
                $scope.slides=response.data;

            });
  });
