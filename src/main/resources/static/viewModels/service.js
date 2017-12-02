function previewFile() {
	var preview = document.querySelector('img'); // selects the query named
	// img
	var file = document.querySelector('input[type=file]').files[0]; // sames as
	// here
	var reader = new FileReader();

	reader.onloadend = function() {
		preview.src = reader.result;
		preview.style.display = "block"
	}

	if (file) {
		reader.readAsDataURL(file); // reads the data as a URL
	} else {
		preview.src = "";
	}
};


myApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myApp.service('httpPost', [ '$http', function($http) {
	this.postCall = function(fd, postUrl) {
		console.log("postCall");
		$http.post(postUrl, fd, {
			transformRequest : angular.identity,
			headers : {
				'Content-Type' : undefined
			}
		}).then(function(response) {
			console.log("response")
		})
	}
} ]);
myApp.service('operation', function() {
	var type = "Add";
	var id = null;

	return {
		getType : function() {
			return type;
		},
		setType : function(value) {
			type = value;
		},
		getId : function() {
			return type;
		},
		setId : function(value) {
			type = value;
		}
	}
});


myApp.service('campaign', function() {
	function Campaign(){
		this.setCampaignId=function(campaignId){
			this.campaignId=campaignId;
		};
		this.getCampaignId=function(){
			return this.campaignId;
		};
		this.setUserId=function(userId){
			this.userId=userId;
		};
		this.getUserId=function(){
			return this.userId;
		};
		this.setCampaignTitle=function(campaignTitle){
			this.campaignTitle=campaignTitle;
		};
		this.getCampaignTitle=function(){
			return this.campaignTitle;
		};
		this.setCampaignDescription=function(campaignDescription){
			this.campaignDescription=campaignDescription;
		};
		this.getCampaignDescription=function(){
			return this.campaignDescription;
		};
		this.setBlurb=function(blurb){
			this.blurb=blurb;
		};
		this.getBlurb=function(){
			return this.blurb;
		};
		this.setImageBlob=function(imageBlob){
			this.imageBlob=imageBlob;
		};
		this.getImageBlob=function(){
			return this.imageBlob;
		};
		this.setCreateDate=function(createDate){
			this.CreateDate=createDate;
		};
		this.getCreateDate=function(){
			return this.createDate;
		};
		this.setSuspendDate=function(suspendDate){
			this.suspendDate=suspendDate;
		};
		this.getSuspendDate=function(){
			return this.suspendDate;
		};
		this.setCategory=function(category){
			this.category=category;
		};
		this.getCategory=function(){
			return this.category;
		};
		this.setDuration=function(duration){
			this.duration=duration;
		};
		this.getDuration=function(){
			return this.duration;
		};
		this.setGoal=function(goal){
			this.goal=goal;
		};
		this.getGoal=function(){
			return this.goal;
		};
		this.setCity=function(city){
			this.city=city;
		};
		this.getCity=function(){
			return this.city;
		};
		this.setCountry=function(country){
			this.country=country;
		};
		this.getCountry=function(){
			return this.country;
		};
		this.setActive=function(active){
			this.active=active;
		};
		this.getActive=function(){
			return this.active;
		};
	}
	
	return new Campaign();
});
