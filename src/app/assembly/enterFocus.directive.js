'use strict';

angular.module('prodapps').directive('enterFocus', [function () {
	return {
		restrict: 'A',
		scope: { scans:'=enterFocus' },
		link: function ($scope, el) {
			$scope.buildQuery = function (id) {
				var type, line, column, out;
				[type, line, column] = id.split('-');
				line = parseInt(line);
				column = parseInt(column);

				if (type === 'scan')
				{
					if ($scope.scans[line][column+1] !== undefined) {
						out = [type, line,column+1];
					} else {
						out = ['casier', line, 0];
					}
				} else {
					//on était sur un casier, on regarde si ya une ligne apres
					if ($scope.scans[line+1] !== undefined)
						out = ['scan', line+1, 0];
					else
						return null;
				}
				return '#'+out.join('-');
			};

			el.bind("keydown keypress", function (event) {
				if(event.which === 13) {
					event.preventDefault();
					var id = event.currentTarget.id;
					var query = $scope.buildQuery(id);
					if (!query)
						event.currentTarget.blur();
					else
						angular.element(query).focus();
				}
			});
		}
	}
}]);