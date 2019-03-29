angular.module('tracknme').factory('Position', PositionService);

function PositionService($resource){
    return $resource('/api/positions/:data');
}