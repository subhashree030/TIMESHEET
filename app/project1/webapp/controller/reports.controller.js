sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/HBox",
        "sap/m/Label",
        "sap/m/Input",
        "sap/m/Button",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,HBox, Label, Input, Button,MessageBox,MessageToast,Fragment) {
        "use strict";

        return Controller.extend("timesheet.com.project1.controller.reports", {
            onInit: function () {
               var that = this
               var currentDateTime = new Date();
               var dataWithDateTime = {
                currentDateTime: currentDateTime
            };
                $.ajax({
                    url: "/catalog/EmpData",
                    method: "GET",
                    dataType: "json",
                    success: function (data, textStatus) {                        
                        
                       
                        data.value = data.value.map(function(item) {
                            return Object.assign(item, dataWithDateTime);
                        });
                        var EmpDataModel = new sap.ui.model.json.JSONModel(data);
                        that.getView().setModel(EmpDataModel,"EmpDataModel");
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        MessageBox.error("Error in calling the Questionaires");
                    }
                });

            },
            onloginPress:function(){
               
                var busyDialog2 = new sap.m.BusyDialog("busyDialog2", {

                  
                    
                    });
                    
                    busyDialog2.open();
                    
                    setTimeout(function() {
                        busyDialog2.close();
                    }, 5000);
                // var username = this.getView().byId("usernameInput").getValue();
                // var password = this.getView().byId("passwordInput").getValue();
            
                // this.validateLogin(username, password);

                // 31-10-23 changes
                // var username = this.getView().byId("usernameInput").getValue();
                var userid = this.getView().byId("usernameInput").getValue();
                var useremail = this.getView().byId("usernameInput").getValue();
                // var usernumber = this.getView().byId("usernameInput").getValue();
                var password = this.getView().byId("passwordInput").getValue();
                
               
                this.validateLogin(userid,useremail,password);

            },
           
            // validateLogin: function (enteredUsername, enteredPassword) {
            //     var empData = this.getView().getModel("EmpDataModel").getProperty("/value"); // Assuming you have set the model
            
            //     for (var i = 0; i < empData.length; i++) {
            //         var employee = empData[i];
            //         if (employee.UserName === enteredUsername && employee.Password === enteredPassword) {

                       

            //             sap.m.MessageToast.show("Login Successful");
                        
            //     var oRouter = this.getOwnerComponent().getRouter();
            //     oRouter.navTo("EmployeeDetails", {
            //         userID: employee.ID,
                   
            //     })  
            //             return;
            //         }
            //     }
           
            //     MessageToast.show("Login failed. Invalid username or password.");
            // },
            //    31-10-23 changes
            validateLogin: function (entereduserid,entereduseremail,enteredPassword) {
                    this.getView().byId("usernameInput").setValue("");
                    this.getView().byId("usernameInput").setValue("");
                    this.getView().byId("passwordInput").setValue("");

                var empData = this.getView().getModel("EmpDataModel").getProperty("/value"); // Assuming you have set the model
                var userlength= this.getView().byId("usernameInput").getValue().length;
                var passwordlength= this.getView().byId("passwordInput").getValue().length;

            
                for (var i = 0; i < empData.length; i++) {
                    var employee = empData[i];
                    if (employee.ID  === entereduserid  && employee.Password === enteredPassword || employee.Email === entereduseremail  && employee.Password === enteredPassword ) {
                    
                        sap.m.MessageToast.show("Login Successful",{
                            duration: 3000,
                            type: "Success"
                        
                            
                        });
                        
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("EmployeeDetails", {
                    userID: employee.ID,
                   
                })  
                
                        return;
                    }
                    
                   
                }
                if(userlength === 0 && passwordlength === 0){
                        sap.m.MessageToast.show("fill the input field");
                         return;
                    }
                    if(employee.Password != enteredPassword){
                        sap.m.MessageToast.show("Wrong password. Try again or click Forgot password to reset it");
                         return;
                    }    
                    if(employee.ID  != entereduserid){
                        sap.m.MessageToast.show("please enter your valid userID or email & password");
                         return;
                    }   
           
                MessageToast.show("Login failed. Invalid username or password.",{
                    duration: 3000,
                    type: "Error"
                });
                
            //     var userlength= this.getView().byId("usernameInput").getValue().length;
            //     var passwordlength= this.getView().byId("passwordInput").getValue().length;
            //     if(userlength === 0 && passwordlength === 0){
            //     sap.m.MessageToast.show("fill the input field");
            // }
            
            
            },
            //02-11-2023//
            // handlesignupPress: function (evt) {
            //     // MessageBox.alert("Link was clicked!");
            //     // create dialog lazily
            // this.pDialog ??= this.loadFragment({
            //     name: "timesheet.com.project1.view.Fragments.Signup"
            // });

            // this.pDialog.then((oDialog) => oDialog.open());
            // // this.getView().byId("SignupFormid").refresh(true);
            // },
            // onsignupCancelButtonPress:function(){
            //     this.byId("signupDialog").close();

            // },
            handlesignupPress: function (evt) {
                // MessageBox.alert("Link was clicked!");
                // create dialog lazily
            this.pDialog ??= this.loadFragment({
                name: "timesheet.com.project1.view.Fragments.Signup"
            });

            this.pDialog.then((oDialog) => oDialog.open());
            // this.getView().byId("SignupFormid").refresh(true);
            },
            onsignupCancelButtonPress:function(){
                this.byId("signupDialog").close();

            },
            // onsignupSaveButtonPress :function(){
            //     var payload = {
            //         ID:this.getView().byId("inputid").getValue(),
            //         Firstname:this.getView().byId("inputfname").getValue(),
            //         Lastname:this.getView().byId("inputlname").getValue(),
            //         Password:this.getView().byId("inputpword").getValue(),
            //         Position:this.getView().byId("inputposition").getValue(),
            //         AdsName:this.getView().byId("inputadsname").getValue(),
            //         AdsStreet:this.getView().byId("inputadsstreet").getValue(),
            //         ZipCode:this.getView().byId("inputzip").getValue(),
            //         Country:this.getView().byId("inputcountry").getValue(),
            //         Twitter:this.getView().byId("inputtwitter").getValue(),
            //         Email:this.getView().byId("inputemail").getValue(),
            //         Tel:this.getView().byId("inputtelno").getValue(),
            //         Sms:this.getView().byId("inputsms").getValue(),
            //         Mobile:this.getView().byId("inputmobno").getValue(),
            //         image:this.getView().byId("inputimagepath").getValue(),

            //      };
            //     //  var purl="/catalog/EmpData";
            //      $.ajax({
            //         type: "POST",
            //         url: "/catalog/EmpData", 
            //         data: JSON.stringify(payload),
            //         contentType: "application/json",
            //         success: function (response) {
            //            alert(response)
            //         //    this.getView().getModel().refresh(true);
            //         },
            //         error: function (error) {
            //             // Handle the error
            //         }
            //     });
                
            //     this.byId("signupDialog").close();
                
            // },
              //07-11-23 changes 
              onsignupSaveButtonPress :function(){
                var signupid = this.getView().byId("inputid").getValue();
                var signupfname = this.getView().byId("inputfname").getValue();
                var signuplname = this.getView().byId("inputlname").getValue();
                var signuppassword = this.getView().byId("inputpword").getValue();
               //  var signupposition = this.getView().byId("inputposition").getValue();

               this.validatesignup(signupid,signupfname,signuplname,signuppassword);
               // var payload = {
               //     ID:this.getView().byId("inputid").getValue(),
               //     Firstname:this.getView().byId("inputfname").getValue(),
               //     Lastname:this.getView().byId("inputlname").getValue(),
               //     Password:this.getView().byId("inputpword").getValue(),
               //     Position:this.getView().byId("inputposition").getValue(),
               //     AdsName:this.getView().byId("inputadsname").getValue(),
               //     AdsStreet:this.getView().byId("inputadsstreet").getValue(),
               //     ZipCode:this.getView().byId("inputzip").getValue(),
               //     Country:this.getView().byId("inputcountry").getValue(),
               //     Twitter:this.getView().byId("inputtwitter").getValue(),
               //     Email:this.getView().byId("inputemail").getValue(),
               //     Tel:this.getView().byId("inputtelno").getValue(),
               //     Sms:this.getView().byId("inputsms").getValue(),
               //     Mobile:this.getView().byId("inputmobno").getValue(),
               //     image:this.getView().byId("inputimagepath").getValue(),

               //  };
               //  $.ajax({
               //     type: "POST",
               //     url: "/catalog/EmpData", 
               //     data: JSON.stringify(payload),
               //     contentType: "application/json",
               //     success: function (response) {
               //        alert(response)
               //     //    this.getView().getModel().refresh(true);
               //     },
               //     error: function (error) {
               //         // Handle the error
               //     }
               // });
               
               // this.byId("signupDialog").close();
               
           },
           validatesignup: function(validatesignupid,validatesignupfname,validatesignuplname,validatesignuppassword){
               var empData = this.getView().getModel("EmpDataModel").getProperty("/value");
               for (var i = 0; i < empData.length; i++) {
                   var employee = empData[i];
                   if(employee.ID  === validatesignupid ){
                       sap.m.MessageToast.show("This ID already used try another one");
                        return;
                   }
                       
               }
               if(validatesignupid.length === 0 || validatesignupfname.length === 0 || validatesignuplname.length === 0 || validatesignuppassword.length === 0 ){
                   sap.m.MessageToast.show("fill the input field");
                        return;
               }
               else{
               
                   var payload = {
                       ID:this.getView().byId("inputid").getValue(),
                       Firstname:this.getView().byId("inputfname").getValue(),
                       Lastname:this.getView().byId("inputlname").getValue(),
                       Password:this.getView().byId("inputpword").getValue(),
                       Position:this.getView().byId("inputposition").getValue(),
                       AdsName:this.getView().byId("inputadsname").getValue(),
                       AdsStreet:this.getView().byId("inputadsstreet").getValue(),
                       ZipCode:this.getView().byId("inputzip").getValue(),
                       Country:this.getView().byId("inputcountry").getValue(),
                       Twitter:this.getView().byId("inputtwitter").getValue(),
                       Email:this.getView().byId("inputemail").getValue(),
                       Tel:this.getView().byId("inputtelno").getValue(),
                       Sms:this.getView().byId("inputsms").getValue(),
                       Mobile:this.getView().byId("inputmobno").getValue(),
                       image:this.getView().byId("inputimagepath").getValue(),
   
                    };
                    $.ajax({
                       type: "POST",
                       url: "/catalog/EmpData", 
                       data: JSON.stringify(payload),
                       contentType: "application/json",
                       success: function (response) {
                           alert("postcalled")
                          alert(response)
                       //    this.getView().getModel().refresh(true);
                       },
                       error: function (error) {
                           // Handle the error
                       }
                   });
                   
                   this.byId("signupDialog").close();
   
               }

           },
      //07-11-23 changes end
            onForgetPassword:function(){
                alert("forgrt Password working")
                // this.pDialog ??= this.loadFragment({
                //     name: "timesheet.com.project1.view.Fragments.forgetPassword"
                // });
            
                // this.pDialog.then((oDialog) => oDialog.open());

                if (!this._oFragment) {
                    this._oFragment = sap.ui.xmlfragment("timesheet.com.project1.view.Fragments.forgetPassword", this);
                    this.getView().addDependent(this._oFragment);
                  }
                  
                  this._oFragment.open();
              
            },
            onCancelPress: function() {
                if (this._oFragment) {
                  this._oFragment.close();
                }
              },
              onResetPress:function(){
                var newPassword = sap.ui.getCore().byId("passwordInput").getValue();
                var confirmPassword = sap.ui.getCore().byId("confirmPasswordInput").getValue();
          
                if (newPassword === confirmPassword) {
                 
                  this.performPatchCall();
                } else {
                 
                  MessageToast.show("Please enter the same password in both fields.");
                }

                alert("hii reset");
            //     var updatedData = {
            //         slNo: SlNo,
            //         Date: date,
            //         noOfHours: noOfHours,
            //         Project: selectedLeaveKey,
            //         Task: Task,  
            //         SubTask:SubTask,
            //         TaskDescription:description
            //     };
            //     $.ajax({
            //         type: "PATCH",
            //         url: "/catalog/myEntries/" + deleteno, // Replace with your service URL
            //         data: JSON.stringify(updatedData),
            //         contentType: "application/json",
            //         success: function (data, textStatus, jqXHR) {
            //             // Handle success, e.g., show a success message
            //             that.getView().getModel("myEntriesModel").refresh(true);
            //             var oModel = that.getView().getModel("myEntriesModel");
            //             sap.m.MessageToast.show("Entry deleted successfully");
            //             oModel.updateBindings();
            //         },
            //         error: function (jqXHR, textStatus, errorThrown) {
            //             // Handle errors, e.g., show an error message
            //             sap.m.MessageToast.show("Failed to delete the entry: " + errorThrown);
            //         }
            
             

              
            // });
        

              },
              performPatchCall: function () {
                var id =   sap.ui.getCore().byId("userIDInput").getValue();
              
               
                    var updatedData = {
                        Password:sap.ui.getCore().byId("confirmPasswordInput").getValue()
                    };
                    $.ajax({
                        type: "PATCH",
                        url: "/catalog/EmpData/" + id, // Replace with your service URL
                        data: JSON.stringify(updatedData),
                        contentType: "application/json",
                        success: function (data, textStatus, jqXHR) {
                            // Handle success, e.g., show a success message
                           
                            sap.m.MessageToast.show("Your Password Successfully Updated");
                            
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            // Handle errors, e.g., show an error message
                            sap.m.MessageToast.show("Failed to delete the entry: " + errorThrown);
                        }
                
                 
    
                  
                });
            
                this.onCancelPress()
            },
            onFacebookLogin: function () {
                // Replace 'YOUR_FACEBOOK_LOGIN_URL' with the actual Facebook login URL
                var facebookLoginUrl = 'https://www.facebook.com/campaign/landing.php?campaign_id=14884913640&extra_1=s%7Cc%7C589460569891%7Cb%7Csign%20in%20to%20facebook%7C&placement=&creative=589460569891&keyword=sign%20in%20to%20facebook&partner_id=googlesem&extra_2=campaignid%3D14884913640%26adgroupid%3D128696221832%26matchtype%3Db%26network%3Dg%26source%3Dnotmobile%26search_or_content%3Ds%26device%3Dc%26devicemodel%3D%26adposition%3D%26target%3D%26targetid%3Dkwd-11079269337%26loc_physical_ms%3D1007799%26loc_interest_ms%3D%26feeditemid%3D%26param1%3D%26param2%3D&gclid=CjwKCAjwkY2qBhBDEiwAoQXK5T1NUExLhhLFvN15EvimFB64fJP4Eh_ZWaxhWLWF7RgEqmbNmy0EsRoCUSwQAvD_BwE';
                
                // Open the Facebook login page in a new window
                window.open(facebookLoginUrl, '_blank');
              }
                


        });
    });
