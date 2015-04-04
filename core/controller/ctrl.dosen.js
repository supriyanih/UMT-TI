
define([

], function(){
    function Ctrdosen($scope,serviceAjax,localStorageService,growl){
        //set level
        $scope.isifoto = 'none';
        $scope.isilevel='dosen';
        
        $scope.level = localStorageService.get('user');
        $scope.gotoPage = function(page){
            page = page == 'berikutnya' ? parseInt($scope.page) + 1 : page;
            serviceAjax.getDataFromServer('dosen','get_all_bypaging',+page)
                .then(function(data){
                    if (data) {
                        $scope.dosen              = data['data'];
                        $scope.page             = data['page'];
                        $scope.pagefirst        = data['pagefirst'];
                        $scope.pagelast         = data['pagelast'];
                        $scope.pagination       = data['pagination'];
                       // $scope.$apply();
                    } else {

                    }
            });
        };

        $scope.gotoPage(1);
        $scope.modalDosen = function(action,id){
            if(action=='Tambah'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('dosen','getbyid',+id).then(function(data){
                        if (data) {
                            $scope.modaloption = 'show';
                            $scope.action = action;
                            $scope.data = data[0];
                           // $scope.$apply();
                        } else {

                        }
                });
            }
        };
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        };
        $scope.save = function(data,action){
            if(action == 'Tambah') $scope.simpan(data); else $scope.edit(data);
        };
        /*simpan*/
        $scope.simpan = function(data){
            serviceAjax.posDataToServer('dosen','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Data Berhasil Di Simpan!',{ttl: 2000});
                }
            });
        };
        $scope.delete = function(id){
            serviceAjax.getDataFromServer('dosen','delete',+id).then(function(data){
                if(data.length > 0){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Data Berhasil Di Delete!',{ttl: 2000});
                }
            });
        };
        $scope.edit = function(data){
            serviceAjax.posDataToServer('dosen','update',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('Data Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
    }
    // set to global
    window.Ctrdosen = Ctrdosen;

    return Ctrdosen;
});