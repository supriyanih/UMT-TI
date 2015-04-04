
define([

], function(){
    function Ctrjadwal($scope,serviceAjax,growl,$sce,localStorageService){
        //set level
        $scope.data = {};
        $scope.level = localStorageService.get('user');
        $scope.gotoPage = function(page){
            page = page == 'berikutnya' ? parseInt($scope.page) + 1 : page;
            serviceAjax.getDataFromServer('jadwal','get_all_bypaging',+page)
                .then(function(data){
                    if (data) {
                        $scope.jadwal              = data['data'];
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
        //dropdown dosen
        serviceAjax.getDataFromServer('dosen','get_all').then(function(data){
                      $scope.datadosen = data;
                    }); 
                    
        //dropdown matkul
        serviceAjax.getDataFromServer('matkul','get_all').then(function(data){
                      $scope.datamatkul = data;
                    });             
        
        $scope.modalJadwal = function(action,id){
            if(action=='Tambah'){
                
               
                $scope.modaloption = 'show';
                $scope.action = action;
            }else if(action =='Edit'){
                serviceAjax.getDataFromServer('jadwal','getbyid',+id).then(function(data){
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
            serviceAjax.posDataToServer('jadwal','insert',data).then(function(data){
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
            serviceAjax.getDataFromServer('jadwal','delete',+id).then(function(data){
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
            serviceAjax.posDataToServer('jadwal','update',data).then(function(data){
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
    window.Ctrjadwal = Ctrjadwal;

    return Ctrjadwal;
});