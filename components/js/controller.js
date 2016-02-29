
var userApp = angular.module('userApp', ['ngRoute','angularUtils.directives.dirPagination','ngFlash']);
      

  //   userApp.controller('userCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
        
  //       $http.get('https://localhost:3000/userslist')
	 //        .success(function(data) {
	 //          	$scope.users = data.Utilisateurs;
	 //        })
  //       	.error(function(err){
  //       		$log.error(err);
  //       })



  //       $scope.addRowAsyncAsJSON = function(){		
		// $scope.users.push({ 'id':$scope.id, 'username': $scope.username, 'password':$scope.password });};
        
  //       }]);

        // userApp.controller('decideurCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
		    
        // }]);
		

        userApp.controller('transactionCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
	        
	        $http.get('https://localhost:3000/listTransactions')
		        .success(function(data) {
		          	$scope.transactions = data.Transactions;
		          	console.log("here",data);
		        })
	        	.error(function(err){
	        		$log.error(err);
	        })
    	}]);

    	userApp.controller('beneficiaireCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
	        
		    
		        $http.get('https://localhost:3000/Solde')
			        .success(function(data) {
			          	$scope.soldes = data.Soldes;
			          	console.log("here",data);
			        })
		        	.error(function(err){
		        		$log.error(err);
		        })
	    	
    	}]);

    	userApp.controller('lastTransactionCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log){
	        
	        $http.get('https://localhost:3000/listLastTransactions')
		        .success(function(data) {
		          	$scope.transactions = data.DernieresTransactions;
		          	console.log("here",data);
		        })
	        	.error(function(err){
	        		$log.error(err);
	        })
    	}]);


        userApp.controller('ContactFormCtrl',['$scope', '$http', '$log',
        	function ($scope, $http, $log) {
        		
	    		
	        $scope.sendMail = function(){
	        	console.log($scope.contact)
		      	$http.post('/contact-form', $scope.contact)
		        .success(function(response) {
		        	console.log("here10",response);
		        }).error(function(err) {
		          $log.error(err);
		        
		    	});
		    	$http.post('/contact-form2', $scope.contact)
		        .success(function(response) {
		        	console.log("here10",response);
		        }).error(function(err) {
		          $log.error(err);
		        
		    	});
       		};
       }]);

        userApp.controller('FlashCtrl',['$rootScope','$scope', 'Flash',
        	function ($rootScope, $scope, Flash) {

	         $scope.successAlert = function () {
	    	var message = '<strong>Votre message a bien été envoyé !</strong>';
	    	var id = Flash.create('success', message, 0, {class: 'successMsg', id: 'successMsg'}, true);};
    	
    	}]);


        userApp.controller('pushCtrl',['$rootScope','$scope', '$http', '$log', 'Flash',
        	function ($rootScope,$scope, $http, $log,Flash) {
        		
        	var refresh = function(){  
		        $http.get('/listBeneficiaire')
			        .success(function(data) {
			          	$scope.beneficiaires = data.Beneficiaires;
			          	console.log("here",data);
			          	$scope.beneficiaire = "";
			          	
			        })
		        	.error(function(err){
		        		$log.error(err);
		        });
	    	};
		    refresh();
	    	 
		        $scope.pushData = function(response){
		        	console.log(response)

			      	$http.post('/pushData', $scope.beneficiaire)
			        .success(function(response) {
			        	console.log("here9",response);
			        	
			        	// for ( var i in $scope.beneficiaires ){
			        	// 	if ( $scope.beneficiaires[i].idBeneficiaire == $scope.beneficiaire.idBeneficiaire) 
			        	// 	{
			        	// 		$scope.beneficiaires[i] = $scope.beneficiaire;
			        	// 	}
			        	// }
			        	console.log("la",$scope.beneficiaire );
			        	// $scope.beneficiaires.push( $scope.beneficiaire );
			        	console.log("la1",$scope.beneficiaire );
			        	
			        	refresh();
			        }).error(function(err) {
			          $log.error(err);
			        
			    	});
	       		};
	       		
	       

       		$scope.successAlert2 = function () {
        	var message = '<strong>Vous avez ajouté un bénéfiaire.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg2', id: 'successMsg2'}, true);};

        	  

	        $scope.sort = function(keyname){
        	$scope.sortKey = keyname;   //set the sortKey to the param passed
        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
    		};

    		$scope.remove = function(idBeneficiaire){
    			console.log(idBeneficiaire);
    			$http.delete('/listBeneficiaire/' + idBeneficiaire).success(function(response){
    				refresh();
    			});
    		};

    		$scope.edit = function(idBeneficiaire){
    			console.log(idBeneficiaire);
    			$http.get('/listBeneficiaire/' + idBeneficiaire).success(function(response){
    				$scope.beneficiaire = response;

    			});
    		};

    		$scope.update = function(){
    			console.log($scope.beneficiaire.idBeneficiaire);
    			$http.put('/listBeneficiaire/' + $scope.beneficiaire.idBeneficiaire, $scope.beneficiaire).success(function(response){
    				refresh();
    			});
    		};

    		$scope.deselect = function(){
    			$scope.beneficiaire = "";
    		};

    		$scope.successAlert4 = function () {
        	var message = '<strong>Le bénéficiaire a bien été modifié.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg4', id: 'successMsg4'}, true);};

    		$scope.successAlert5 = function () {
        	var message = '<strong>Le bénéficiaire a bien été supprimé.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg5', id: 'successMsg5'}, true);};

        	$http.get('https://localhost:3000/Solde')
			        .success(function(data) {
			          	$scope.soldes = data.Soldes;
			          	console.log("here",data);
			        })
		        	.error(function(err){
		        		$log.error(err);
		        });
       }]);

		userApp.controller('soldeCtrl',['$rootScope','$scope', '$http', '$log', 'Flash',
        	function ($rootScope,$scope, $http, $log,Flash) {

    	$scope.updateSolde = function(){
			console.log($scope.beneficiaire.NumeroCarte);
			$http.put('/listBeneficiaireS/' + $scope.beneficiaire.NumeroCarte, $scope.beneficiaire).success(function(response){
				refresh();
			});
		};

		$scope.removeCarte = function(NumeroCarte){
    			console.log(NumeroCarte);
    			$http.delete('/listCartesR/' + NumeroCarte).success(function(response){
    			});
    	};


        $scope.deselect2 = function(){
    			$scope.beneficiaire = "";
    		};

    	$scope.successAlert6 = function () {
        	var message = '<strong>Le solde du bénéficiaire a bien été modifié.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg6', id: 'successMsg6'}, true);};

        $scope.successAlert7 = function () {
        	var message = '<strong>La carte du bénéficiaire a bien été supprimé.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg6', id: 'successMsg6'}, true);};	
        
        }]);
		
		userApp.controller('userCtrl',['$rootScope','$scope', '$http', '$log', 'Flash',
        	function ($rootScope,$scope, $http, $log,Flash) {

        $scope.removeUser = function(idBeneficiaire){
    			console.log(idBeneficiaire);
    			$http.delete('/listUsersR/' + idBeneficiaire).success(function(response){
    			});
    	};

    	$scope.successAlert8 = function () {
        	var message = '<strong>La compte du bénéficiaire a bien été supprimé.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg6', id: 'successMsg6'}, true);};

    	}]);

        userApp.controller('carteCtrl',['$rootScope','$scope', '$http', '$log', 'Flash', 
        	function ($rootScope,$scope, $http, $log, Flash) {
        		
	    		
	        $scope.pushCarte = function(){
	        	var data = ({'solde' : $scope.solde});
	    		console.log("here9",$scope.solde)
	    		// for(var i=0;i<$scope.nombreCarte;i++){
	    			$http.post('/pushData2', data)
	    			.success(function(data) {
	    			console.log("here8",data)
	    			}).error(function(err) {
	    			$log.error(err)
	       		 });
       		 	// }
			};

			$scope.successAlert = function () {
        	var message = '<strong>Vous avez ajouté une carte</strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg', id: 'successMsg'}, true);};

        	$http.get('https://localhost:3000/listeCartes')
		        .success(function(data) {
		          	$scope.cartes = data;
		          	console.log("here",data);
		        })
	        	.error(function(err){
	        		$log.error(err);
	        })
    	}]);

        userApp.controller('passwordCtrl',['$rootScope','$scope', '$http', '$log', 'Flash', 
        	function ($rootScope,$scope, $http, $log, Flash) {
        		
	    		
	        $scope.updatePassword = function(){
	        	console.log($scope.user.idBeneficiaire);
	        	$http.put('/listUsersB/' + $scope.user.idBeneficiaire, $scope.user).success(function(response){
    				console.log("ok");
    			});
	        };

    		$scope.updatePassword2 = function(){
	        	console.log($scope.user.idDecideur);
	        	$http.put('/listUsersD/' + $scope.user.idDecideur, $scope.user).success(function(response){
    				console.log("ok");
    			});
	        };

    		$scope.updatePassword3 = function(){
	        	console.log($scope.user.idAffilie);
	        	$http.put('/listUsersA/' + $scope.user.idAffilie, $scope.user).success(function(response){
    				console.log("ok");
    			});
    		};

    		$scope.updatePassword4 = function(){
	        	console.log($scope.user.idAdmin);
	        	$http.put('/listUsersAdmin/' + $scope.user.idAdmin, $scope.user).success(function(response){
    				console.log("ok");
    			});
    		};
	    		
	    			// $http.put('/password', data)
	    			// .success(function(data) {
	    			// console.log("here1",data);
	    			// }).error(function(err) {
	    			// $log.error(err)
	       // 		 });
			

			$scope.successAlert3 = function () {
        	var message = '<strong>Votre mot de passe a été modifié.</strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg3', id: 'successMsg3'}, true);};


    	}]);
		
		userApp.controller('codeCtrl',['$rootScope','$scope', '$http', '$log', 'Flash', 
        	function ($rootScope,$scope, $http, $log, Flash) {


        $scope.updateCode = function(){
        	console.log($scope.beneficiaire.NumeroCarte);
        	$http.put('/listCodeCarte/' + $scope.beneficiaire.NumeroCarte, $scope.beneficiaire).success(function(response){
				console.log("ok");
			});
		};

		$scope.successAlertCode = function () {
        	var message = '<strong>Votre code a été modifié.</strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsgCode', id: 'successMsgCode'}, true);};

		}]);

		userApp.controller('mailCtrl',['$rootScope','$scope', '$http', '$log', 'Flash', 
        	function ($rootScope,$scope, $http, $log, Flash) {

        var refresh = function(){  
		        $http.get('/listBeneficiaireAll')
			        .success(function(data) {
			          	$scope.beneficiaires = data.Beneficiaires;
			          	console.log("here",data);
			          	$scope.beneficiaire = "";
			          	
			        })
		        	.error(function(err){
		        		$log.error(err);
		        });
	    	};
		    refresh();
	    	 
		        $scope.pushData2 = function(){
		        	console.log($scope.beneficiaire)

			      	$http.post('/pushData3', $scope.beneficiaire)
			        .success(function(response) {
			        	console.log("here9",response);
			        	refresh();
			        }).error(function(err) {
			          $log.error(err);
			        
			    	});
	       		};
	       		
	       

       		$scope.successAlert2 = function () {
        	var message = '<strong>Vous avez ajouté un bénéfiaire.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg2', id: 'successMsg2'}, true);};

        	  

	        $scope.sort = function(keyname){
        	$scope.sortKey = keyname;   //set the sortKey to the param passed
        	$scope.reverse = !$scope.reverse; //if true make it false and vice versa
    		};

    		$scope.remove3 = function(idBeneficiaire){
    			console.log(idBeneficiaire);
    			$http.delete('/listBeneficiaireAll/' + idBeneficiaire).success(function(response){
    				refresh();
    			});
    		};

    		$scope.edit3 = function(idBeneficiaire){
    			console.log(idBeneficiaire);
    			$http.get('/listBeneficiaireAll/' + idBeneficiaire).success(function(response){
    				$scope.beneficiaire = response;

    			});
    		};

    		$scope.update3 = function(){
    			console.log($scope.beneficiaire.idBeneficiaire);
    			$http.put('/listBeneficiaireAll/' + $scope.beneficiaire.idBeneficiaire, $scope.beneficiaire).success(function(response){
    				refresh();
    			});
    		};

    		$scope.deselect3 = function(){
    			$scope.beneficiaire = "";
    		};

    		$scope.successAlert4 = function () {
        	var message = '<strong>Le bénéficiaire a bien été modifié.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg4', id: 'successMsg4'}, true);};

    		$scope.successAlert5 = function () {
        	var message = '<strong>Le bénéficiaire a bien été supprimé.<strong>';
        	var id = Flash.create('success', message, 0, {class: 'successMsg5', id: 'successMsg5'}, true);};

        	$http.get('https://localhost:3000/listEmail')
			        .success(function(response) {
			          	$scope.emails = response;
			          	console.log("here",$scope.emails);
			        })
		        	.error(function(err){
		        		$log.error(err);
		        });

		    $scope.removeMail = function(ID){
    			console.log(ID);
    			$http.delete('/listEmail/' + ID).success(function(response){
   					console.log("Mail supprimé");
    			});
    		};
			$scope.successAlertMail = function () {
        		var message = '<strong>Le mail a bien été supprimé.<strong>';
        		var id = Flash.create('success', message, 0, {class: 'successMsgMail', id: 'successMsgMail'}, true);};




        }]);


   // }]);

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
