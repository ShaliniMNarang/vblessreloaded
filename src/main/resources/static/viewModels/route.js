myApp.config(function($routeProvider, $qProvider) {
	$routeProvider.when("/", {
		templateUrl : "views/home.html",
		controller : "homeController"
	}).when("/list", {
		templateUrl : "views/campaignList.html",
		controller : "campaignListController"
	}).when("/userProfile", {
		templateUrl : "views/userProfile.html",
		controller : "userProfileController"
	}).when("/share", {
		templateUrl : "views/share.html",
		controller : "shareController"			
	}).when("/viewCampaign/:ID", {
		templateUrl : "views/viewCampaign.html",
		controller : "viewCampaignController"
			
	}).when("/about", {
		templateUrl : "views/about.html"

			//added this for create campaign UI and java backend
	}).when("/createCampaign", {
		templateUrl : "views/createCampaign.html",
		controller : "campaignController"
	}).when("/createCampaign/:ID", {
		templateUrl : "views/createCampaign.html",
		controller : "campaignController"
	});
	
	$qProvider.errorOnUnhandledRejections(false);
});