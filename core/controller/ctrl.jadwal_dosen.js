
define([

], function(){
    function Ctrjadwal_dosen($scope,serviceAjax,growl,$sce,localStorageService){
        //set level
        $scope.data = {};
        $scope.level = localStorageService.get('user');
        $scope.gotoPage = function(){
           
            $scope.dataid =$scope.level[0]['staff_id'] ;    
            serviceAjax.getDataFromServer('jadwal','get_all',+$scope.dataid)
                .then(function(data){
                    if (data) {
                        $scope.jadwal            = data;
                        
                     // $scope.$apply();
                    } else {

                    }
            });
        };

        $scope.gotoPage();
        
        //dropdown dosen
      
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
    window.Ctrjadwal_dosen = Ctrjadwal_dosen;

    return Ctrjadwal_dosen;
});