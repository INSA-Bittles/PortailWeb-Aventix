// var userApp = angular.module('userApp', []);
//           userApp.controller('userCtrl', function ($scope, $http){
//           $http.get('http://localhost:3000/userslist').success(function(data) {
//           $scope.users = data.Utilisateurs;
//           });

//           });

//           userApp.controller('userCtrlPost', function ($scope, $http){
//           $scope.insertdata = function(){
//           $http.post('http://localhost:3000/userspush').success(function(data) {
          
//           });

//           });

var userApp = angular.module('userApp',['ngRoute','controller']);

.config(function($routeProvider){
	$routeProvider

	.when('/', {
		templateUrl : 'views/index.ejs'
	})
	.when('/', {
		templateUrl : 'views/users.ejs',
		controller: 'userCtrl'
	})
});