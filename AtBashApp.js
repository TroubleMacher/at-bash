var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function (angular, ablib) {
	//console.log(angular);

	encriptions = [
		{name: "א\"ת ב\"ש", ef: ablib.atBash},
		{name: "א\"ל ב\"ם", ef: ablib.alBam}
	];

	var abapp = angular.module("atbash", []);
	// assign encription controller
	abapp.controller("encriptor", function($scope){
		// init
		$scope.srcTxt='';
		var encript = ablib.atBash;
		// -----------------
		$scope.encriptions = encriptions;
		$scope.encriptChange = function() {
			console.log(encriptions);
			console.log($scope.encription);
			encript = encriptions[$scope.encription].ef;
		};
		$scope.destTxt = function () {
			return encript($scope.srcTxt);
		};
	});

}(window.angular, window.AtBashLib));

}
