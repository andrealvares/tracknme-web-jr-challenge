angular.module('tracknme').controller('HomeController', HomeController);

function HomeController(NgMap, $localStorage, Position){
    var vm = this;

    vm.tracks = [];
    vm.icon = {
        url: '../../content/images/truck.png',
        scaledSize: [23, 23]
    };

    function carregarMaps(){        
        NgMap.getMap().then(function(map){
            vm.map = map;
        });
    }

    function erro(erro) {
        console.log(erro);
    }

    function sucesso(positions) {
        var count = 0;
        var paradas = [];        

        function addTrack(p) {
            vm.tracks.push({
                inicio: p[0],
                fim: p[p.length-1],
                paradas: p
            });
        }

        for(var i=0; i<positions.length; i++) {
            count = count + 1;
            paradas.push({
                location: {lat: positions[i].latitude, lng: positions[i].longitude}
            });
            if (count == 22) {
                count = 0;
                addTrack(paradas)
                paradas = [];
            }
        }
        if (count < 22 && count > 0) {
            addTrack(paradas);
        }
        vm.$storage.tracks = vm.tracks
        carregarMaps();
    }

    vm.$storage = $localStorage
    if (vm.$storage.tracks.length == 0){
        vm.$storage.tracks = [];
        Position.query(sucesso, erro);
    }else{
        console.log('local');
        vm.tracks = vm.$storage.tracks
        carregarMaps();
    }
}