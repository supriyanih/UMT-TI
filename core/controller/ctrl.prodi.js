
define([

], function(){
    function Ctrprodi($scope,serviceAjax,localStorageService,growl){
        //set level
        $scope.level = localStorageService.get('user');
        $scope.gotoPage = function(page){
            page = page == 'berikutnya' ? parseInt($scope.page) + 1 : page;
            serviceAjax.getDataFromServer('prodi','get_all_bypaging',+page)
                .then(function(data){
                    if (data) {
                        $scope.prodi              = data['data'];
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
        $scope.modalProdi = function(action,id){
            if(action=='Tambah'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('prodi','getbyid',+id).then(function(data){
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
            serviceAjax.posDataToServer('prodi','insert',data).then(function(data){
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
            serviceAjax.getDataFromServer('prodi','delete',+id).then(function(data){
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
            serviceAjax.posDataToServer('prodi','update',data).then(function(data){
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
    window.Ctrprodi = Ctrprodi;

    return Ctrprodi;
});