

app.controller('ideaCrtl', function ($scope,$http) {


        $http.get('/api/getIdeas').success(function(response){
                $scope.totalideadata=_.sortBy(response.data).reverse();
                $scope.TotalDirectories=_.keys(_.groupBy($scope.totalideadata, 'date'));
                $scope.ideadata =(_.groupBy($scope.totalideadata, 'date'));
                $scope.aaa=$scope.TotalDirectories.length>0?$scope.TotalDirectories[0]:null;

            });
        $scope.abc = function(li){
            $scope.aaa=li;
            return true;
        }
       $scope.LoadIdeas=function (param) {
           if($scope.totalideadata){
           var count =$scope.ideadata.length;
           if($scope.totalideadata.length>=$scope.ideadata.length+20){
                for(var i=count-1;i<count+20;i++){
                    $scope.ideadata.push($scope.totalideadata[i]);
                }
           }
           else{
               for(var i=count-1;i<$scope.totalideadata.length;i++){
                    $scope.ideadata.push($scope.totalideadata[i]);
                }
           }
            }
        };

});