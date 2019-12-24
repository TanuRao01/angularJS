angular.module('myApp.controllers', [])
    /*.controller('firstCtrl', function($scope) {
        $scope.message = 'Hello from FirstController';
    })
    .controller('secondCtrl', function($scope) {
        $scope.message = 'Hello from SecondController';
    })
    .controller('thirdCtrl', function($scope) {
        $scope.message = 'Hello from ThirdController';
    })*/
    .controller('homeCtrl', function($scope, $http) {
        $scope.getData = function() {
            $scope.loading = true;
            $http.get("http://dummy.restapiexample.com/api/v1/employee/1")
                .then(function(response) {
                    $scope.details = response.data;
                    $scope.loading = false;
                });
        }
    })
    .controller('homeListCtrl', function($scope, $http) {
        $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];


    })
    .controller('aboutCtrl', function($scope) {
        $scope.scotches = [{
                name: 'Macallan 12',
                price: 50
            },
            {
                name: 'Chivas Regal Royal Salute',
                price: 10000
            },
            {
                name: 'Glenfiddich 1937',
                price: 20000
            }
        ];
    })
    .controller('logregisterCtrl', function($scope, $http, $state, $window) {

        $scope.gotosignIn=function(){
             $state.go('signin');
         }        

        $scope.Gender = "Male";

        $scope.RadioChange = function(s) {
            $scope.GenderSelected = s;
        };

        $scope.logRegister = function() {

            var user = {
                customerName: $scope.username,
                phoneNumber: $scope.phnumber,
                password: $scope.password,
                emailId: $scope.emailid,
                gender: $scope.Gender

            }
            $http({
                method: 'POST',
                url: 'http://107.180.89.46:8081/yeshlok/ysh/user/register',
                headers: { 'Content-Type': 'application/json' },
                data: user
            }).then(function successCallback(response) {
                if (response.data) {
                    $scope.username = '';
                    $scope.phnumber = '';
                    $scope.password = '';
                    $scope.emailid = '';
                    $scope.Gender = '';

                    $window.alert("Hello: " + response.data.data.customerName);
                }
                console.log(response);
                alert(response.data.message);
            }, function errorCallback(response) {
                if (response) {
                    $scope.message = response.data.message;
                    console.log($scope.message)
                }
            });



            /* var post = $http({
                 method: "POST",
                 url: "http://107.180.89.46:8081/yeshlok/ysh/user/register",
                 //dataType: 'json',
                 data: {},
                 headers: { "Content-Type": "application/json" }
             });

             post.success(function(data, status) {
                 $window.alert("Hello: " + data.customerName);
             });

             post.error(function(data, status) {
                 $window.alert(message);
                 console.log(status);
             });*/
        }

    })
    .controller('signInCtrl', function($scope, $http, $state) {
        $scope.formSubmit = function() {
            var logindata = {
                userId: $scope.phonenumber,
                password: $scope.password,
                userIdType: "phoneNo",
                reqType: "logIn"
            };
            $http.post('http://107.180.89.46:8081/yeshlok/ysh/user/login', JSON.stringify(logindata)).then(function(response) {
                if (response.data){
                    $scope.msg = "Post Data Submitted Successfully!";
                }
                console.log(response);
            }, function(response) {
                $scope.msg = "service not exists"
            })
        }
    })

    .controller('loginCtrl', function($scope, $http, $state) {
        /*
                $scope.saveContact = function(loginForm) {
                    alert("Hi2");
                    if (loginForm.$valid) {
                        var dt = $.param({

                            name: $scope.newcontact.name,
                            password: $scope.newcontact.password,
                            phoneNo: $scope.newcontact.phone,
                            email: $scope.newcontact.email,
                            referralCode: $scope.newcontact.refCode
                        })

                        $http({
                            url: "http://test.bhipos.bhimart.com:8081/pos/api/shopUser/register",
                            method: 'POST',
                            headers: {
                                "Content-Type": 'application/json'
                            },
                            data: dt
                        }).then(function(response) {
                            $scope.userRegresp = response.data;
                            if ($scope.userRegresp.IsStatus == true) {
                                alert("Hi");
                                alert(JSON.stringify($scope.userRegresp));
                            }
                        })

                    }
                }*/
        $scope.gotoRegisterPage = function() {
            $state.go('register');
        }
    })
    .controller('registerCtrl', ['$scope', '$http', '$state', '$rootScope', function($scope, $http, $state, $rootScope) {
        console.log("register page");
        /* $scope.ph_numbr = '/^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/';*/

        /*--------Register User start---------------*/
        /*$scope.registerUser = function() {

            var dt = $.param({
                name: $scope.nameForm,
                password: $scope.passwordForm,
                phoneNo: $scope.phoneForm,
                email: $scope.userNameEmail,
                referralCode: $scope.referalCode
            });

            var post = $http({
                method: "POST",
                url: $rootScope.apiUrl + 'register',
                dataType: 'json',
                data: dt,
                headers: { "Content-Type": "application/json" }
            });
            post.success(function (data, status) {
                $window.alert("Hello: " + data.Name + " .\nCurrent Date and Time: " + data.DateTime);
            });
 
            post.error(function (data, status) {
                $window.alert(data.Message);
            });
        }
    }]);*/


        $scope.registerUser = function() {

            var dt = $.param({
                name: $scope.nameForm,
                password: $scope.passwordForm,
                phoneNo: $scope.phoneForm,
                email: $scope.userNameEmail,
                referralCode: $scope.referalCode
            })
            $http({
                url: $rootScope.apiUrl + 'register',
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                data: dt
            }).then(function(response) {
                if (response.status == success) {
                    $scope.registerUser_response = response.data;
                    $scope.nameForm = '';
                    $scope.passwordForm = '';
                    $scope.phoneForm = '';
                    $scope.userNameEmail = '';
                    $scope.referalCode = '';


                    $scope.RegistrationSuccess = response.message;
                    alert('RegistrationSuccess')
                    //$scope.registrationForm.$setPristine();


                } else {
                    $scope.serverErrorResp = response.message;
                    alert('serverErrorResp');
                }

            })

        }
    }]);



/*--------Register User end---------------*/

/*$http({method: 'POST', url: '/api/endpoint/', data: $scope.newObject}).then(function (response) {
    $scope.status = response.status;
    $scope.data = response.data;
}, function (response) {
    $scope.data = response.data || 'Request failed';
    $scope.status = response.status;
});*/