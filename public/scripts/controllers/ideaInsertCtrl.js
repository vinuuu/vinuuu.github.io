app.controller('ideaInsertCtrl',function($scope,$http,$location){
    $scope.insertidea=function(row){
        var datenow= moment().format("MM-DD-YYYY");
        $http.post('/api/insertIdea',{name:row.name,idea:row.idea,date:datenow}).success(function () {
            $location.path("/idea");
        });
    };
});