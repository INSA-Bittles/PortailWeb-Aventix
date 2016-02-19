
var userApp = angular.module('userApp', ['ngRoute', 'angularUtils.directives.dirPagination']);
      

    userApp.controller('userCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
        
        $http.get('https://localhost:3000/userslist')
	        .success(function(data) {
	          	$scope.users = data.Utilisateurs;
	        })
        	.error(function(err){
        		$log.error(err);
        })



        $scope.addRowAsyncAsJSON = function(){		
		$scope.users.push({ 'id':$scope.id, 'username': $scope.username, 'password':$scope.password });}
        	}]);

        userApp.controller('decideurCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
	        $http.get('https://localhost:3000/listBeneficiaire')
		        .success(function(data) {
		          	$scope.beneficiaires = data.Beneficiaires;
		          	console.log("here",data);

		        })
	        	.error(function(err){
	        		$log.error(err);
	        })

	        $scope.sort = function(keyname){
        	$scope.sortKey = keyname;   //set the sortKey to the param passed
        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
        }])

        userApp.controller('transactionCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
	        
	        $http.get('https://localhost:3000/listTransactions')
		        .success(function(data) {
		          	$scope.transactions = data.Transactions;
		          	console.log("here",data);
		        })
	        	.error(function(err){
	        		$log.error(err);
	        })
    	}])

    	userApp.controller('beneficiaireCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
	        
	        $http.get('https://localhost:3000/Solde')
		        .success(function(data) {
		          	$scope.solde = data.solde;
		          	console.log("here",data);
		        })
	        	.error(function(err){
	        		$log.error(err);
	        })
    	}])


        userApp.controller('ContactFormCtrl',['$scope', '$http', '$log', 
        	function ($scope, $http, $log) {
        		
	    		
	        $scope.sendMail = function(){
	        	var data = ({
	    				'contactName' : $scope.contactName,
	    				'contactEmail' : $scope.contactEmail,
	    				'contactSubject' : $scope.contactSubject,
	    				'contactMessage' : $scope.contactMessage,
	       		 });	


	      	$http.post('/contact-form', data)
	        .success(function(data) {
	        	console.log("here8",data)
	        }).error(function(err) {
	          $log.error(err);
	        
	    	});
       		}
       }]);

        userApp.controller('pushCtrl',['$scope', '$http', '$log', 
        	function ($scope, $http, $log) {
        		
	    		
	        $scope.pushData = function(){
	        	var data = ({
	    				'nom' : $scope.nom,
	    				'prenom' : $scope.prenom,
	    				'adresse' : $scope.adresse,
	    				'cp' : $scope.cp,
	    				'email' : $scope.email,
	    				'numero' : $scrope.numero,
	    				'idDecideur' : $scope.idDecideur
	       		 });	


	      	$http.post('/pushData', data)
	        .success(function(data) {
	        	console.log("here8",data)
	        }).error(function(err) {
	          $log.error(err);
	        
	    	});
       		}
       }])

        userApp.controller('carteCtrl',['$scope', '$http', '$log', 
        	function ($scope, $http, $log) {
        		
	    		
	        $scope.pushCarte = function(){
	        	var data = ({ 'nombreCarte' : $scope.nombreCarte});
	    		console.log("here9",$scope.nombreCarte)
	    		for(var i=0;i<$scope.nombreCarte;i++){
	    			$http.post('/pushData2', data)
	    			.success(function(data) {
	    			console.log("here8",data)
	    			}).error(function(err) {
	    			$log.error(err)
	       		 });
	       		 }	

       }}]);

	      	// $http.post('/pushData2', data)
	       //  .success(function(data) {
	       //  	console.log("here8",data)
	       //  }).error(function(err) {
	       //    $log.error(err);
	        
	    	// });
      //  		}
      //  }]);

      // 		$scope.insertdata = function(){
      // 		$scope.users.push({ 'id':$scope.id, 'username': $scope.username, 'password':$scope.password });
      // 		$http.post("http://localhost:3000/usersSaved",{'id':$scope.id,'username':$scope.username,'password':$scope.password}
      // 		).success(function(data,status,headers,config){
      // 		console.log("Données Insérées");
   			// })}});

     
        
		
		// $scope.pushData = function($params){
		// $http.post('http://localhost:3000/pushData',{'id':$params.id,'username':$params.username,'password':$params.password})
		// 	.success(function(data){
		// 		$log.info(data);
  //     			console.log("Données Insérées");
  //     		})
  //     		.error(function(err){
  //     			$log.error(err)
  //     		})
  //     	}

      	
		// Writing it to the server
				
		// var dataObj = {
		// 		id : $scope.id,
		// 		username : $scope.username,
		// 		password : $scope.password
		// };	
		// var res = $http.post('http://localhost:3000/usersSaved');
		// res.success(function(data, status, headers, config) {
		// 	$scope.message = data;
		// });
		// res.error(function(data, status, headers, config) {
		// 	alert( "failure message: " + JSON.stringify({data: data}));
		// });		
		// // Making the fields empty
		// //
		// $scope.id='';
		// $scope.username='';
		// $scope.password='';
	
// });
// @RequestMethodapping(value = "https://hello-angularjs.appspot.com/angularjs-http-service-ajax-post-json-data-code-example", method = RequestMethod.GET)
// public ModelAndView httpServicePostJSONDataExample( ModelMap model ) {
//   return new ModelAndView("httpservice_post_json");
// }

// @RequestMapping(value = "/saveusers_jsonn", method = RequestMethod.POST) 
// public  @ResponseBody String saveCompany_JSON( @RequestBody Users users )   {   
//   //
//   // Code processing the input parameters
//   //  
//   return "JSON: Id: " + users.getId() + ", Utilisateurs: " + users.getUsername() + ", Password: " + users.getPassword();
// }

// package com.vitalflux.core;

// public class Users {
	
// 	private int id;
// 	private String username;
// 	private String password;
// 	public int getId() {
// 		return id;
// 	}
// 	public void setId(int id) {
// 		this.id = id;
// 	}
// 	public String getUsername() {
// 		return username;
// 	}
// 	public void setUsername(String username) {
// 		this.username = username;
// 	}
// 	public String getpassword() {
// 		return password;
// 	}
// 	public void setpassword(String password) {
// 		this.password = password;
// 	}
// }
// 	
