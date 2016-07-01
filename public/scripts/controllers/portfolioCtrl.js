'use strict';
/**
 * @ngdoc function
 * @name bestbuddyApp.controller:portfolioCtrl
 * @description
 * # portfolioCtrl
 * Controller of the bestbuddyApp
 */
app.controller('portfolioCtrl', function ($scope, $http,Upload,$timeout,fileUpload) {
  $scope.dataset = [];
  $scope.params = {};
  $scope.DirectoryData = [];
  $scope.LoadData = function (folder, startIndex, endIndex,MainFolderName) {
    $scope.params.FolderList = folder;
    $scope.params.startIndex = startIndex;
    $scope.params.endIndex = endIndex;
    $scope.params.MainFolderName = MainFolderName||($scope.params.MainFolderName===undefined?'General':$scope.params.MainFolderName);
    $http.get('/api/getFiles', { params: $scope.params }).success(function (response) {
      if (_.where($scope.DirectoryData, { DirectoryName: response.DirectoryName }).length === 0) {
        $scope.DirectoryData.push({ DirectoryName: response.DirectoryName, Data: response.Data });
      }
      else {
        _.each($scope.DirectoryData, function (item) {
          if (item.DirectoryName === response.DirectoryName) {
            item.Data = item.Data.concat(response.Data);
            item.Data = _.uniq(item.Data);
          }
        });
      }
      $scope.TotalDir = response.TotalDir;
      $scope.count = response.Total;
      $scope.TotalDirectories=response.TotalDirectories;
     // $scope.abc();
    });
  };
  $http.get('/api/getDirs').success(function(response){});
  $scope.$watch('files', function (files) {
    $scope.formUpload = false;
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files = files = [files];
        });
        return;
      }
      for (var i = 0; i < files.length; i++) {
        Upload.imageDimensions(files[i]).then(function (d) {
          $scope.d = d;
        });
        $scope.errorMsg = null;
        (function (f) {
          $scope.uploadFiles(f, true);
        })(files[i]);
      }
    }
  });
  $scope.LoadData(0, 1, 5);
  $scope.nodata = true;
  $scope.uploadFiles = function (files) {
      uploadUsing$http(files);
};
function uploadUsing$http(file) {
    var uploadUrl = "/api/uploadmultipleImage";
    Upload.imageDimensions(file).then(function(d) {
      if(d.height>1500 || d.width > 1500){
        Upload.resize(file, '1000', '1000').then(function(a){
           fileUpload.uploadFileToUrl(a, uploadUrl,$scope.params.MainFolderName).then(function(res){
          });
        });
      }
      else{
        fileUpload.uploadFileToUrl(file, uploadUrl,$scope.params.MainFolderName).then(function(res){
        });
      }
    });


  }
  $scope.AddMore = function () {
    if ($scope.count > $scope.params.endIndex) {
      $scope.LoadData($scope.params.FolderList, ($scope.params.endIndex + 1), ($scope.params.endIndex + 5) + 1);
    }
    else {
      if ($scope.TotalDir > $scope.params.FolderList + 1) {
        $scope.params.FolderList = $scope.params.FolderList + 1;
        $scope.LoadData($scope.params.FolderList, 1, 5);
      }
      else
        $scope.nodata = false;
    }
  };
$scope.MainFolderClick=function(name){
  $scope.DirectoryData=[];
  $scope.LoadData(0, 1, 5,(name||'General'));
};

});
app.filter('pathChanger', function () {
  return function (input) {
    return input.replace(/public/g, "");
  };
});
app.filter('dateAgo', function () {
  return function (input) {
    return moment(input).fromNow();
  };
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

app.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl,MainFolderName){
        var fd = new FormData();
        fd.append('file', file);
        fd.append('MainFolderName',MainFolderName);
        return $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        });

    }
}]);
