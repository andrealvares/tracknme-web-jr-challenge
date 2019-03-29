angular.module('tracknme').controller('HomeController', HomeController);

function HomeController(NgMap, $localStorage, Position){
    var vm = this;
    vm.$storage = $localStorage;
    if (vm.$storage.tracks == null){
        vm.$storage.tracks = [];
    }
    
    vm.tracks = [];
    vm.icon = {
        url: '../../content/images/truck.png',
        scaledSize: [23, 23]
    };    

    vm.filtrarPorData = function(data) {  
        vm.tracks = [];
        vm.$storage.tracks.forEach(function(track){
            if (track.data == data){
                vm.tracks.push(track);
            };
        });
        if (vm.tracks.length == 0){
            Position.query({data: data}, sucesso, erro);
        } else {
            carregarMaps();
        }        
    }

    function carregarMaps(){           
        NgMap.getMap().then(function(map){
            vm.map = map;
        });
    }

    function erro(erro) {
        console.log(erro);
    }

    function sucesso(positions) {
        vm.tracks = [];
        if (positions.length == 0) {
            return
        }
        var count = 0;
        var paradas = [];        

        function addTrack(p, lastDate) {
            vm.tracks.push({
                data: lastDate,
                inicio: p[0],
                fim: p[p.length-1],
                paradas: p
            });
        }

        var lastDate = null;
        var compareDate = null;
        for(var i=0; i<positions.length; i++) {
            count = count + 1;
            if (lastDate == null) {                
                lastDate = new Date(positions[i].dateTime);
                lastDate = lastDate.getFullYear() + '-' +  ('0' + (lastDate.getMonth()+1)).slice(-2) + '-' + ('0' + (lastDate.getDate())).slice(-2);            
            }
            compareDate = new Date(positions[i].dateTime)
            compareDate = compareDate.getFullYear() + '-' +  ('0' + (compareDate.getMonth()+1)).slice(-2) + '-' + ('0' + (compareDate.getDate())).slice(-2);            
            if (lastDate != compareDate) {                
                count = 1;
                addTrack(paradas, lastDate)
                paradas = [];
                lastDate = compareDate
            }
            paradas.push({
                location: {lat: positions[i].latitude, lng: positions[i].longitude}
            });
            if (count == 22) {
                count = 0;
                addTrack(paradas, lastDate)
                paradas = [];
            }
        }
        if (count < 22 && count > 0) {
            addTrack(paradas, lastDate);
        }
        vm.tracks.forEach(function(el){
            vm.$storage.tracks.push(el);
        });        
        carregarMaps();
    }
}