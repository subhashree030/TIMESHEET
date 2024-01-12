sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/HBox",
        "sap/m/Label",
        "sap/m/Input",
        "sap/m/Button",
        'sap/ui/model/json/JSONModel',
    "../model/formatter",
    "sap/ui/core/LocaleData",
     "sap/ui/core/library",
    "sap/ui/core/Fragment",
    "sap/ui/core/format/DateFormat",
    "sap/ui/unified/library",
    "sap/m/MessageToast",
    "sap/ui/core/date/UI5Date"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,HBox, Label, Input, Button,JSONModel,formatter,LocaleData,coreLibrary,Fragment,DateFormat,unifiedLibrary,MessageToast,UI5Date) {
        "use strict";
        var CalendarDayType = unifiedLibrary.CalendarDayType;
        var ValueState = coreLibrary.ValueState;
        return Controller.extend("timesheet.com.project1.controller.EmployeeDetails", {
            formatter: formatter,
            _data: {
                "dtValue": new Date()
            },
            onInit: function () {
                // weatherData start
                var th = this;
				const options = {
					
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0
				  };
				  
				  function success(pos) {
					
					const crd = pos.coords;
					var currentLatitude = crd.latitude;
					var currentLongitude = crd.longitude
				  
					console.log('Your current position is:');
					console.log(`Latitude : ${crd.latitude}`);
					console.log(`Longitude: ${crd.longitude}`);
					console.log(`More or less ${crd.accuracy} meters.`);
					
					var surl ="https://api.openweathermap.org/data/2.5/weather?lat="+currentLatitude+"&lon="+currentLongitude+"&appid=e6ca83b32405e7549bac6c517ddef4d9";
				
				
				
				$.ajax({
					url:surl,
					method:"GET",
					dataType:"json",
					success :function(data,response){
						 // var stringWeather = JSON.stringify(data)					 
						  var jsonModel = new sap.ui.model.json.JSONModel(data);
						  th.getView().setModel(jsonModel,"weather");
						var fTemp =  th.getView().byId("temp").getText();
						var fTOc = (fTemp - 32) * 5/9;
						var text =  "°C|°F"
						var res = text.sup()
						//th.getView().byId("temp").setText((Math.trunc(fTOc))+ "°C|°F");
						var round = Math.ceil(fTemp)
						var result = round.toString().substring(0, round.toString().length - 1);
						th.getView().byId("temp").setText((result) + "°C|°F");

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d = new Date();
// var hour = d.getHours();
// var Minutes = d.getMinutes();
//  var today1 = hour + ": " + Minutes 
var hour = d.getHours();
var minute = d.getMinutes();
var second = d.getSeconds();
var prepand = (hour >= 12)? " PM ":" AM ";
hour = (hour >= 12)? hour - 12: hour;
if (hour===0 && prepand===' PM ') 
{ 
if (minute===0 && second===0)
{ 
hour=12;
prepand=' Noon';
} 
else
{ 
hour=12;
prepand=' PM';
} 
} 
if (hour===0 && prepand===' AM ') 
{ 
if (minute===0 && second===0)
{ 
hour=12;
prepand=' Midnight';
} 
else
{ 
hour=12;
prepand=' AM';
} 
} 
let day = weekday[d.getDay()];
 var weatherDescription = th.getView().byId("date").getSubtitle();
 th.getView().byId("date").setSubtitle(day + "," + hour + " : " + minute + prepand  +"," + weatherDescription);
 
					   
					},
					error:function(error){
							alert("Error");
					}
			});
					
			
					
				  }
				  
				 	 
				  function error(err) {
					console.warn(`ERROR(${err.code}): ${err.message}`);
				  }

				  navigator.geolocation.getCurrentPosition(success, error, options); 
				 

           
                //WeatherData End

                const currentDate = new Date().toLocaleDateString();

// Variable to store the current time
const currentTime = new Date().toLocaleTimeString();

// console.log("Current Date:", currentDate);
// console.log("Current Time:", currentTime);
       this.getView().byId("loginDate").setText(currentDate);
       this.getView().byId("loginTime").setText(currentTime);

                this.rowCounter = 0;

                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.initialize();

    oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);

    var oLocale = new sap.ui.core.Configuration().getLocale(),
    oLocaleData = new LocaleData(oLocale),
    oModel;

this._data["dtPattern"] = oLocaleData.getCombinedDateTimePattern("medium", "medium");
oModel = new JSONModel(this._data);
this.getView().setModel(oModel, "dateModel");
                
            },       
               
      
      
          
              _onObjectMatched: function (oEvent) {
                var userID = oEvent.getParameter("arguments").userID;
             
                var that = this;
            
              
                $.ajax({
                    url: "/catalog/EmpData/" + userID,
                    method: "GET",
                    dataType: "json",
                    success: function (data, textStatus) {
                     
                        var user = data; 
            
                    
                        var oModel = new sap.ui.model.json.JSONModel(user);
                        that.getView().setModel(oModel);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        MessageBox.error("Error in calling the EmpData");
                    }
                });
            },
            onClickNav:function(){
                alert("hii");
                history.back()
            },
            handlePopoverPress: function(oEvent) {
                var oButton = oEvent.getSource(),
                    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "timesheet.com.project1.view.Fragments.profile",
                        controller: this
                    }).then(function(oPopover) {
                        oView.addDependent(oPopover);
                        oPopover.bindElement("/ProductCollection/0");
                        return oPopover;
                    });
                }

                this._pPopover.then(function(oPopover) {
                    if (oPopover.isOpen()) {
                        oPopover.close(); // Close the popover if it's open
                    } else {
                        oPopover.openBy(oButton);
                    }
                });
            },
            onLogOut: function() {
                history.back();
               
            }
            

                       
         
        });
    });
