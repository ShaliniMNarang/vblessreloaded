/* userProfileController Implementation Start */
myApp.controller('userProfileController',
		['$scope', '$http', 'httpPost', '$location','adalAuthenticationService',
		function($scope, $http, httpPost, $location, adalService) {
	console.log("userProfileController");
	$scope.userid=$scope.userInfo.userName;
	

	$http.get("/vBless/getCampaignUser/" + $scope.userid).then(
	function(response) {
		$scope.firstname = response.data.firstname;
		$scope.lastname = response.data.lastname;
		$scope.email = response.data.email;
		$scope.phone = response.data.phone;
		$scope.paymentinfo = response.data.paymentinfo;
	});
	
	$scope.doSave = function(){
	      
	       var url = "/vBless/updateCampaignUser";
	       
	       var data = new FormData();
	       data.append('userId',$scope.userid);
	       data.append('firstname',$scope.firstname);
	       data.append('lastname',$scope.lastname);
	       data.append('phone', $scope.phone);
	       data.append('email',$scope.email);
	       data.append('paymentinfo',$scope.paymentinfo);
	       
	       var config = {
	    	   	transformRequest: angular.identity,
	    	   	transformResponse: angular.identity,
		   		headers : {
		   			'Content-Type': undefined
		   	    }
	       }
	       
	       $http.post(url, data, config).then(function (response) {
	    	   if(response.data != "FAIL")  {
	    		   $location.url("list");
	    	   }
			});
	    };
	    
	$scope.doCancel = function(){
    		$location.url("list");
    }

}]);

/* homeController Implementation Start */
myApp.controller('homeController', 
				['$scope', '$http', 'httpPost', 'operation','$location','$rootScope',
		function($scope, $http, httpPost, operation, $location, $rootScope) {
	console.log("homeController initialized");
//	$rootScope.userId=null; /**This needs to be commented out**/
	$scope.userId=$scope.userInfo.userName;
	$scope.campaigns=[];
	
	$http.get("/campaigns/").then(function(data){
		$scope.campaigns=data.data;
		$scope.campaignsFirst=$scope.campaigns[0];
		$scope.campaignsRest=$scope.campaigns.slice(1,$scope.campaigns.length);
	});
	
	$scope.heroCardCss=function(image){
		if (image !=null && image!=undefined) {
			var imgCss="background-image: url(data:image/png;base64,"+image+");"+
	   			   "height: 70%;background-position: center;background-repeat: no-repeat;background-size: cover;position: relative;";
		}
		return imgCss;
	}

}]);

/* campaignController Implementation Start */
myApp.controller('campaignController',function($scope, httpPost, operation, $location, $http,campaign,$routeParams,$rootScope) {
	console.log("campaignController initialized");
	
	
	//if a user landed here after signup, check for group and set admin property accordingly
	$rootScope.adminGroupId = "65ae1fea-6e30-4488-a8c9-b7b3cddbb779";
	var groups = $rootScope.userInfo.profile.groups;
	if(groups.includes($rootScope.adminGroupId)) {
		$rootScope.isAdmin = "true";
	}else {
		$rootScope.isAdmin = "false";
	}
	
	$scope.campaign={};
	console.log($routeParams.ID);
	if ($routeParams.ID != null && $routeParams.ID != undefined) {
		console.log("getting campaign")
		$http.get("/campaigns/"+$routeParams.ID).then(function(data){
			$scope.campaign=data.data;
			var createDate=new Date($scope.campaign.createDate);
			$scope.campaign.createDate=createDate;
			console.log(createDate);
		});
	}
	if(operation.getType()=="Add"){
			$scope.activeStatus=true;
			$scope.disableStatus=false;
			$scope.editMode=true;
	}			
	
	$scope.saveFormData = function() {
			var config= {
		            transformRequest: angular.identity,
		            headers: {'Content-Type': 'application/json'}
		        };
			console.log("saveFormData");
			
//			$scope.campaign.userId=1; /********This needs to be changed*********/
			$scope.campaign.userId=$scope.userInfo.userName;
			$http.post('/campaigns/',JSON.stringify($scope.campaign),config).then(function(response) {
				if(response.data){
					fileUpload(response.data.campaignId);
					$location.path("/list");
				}
			});	
			
			function fileUpload(campaignId){
				var fd = new FormData();
				fd.append('fileUpload', $scope.fileUpload);
				 $http.post('/campaigns/uploadfile/'+campaignId, fd, {
			            transformRequest: angular.identity,
			            headers: {'Content-Type': undefined}
			        })
			        .then(function(response){
			        		console.log("response fileUpload");
			        })
			}
			
		
	};
					
});


/* viewCampaignController Implementation Start */
myApp.controller('viewCampaignController', function($rootScope,$scope, $http,$routeParams,$location,$q) {
	console.log("viewCampaignController");
	$scope.userid=$scope.userInfo.userName;
	$scope.campaign = null;
	$scope.percentComplete=10;
	
	$http.get("/campaigns/"+$routeParams.ID)
		 .then(function(data){
			$scope.campaign=data.data;	
			console.log("campaign data1" + $scope.campaign);
			$http.get("/vBless/getFundRaised/" + $routeParams.ID)
			.then(
					function(response) {
						$scope.fundRaised = response.data;
						console.log("fund raised1 " + $scope.fundRaised);
						$scope.percentComplete=($scope.fundRaised/$scope.campaign.goal) *100;
					});			
			
	});
	
	console.log("percent complete " + $scope.percentComplete);
	
	$scope.editPage=function(){
		$location.path("/createCampaign/"+$routeParams.ID);
	}
	
});

/* campaignListController Implementation Start */
myApp.controller('campaignListController', function($scope, httpPost,
		operation, $location, $http, $rootScope) {
	console.log("campaignListController initialized");
//	$rootScope.userId=1; /**This needs to be commented out**/
	$scope.userId=$scope.userInfo.userName;
	$scope.updateFormData = function() {
		operation.setType('update');		//Mandatory
		operation.setId($scope.cid);		//Mandatory
		$location.path("/createCampaign");	//Mandatory
	};
	
	$scope.campaigns=[];
	
	$http.get("/campaigns/").then(function(data){
		$scope.campaigns=data.data;
	});
	
	
	$scope.heroCardCss=function(image){
		var imgCss="background-image: url(data:image/png;base64,"+image+");"+
	   			   "height: 50%;background-position: center;background-repeat: no-repeat;background-size: cover;position: relative;";
		return imgCss;
	}
});

/* manageCampaignController Implementation Start */
myApp.controller('manageCampaignController', function($rootScope,$scope, $http,$routeParams,$location) {
	console.log("manageCampaignController");
	$scope.userId=$rootScope.userId; 
	$scope.myVar=false;

	// hardcoding for now. Actually to get value from manageCampaigns page Suspend button.
	//$scope.campaignId=1; 
	
	$http.get("/campaigns/").then(function(data){
		$scope.campaigns=data.data;	
		console.log($scope.campaigns);
	});
	
	$scope.radioClick=function(id){
		$scope.campaignId=id;
	};

	$scope.updateCampaign=function(){
		console.log("** In manage campaign Controller: " + $scope.myVar);
		
	       var url = "http://"+$location.$$host+':'+$location.$$port+"/campaigns/updateCampaignStatus";
	       
	       var data = new FormData();
	       data.append('campaignId',$scope.campaignId);
	       
	       var config = {
	    	   	transformRequest: angular.identity,
	    	   	transformResponse: angular.identity,
		   		headers : {
		   			'Content-Type': undefined
		   	    }
	       }
	       
	       $http.post(url, data, config).then(function (response) {
	    	   if(response.data != "FAIL")  {
	    		   $location.url("list");
	    	   }
			});
		
//		$location.path("/manageCampaigns/"+$routeParams.ID);
	}
	
	$scope.editPage=function(){
		$location.path("/manageCampaigns/"+$routeParams.ID);
	}
	
});

/* updateCampaignStatusController Implementation Start 
myApp.controller('updateCampaignStatusController', function($rootScope,$scope, $http,$routeParams,$location) {
	console.log("updateCampaignStatusController");

	$scope.updateCampaign=function(){
		console.log("In update campaign Status: " + $scope.myVar);
//		$location.path("/manageCampaigns/"+$routeParams.ID);
	}
	
});*/




/* shareController Implementation Start */
myApp.controller('shareController', function($scope, $http, $location) {
	console.log("shareController");
	var id = 10;
	$scope.title = "lets hardcode title, will fetch from campaign later, For details visit";
	$scope.shareurl="http://"+$location.$$host+':'+$location.$$port+"/vBless";
//	$scope.shareurl="http://"+$location.$$host+':'+$location.$$port+"/vBless/campaignDetails/" +id;
	
});

/* logoutController Implementation Start */
myApp.controller('logoutController', 
	['$scope', '$http', 'httpPost', '$location','adalAuthenticationService',
	function($scope, $http, httpPost, $location, adalService) {
	console.log("logoutController");
	$scope.logout = function(){
		adalService.logOut();
	}
}]);


/* loginController Implementation Start */
myApp.controller('loginController', 
	['$scope', '$http', 'httpPost', '$location','adalAuthenticationService',
	function($scope, $http, httpPost, $location, adalService) {
	console.log("LoginController");
	$scope.login = function(){
		adalService.login();
		
		$rootScope.adminGroupId = "65ae1fea-6e30-4488-a8c9-b7b3cddbb779";
		var groups = $rootScope.userInfo.profile.groups;
		if(groups.includes($rootScope.adminGroupId)) {
			$rootScope.isAdmin = "true";
		}else {
			$rootScope.isAdmin = "false";
		}
		
	}
	
}]);

