(function(angular, undefined) {
  angular.module("webapp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
		"admin"
	],
	"I18N": {
		"pt": {}
	}
})

;
})(angular);