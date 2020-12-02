'use strict';

angular.module('prodapps')
  .controller('TdcpCtrl', ['$scope', '$stateParams', '$state', 'jsonRpc', '$notification', function ($scope, $stateParams, $state, jsonRpc, $notification) {

    $scope.tdcp = {};

    $scope.$watch('tdcp.lot_number', function (newVal) {
      if (newVal)
        searchTDCP(newVal);
    });

    function searchTDCP(lot_number) {
      $notification('searchin for TDCP');
      var domain = [
        [
          'name',
          '=',
          lot_number
        ]
      ];
      var fields = [
        'table_tech_description'
      ]

      jsonRpc.searchRead('mrp.production', domain, fields).then(function (data) {
        console.log(data);
        $scope.tdcp.search = data.records;
      }, function () {
        $notification('an error has occured');
      });
    }

    $scope.eraseSearch = function (status) {
      delete $scope.tdcp.lot_number;
    };
}]);