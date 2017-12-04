/* userProfileController Implementation Start */
myApp.controller('userProfileController', function($scope, $http, httpPost, $location) {
	console.log("userProfileController");
	$scope.userid="1";
	

	$http.get("/vBless/vBless/getCampaignUser/" + $scope.userid).then(
	function(response) {
		$scope.firstname = response.data.firstname;
		$scope.lastname = response.data.lastname;
		$scope.email = response.data.email;
		$scope.phone = response.data.phone;
		$scope.paymentinfo = response.data.paymentinfo;
	});
	
	$scope.doSave = function(){
	      
	       var url = "http://"+$location.$$host+':'+$location.$$port+"/vBless/vBless/updateCampaignUser";
	       
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

});

/* homeController Implementation Start */
myApp.controller('homeController', function($scope, httpPost,
		operation, $location, $http, $rootScope) {
	console.log("homeController initialized");
	$rootScope.userId=null; /**This needs to be commented out**/
	$scope.campaigns=[];
	
	$http.get("/campaigns/").then(function(data){
		$scope.campaigns=data.data;
		$scope.campaignsFirst=$scope.campaigns[0];
		$scope.campaignsRest=$scope.campaigns.slice(1,$scope.campaigns.length);
	});
	
	$scope.heroCardCss=function(image){
		var imgCss="background-image: url(data:image/png;base64,"+image+");"+
	   			   "height: 70%;background-position: center;background-repeat: no-repeat;background-size: cover;position: relative;";
		return imgCss;
	}

});

/* campaignController Implementation Start */
myApp.controller('campaignController',function($scope, httpPost, operation, $location, $http,campaign,$routeParams) {
	console.log("campaignController initialized");
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
			
			$scope.campaign.userId=1; /********This needs to be changed*********/
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
myApp.controller('viewCampaignController', function($rootScope,$scope, $http,$routeParams,$location) {
	console.log("viewCampaignController");
	$scope.userId=$rootScope.userId; 
	$scope.percentComplete=50;
	$http.get("/campaigns/"+$routeParams.ID).then(function(data){
		$scope.campaign=data.data;		
		$scope.raised=$scope.campaign.goal*$scope.percentComplete/100;
	});
	
	$scope.editPage=function(){
		$location.path("/createCampaign/"+$routeParams.ID);
	}
	
});

/* campaignListController Implementation Start */
myApp.controller('campaignListController', function($scope, httpPost,
		operation, $location, $http, $rootScope) {
	console.log("campaignListController initialized");
	$rootScope.userId=1; /**This needs to be commented out**/
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

	// hardcoding for now. Actually to get value from manageCampaigns page Suspend button.
	$scope.campaignId=1; 
	
	$http.get("/campaigns/").then(function(data){
		$scope.campaigns=data.data;		
	});
	
	$scope.xyzClick=function(x){
		console.log("$$$ Button Click : ");
		console.log(x);
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
myApp.controller('logoutController', function($scope, $http, $location) {
	console.log("logoutController");
});