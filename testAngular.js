var userApp = angular.module('userApp', ['']).filter('Utilisateur', function (){});
      userApp.controller('userCtrl', function ($scope, $http){
        $http.get('http://localhost:3000/userslist').success(function(data) {
          $scope.users = data.Utilisateurs;
        });

        $scope.addRowAsyncAsJSON = function(){		
		$scope.companies.push({ 'id':$scope.id, 'username': $scope.username, 'password':$scope.password });
		// Writing it to the server
		//		
		var dataObj = {
				id : $scope.id,
				username : $scope.username,
				password : $scope.password
		};	
		var res = $http.post('/saveusers_json', dataObj);
		res.success(function(data, status, headers, config) {
			$scope.message = data;
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		
		// Making the fields empty
		//
		$scope.id='';
		$scope.username='';
		$scope.password='';
	};
}]);

@RequestMapping(value = "https://hello-angularjs.appspot.com/angularjs-http-service-ajax-post-json-data-code-example", method = RequestMethod.GET)
public ModelAndView httpServicePostJSONDataExample( ModelMap model ) {
  return new ModelAndView("httpservice_post_json");
}

@RequestMapping(value = "/saveusers_jsonn", method = RequestMethod.POST) 
public  @ResponseBody String saveCompany_JSON( @RequestBody Utilisateurs utilisateurs )   {   
  //
  // Code processing the input parameters
  //  
  return "JSON: Id: " + Utilisateurs.getId() + ", Utilisateurs: " + Utilisateurs.getUsername() + ", Password: " + Utilisateurs.getPassword();
}

package com.vitalflux.core;

public class Utilisateurs {
	
	private int id;
	private String username;
	private String password;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getpassword() {
		return password;
	}
	public void setpassword(String password) {
		this.password = password;
	}
}
	