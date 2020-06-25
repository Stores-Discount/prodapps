'use strict';

angular.module('prodapps')
  .controller('NavbarCtrl', ['$scope', '$stateParams', 'apps', '$state', 'teamProvider',  function ($scope, $stateParams, apps, $state, teamProvider) {
    var workcenters;

    apps.then(function (x) {
    	workcenters = x.workcenters;
    	//try if loading directly
		$scope.title = guessTitle($stateParams.workcenter)
    });

    $scope.$on('$stateChangeSuccess', function () {
    	//try if comming from another page
		$scope.title = guessTitle($stateParams.workcenter)
    });

    function guessTitle(workcenter_id) {
    	return workcenter_id && workcenters.filter(function (w) {
	    		return w.id === workcenter_id;
	    }).pop().name;
    }
    console.log(teamProvider);
    $scope.team = teamProvider;

    $scope.changeTeam = function() {
        console.log('affiche la modale de changement d equipe')
        $state.go('main.changeTeam');
    }
  }]);
