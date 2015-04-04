
define([

], function(){
    function Ctrlogin($scope,serviceAjax,$location,localStorageService,growl,$timeout){

        $scope.loading = false;
        $scope.login = {};

        $scope.cekLogin = function(){
            $scope.loading = true;
            if($scope.login['username'] !== undefined || $scope.login['password'] != undefined ){
                serviceAjax.posDataToServer('login',$scope.login).then(function(data){
                    $timeout(function(){
                        if (data.length > 0) {
                            $location.path('/home');
                            localStorageService.add('user',data);
                        } else {
                            growl.addWarnMessage("Ops, User / Pass Anda Tidak Terdaftar Di database ",{ttl: 1000});
                            $scope.loading = false;
                        }
                    },2000);
                });
            }else{
                $scope.loading = false;
                growl.addErrorMessage("ops, sepertinya anda melewatkan sesuatu",{ttl: 2000});
            }
        };

        (this.cekLocalStorage = function(){
          if(localStorageService.get('user')) $location.path('/home');
        })();

    }

    // set to global
    window.Ctrlogin = Ctrlogin;

    return Ctrlogin;
});