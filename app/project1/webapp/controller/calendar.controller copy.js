sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/HBox",
        "sap/m/Label",
        "sap/m/Input",
        "sap/m/Button",
        "sap/m/MessageBox",
        "sap/m/MessageToast",
        'sap/ui/unified/CalendarLegendItem',
		'sap/ui/unified/DateTypeRange',
		'sap/ui/core/date/UI5Date'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,HBox, Label, Input, Button,MessageBox,MessageToast,CalendarLegendItem,DateTypeRange,UI5Date) {
        "use strict";

        return Controller.extend("timesheet.com.project1.controller.calendar", {
            onInit: function () {


                // for Public holiday date part start

                  var oCalendar = this.byId("calendar");
                  var oLeg = this.byId("legend");
                    // new method
                    var jsonData = {
                        holidays: [
                            {
                                "date": "2023-01-01",
                                "description": "New Year's Day"
                              },
                             
                              {
                                "date": "2023-04-22",
                                "description": "Eid-ul-Fitr"
                              },
                             
                              {
                                "date": "2023-04-08",
                                "description": "Easter"
                              },
                              {
                                "date": "2023-04-09",
                                "description": "Easter"
                              },
                             
                              {
                                "date": "2023-09-15",
                                "description": "Janmashtami"
                              },
                             
                             
                              {
                                "date": "2023-10-24",
                                "description": "Dussehra"
                              },
                              
                              
                              {
                                "date": "2023-11-27",
                                "description": "Guru Nanak’s Jayanti"
                              }
                        ]
                      };
                      var HolidayModel = new sap.ui.model.json.JSONModel(jsonData);
                      this.getView().setModel(HolidayModel, "HolidayModel");

                      var HModel = this.getView().getModel("HolidayModel");

                        oLeg.addItem(new CalendarLegendItem({
                     type: "Type01",
                     text: "Public Holiday"
                 }));

                      if (HModel) {
                          // Get the array of holidays from the model
                          var holidays = HModel.getProperty("/holidays");
                  
                          // Get a reference to the Calendar control
                          var oCalendar = this.byId("calendar");
                  
                          // Loop through the holidays and add them as special dates
                          for (var i = 0; i < holidays.length; i++) {
                              var holiday = holidays[i];
                  
                              oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
                                  startDate: new Date(holiday.date),
                                  type: "Type01", // Set the type for yellow color
                                  text: "Public Holiday",
                                  tooltip: "Public Holiday"
                              }));
                          }
                      }
                  
        // for optional holiday part start
        var optionHolidayData = {
            optionHolidays: [
                {
                    "name": "BHOGI",
                    "date": "2023-01-14"
                  },
                  {
                    "name": "MAKARA SANKRANTI",
                    "date": "2023-01-15"
                  },
                  {
                    "name": "KANUMA",
                    "date": "2023-01-16"
                  },
                  {
                    "name": "REPUBLIC DAY",
                    "date": "2023-01-26"
                  },
                  {
                    "name": "MAHA SIVARATRI / SHAB-E-MIRAJ",
                    "date": "2023-02-18"
                  },
                  {
                    "name": "HOLi",
                    "date": "2023-03-08"
                  },
                  {
                    "name": "UGADI",
                    "date": "2023-03-22"
                  },
                  {
                    "name": "SRI RAMA NAVAMI",
                    "date": "2023-03-30"
                  },
                  {
                    "name": "BABU JAGIVAN RAM’S BIRTHDAY",
                    "date": "2023-04-05"
                  },
                  {
                    "name": "GOOD FRIDAY",
                    "date": "2023-04-07"
                  },
                  {
                    "name": "DR.B.R. AMBEDKAR’S BIRTHDAY",
                    "date": "2023-04-14"
                  },
                  {
                    "name": "RAMZAN (Eid-ul-Fitr)",
                    "date": "2023-04-22"
                  },
                  {
                    "name": "BAKRID (Eid -ul-Zuha)",
                    "date": "2023-06-29"
                  },
                  {
                    "name": "MOHARRUM",
                    "date": "2023-07-29"
                  },
                  {
                    "name": "INDEPENDENCE DAY",
                    "date": "2023-08-15"
                  },
                  {
                    "name": "SRI KRISHNA ASTAMI",
                    "date": "2023-09-06"
                  },
                  {
                    "name": "VINAYAKA CHAVITHI",
                    "date": "2023-09-18"
                  },
                  {
                    "name": "EID MILADUN NAB! (Birthday of Prophet Mohammad)",
                    "date": "2023-09-28"
                  },
                  {
                    "name": "MAHATMA GANDHI JAYANTHI",
                    "date": "2023-10-02"
                  },
                  {
                    "name": "DURGASTAMI",
                    "date": "2023-10-22"
                  },
                  {
                    "name": "VUAYADASAMI",
                    "date": "2023-10-23"
                  },
                  {
                    "name": "DEEPAVALI",
                    "date": "2023-11-12"
                  },
                  {
                    "name": "CHRISTMAS",
                    "date": "2023-12-25"
                  }
            ]
          };
          var optionHolidayModel = new sap.ui.model.json.JSONModel(optionHolidayData);
          this.getView().setModel(optionHolidayModel, "optionHolidayModel");

          var optHolidayModel = this.getView().getModel("optionHolidayModel");

            oLeg.addItem(new CalendarLegendItem({
         type: "Type02",
         text: "Optional Holiday",
         color:"#FFFF00"
     }));
     if (optHolidayModel) {
   
        var optholidays = optHolidayModel.getProperty("/optionHolidays");

       
        var oCalendar = this.byId("calendar");

        // Loop through the holidays and add them as special dates
        for (var i = 0; i < optholidays.length; i++) {
            var holiday = optholidays[i];

            oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
                startDate: new Date(holiday.date),
                type: "Type02",
                text: "Optional Holiday",
                tooltip: "Optional Holiday",
                color:"#FFFF00"
                
               
            }));
        }
    }

        // for optional holiday part end
                // for calender
                var oView = this.getView();
                var oList = oView.byId("holidayList"); // Replace with the actual ID of your list control
 
               var rfsmodel = new sap.ui.model.json.JSONModel();
               this.getView().setModel(rfsmodel,'desRequests');
               var that = this;
               var url = "/catalog/Holiday";
               $.ajax({
                     url: url,
                     type: "Get",
                     async: true,
                     dataType: "json",
                     contentType: "application/json",
                     success: function (data, textStatus, jqXHR) {
           
                     rfsmodel.setData(data);
                     rfsmodel.refresh(true); 
             },
             error: function (data, jqXHR) {
                   debugger;
            }
         });
            },
            onTapOnDate: function (oEvent) {
                // Get the selected date from the event
                const selectedDate = oEvent.getParameter("date");
            
                // Create a route object to handle navigation
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            
                // Navigate to the new page and pass the selected date as a parameter
                oRouter.navTo("myEntries", {
                    date: selectedDate
                });
            },
          
                      

        });
    });
