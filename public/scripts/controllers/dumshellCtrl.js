// app.factory('_',['$window', function($window) {
//   return $window._; 
// }]);
app.controller('dumbshellCtrl', function ($scope, $timeout, $location,$interval,$routeParams) {
        var data ;
         $scope.Dumbanwsers = [];
    $scope.Totalarray = [];
   
       data=22/2;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
   
    for (var i = 0; i <= data; i++) {
        $scope.Totalarray.push({ id: i, Teamname: alphabet[i] });
    }
        console.log($scope.Totalarray);
        $scope.Dumbanwsers.push({ id: 1,Teamname:'a', sentence: ['The Tom and Jerry Show', 'tirumala tirupati devasthanam', 'Sachin hundred hundreds'] });
        $scope.Dumbanwsers.push({ id: 2,Teamname:'b', sentence: ['Whats App Phone calling', 'Hyderbad Biryani', 'The Indian Micheal Jackson'] });
        $scope.Dumbanwsers.push({ id: 3,Teamname:'c', sentence: ['The independence day', 'Pani Puri', 'patient in hospital'] });
        $scope.Dumbanwsers.push({ id: 4,Teamname:'d', sentence: ['Titanic','Windows 10','Maria Sharapova'] });
        $scope.Dumbanwsers.push({ id: 5,Teamname:'e', sentence: ['Narendra Modi','Albert Einstein','The common man cartoon'] });
        $scope.Dumbanwsers.push({ id: 6,Teamname:'f', sentence: ['Artificial Intelligence','Andriod Marshmallow',' valentines day'] });
        $scope.Dumbanwsers.push({ id: 7,Teamname:'g', sentence: ['Skype Video  Calling','The Revenant Movie','Dhoom Bikes'] });
        $scope.Dumbanwsers.push({ id: 8,Teamname:'h', sentence: ['The Laughing Buddha','Niagara waterfall','RK Laxman'] });
        $scope.Dumbanwsers.push({ id: 9,Teamname:'i', sentence: ['Virat Kohli Cricketer','Apple Iphone 6s','Angry Birds'] });
        $scope.Dumbanwsers.push({ id: 10,Teamname:'j', sentence: ['A.R.Rehman','Astronaut','Angry Birds'] });
        $scope.Dumbanwsers.push({ id: 11,Teamname:'k', sentence: ['shahrukh khan','Amazing Spider Man','charlie chaplin'] });
        $scope.Dumbanwsers.push({ id: 12,Teamname:'l', sentence: ['salman khan marriage','eiffel tower','silicon valley'] });
        $scope.Dumbanwsers.push({ id: 13,Teamname:'m', sentence: ['Arvind Kejriwal','www.google.com','The Moon'] });
   

   $scope.a=true;
   $scope.type=$routeParams.type==='ballon'?true:false;
   
  
    $scope.rollthedie=function(){
         $("#modal-die").modal();
          $scope.counter = 0;
         $scope.opendumbshgells();
         $scope.a=true;
    };     
   
         
    $scope.opendumbshgells = function () {
        $scope.Nowplaying = "";
        $scope.dieimage = "images/die.gif";
        $timeout(function () {
            $scope.dieimage = "images/dieempty.jpg";
            if($scope.Totalarray.length>0){
            $scope.Nowplaying = _.sample($scope.Totalarray).Teamname;
            $scope.data = _.where($scope.Dumbanwsers,{Teamname:$scope.Nowplaying});
            }
        }, 2500);

    };
    $scope.counter = 0;
    $scope.stopped = false;
    $scope.buttonText='Stop';
    var mytimeout;
    $scope.onTimeout = function(){
        $scope.counter++;
        mytimeout = $timeout($scope.onTimeout,1000);
    };
    $scope.updateList=function(){
         $timeout.cancel(mytimeout);
          console.log(_.where($scope.Dumbanwsers,{Teamname:$scope.Nowplaying})[0]);
          console.log($scope.Nowplaying);
          var index =$scope.Dumbanwsers.indexOf(_.where($scope.Dumbanwsers,{Teamname:$scope.Nowplaying})[0]);
          console.log(index);
          $scope.Dumbanwsers[index].TotalTime=$scope.counter;
          localStorage.setItem('Dumbanwsers',$scope.Dumbanwsers);
            $("#modal-timer").modal('hide');
        $scope.Totalarray= _.reject($scope.Totalarray,function(item){return item.Teamname===$scope.Nowplaying;}); 
    };
    $scope.showtimerpopup=function(){
        $("#modal-die").modal('hide');
        $("#modal-timer").modal();
    };
    $scope.starttimer=function(){
        mytimeout = $timeout($scope.onTimeout,1000);
    };
    $scope.takeAction = function(){
        if(!$scope.stopped){
            $timeout.cancel(mytimeout);
            $scope.buttonText='Resume';
        }
        else
        {
            mytimeout = $timeout($scope.onTimeout,1000);
            $scope.buttonText='Stop';
        }
            $scope.stopped=!$scope.stopped;
    }; 
    $scope.resettimer=function(){
       $scope.counter=0;
       $scope.buttonText='Stop'; 
    };
    //$scope.opendumbshgells();
    $scope.redirect = function () {
        $location.path('/');
    };
});
app.filter('formatTimer', function() {
  return function(input)
    {
        function z(n) {return (n<10? '0' : '') + n;}
        var seconds = input % 60;
        var minutes = Math.floor(input / 60);
        var hours = Math.floor(minutes / 60);
        return (z(hours) +':'+z(minutes)+':'+z(seconds));
    };
});
