
define([

], function(){
    function Ctruser($scope,serviceAjax,growl){
            $scope.gotoPage = function(page){
            page = page == 'berikutnya' ? parseInt($scope.page) + 1 : page;
            serviceAjax.getDataFromServer('user','get_all_bypaging',+page)
                .then(function(data){
                    if (data) {
                        $scope.userlist         = data['data'];
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
        $scope.modalJadual = function(action,id){
            if(action=='Tambah'){
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('user','getbyid',+id).then(function(data){
                        if (data) {
                            $scope.modaloption = 'show';
                            $scope.action = action;
                            $scope.data = data[0];
                            //$scope.$apply();
                        } else {

                        }
                });
            }
        };
        $scope.closeModal = function(){
            $scope.modaloption = 'hide';
            $scope.data = '';
        };
        //ambil data shuttle tujuan
       
        $scope.save = function(data,action){
            if(action == 'Tambah') $scope.simpan(data); else $scope.edit(data);
        };

        $scope.changeIsactive =function(id ,isactive){
            var statuss = isactive == '1' ? 'Non Active' :'Active';
            var booel = isactive == '1' ? 0:1;
            var data ={
                userid :id ,
                isactive : booel
            };
            serviceAjax.posDataToServer('user','updateisactive',data).then(function(data){
                if(data){
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('User '+id+' Berhasil Di '+statuss,{ttl: 2000});
                }
            });
        };
        /*simpan*/
        $scope.simpan = function(data){
            serviceAjax.posDataToServer('user','insert',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('User Berhasil Di Simpan!',{ttl: 2000});
                    //$scope.$apply();
                }
            });
        };
        $scope.delete = function(id){
            serviceAjax.getDataFromServer('user','delete',+id).then(function(data){
                if(data.length > 0){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('User Berhasil Di Delete!',{ttl: 2000});
                }
            });
        };
        $scope.edit = function(data){
            serviceAjax.posDataToServer('user','update',data).then(function(data){
                if(data){
                    /*close modal*/
                    $scope.closeModal();
                    /*tamplikan list*/
                    $scope.gotoPage($scope.page);
                    growl.addSuccessMessage('User Berhasil Di Edit!',{ttl: 2000});
                }
            });
        }
    }
    // set to global
    window.Ctruser = Ctruser;

    return Ctruser;
});