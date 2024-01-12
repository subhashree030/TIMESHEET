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
		'sap/ui/core/date/UI5Date',
        "sap/ui/model/json/JSONModel",
        "sap/ui/core/format/DateFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,HBox, Label, Input, Button,MessageBox,MessageToast,CalendarLegendItem,DateTypeRange,UI5Date,JSONModel,DateFormat) {
        "use strict";

        return Controller.extend("timesheet.com.project1.controller.calendar", {
            onInit: function () {

                var oModel = new sap.ui.model.json.JSONModel();
                var oDateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd" });
                var oDayFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "EEEE" }); // 'EEEE' gives the full name of the day
                var oTimeFormat = sap.ui.core.format.DateFormat.getTimeInstance({ pattern: "HH:mm:ss" }); // Add time format
                
                var oCurrentDate = new Date();
                var sFormattedDate = oDateFormat.format(oCurrentDate);
                var sCurrentDay = oDayFormat.format(oCurrentDate);
                var sCurrentTime = oTimeFormat.format(oCurrentDate); // Get formatted time
                
                oModel.setData({
                    currentDate: sFormattedDate,
                    currentDay: sCurrentDay,
                    currentTime: sCurrentTime // Add current time to the data
                });
                
                this.getView().setModel(oModel, "calendarModel");
                
                var oCalendar = this.getView().byId("calendar");
                oCalendar.attachSelect(this.onDateSelect, this);
                

    //             // for Public holiday date part start

    //               var oCalendar = this.byId("calendar");
    //               var oLeg = this.byId("legend");
    //                 // new method
    //                 var jsonData = {
    //                     holidays: [
    //                         {
    //                             "date": "2023-01-01",
    //                             "description": "New Year's Day"
    //                           },
                             
    //                           {
    //                             "date": "2023-04-22",
    //                             "description": "Eid-ul-Fitr"
    //                           },
                             
    //                           {
    //                             "date": "2023-04-08",
    //                             "description": "Easter"
    //                           },
    //                           {
    //                             "date": "2023-04-09",
    //                             "description": "Easter"
    //                           },
                             
    //                           {
    //                             "date": "2023-09-15",
    //                             "description": "Janmashtami"
    //                           },
                             
                             
    //                           {
    //                             "date": "2023-10-24",
    //                             "description": "Dussehra"
    //                           },
                              
                              
    //                           {
    //                             "date": "2023-11-27",
    //                             "description": "Guru Nanak’s Jayanti"
    //                           }
    //                     ]
    //                   };
    //                   var HolidayModel = new sap.ui.model.json.JSONModel(jsonData);
    //                   this.getView().setModel(HolidayModel, "HolidayModel");

    //                   var HModel = this.getView().getModel("HolidayModel");

    //                     oLeg.addItem(new CalendarLegendItem({
    //                       color:"#FFC0CB",
    //                  text: "Public Holiday"
    //              }));

    //                   if (HModel) {
    //                       // Get the array of holidays from the model
    //                       var holidays = HModel.getProperty("/holidays");
                  
    //                       // Get a reference to the Calendar control
    //                       var oCalendar = this.byId("calendar");
                  
    //                       // Loop through the holidays and add them as special dates
    //                       for (var i = 0; i < holidays.length; i++) {
    //                           var holiday = holidays[i];
                  
    //                           oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
    //                               startDate: new Date(holiday.date),
    //                               // Set the type for yellow color
    //                               text: "Public Holiday",
    //                               tooltip: "Public Holiday",
    //                               color:"#FFC0CB"
    //                           }));
    //                       }
    //                   }
                  
    //     // for optional holiday part start
    //     var optionHolidayData = {
    //         optionHolidays: [
    //             {
    //                 "name": "BHOGI",
    //                 "date": "2023-01-14"
    //               },
    //               {
    //                 "name": "MAKARA SANKRANTI",
    //                 "date": "2023-01-15"
    //               },
    //               {
    //                 "name": "KANUMA",
    //                 "date": "2023-01-16"
    //               },
    //               {
    //                 "name": "REPUBLIC DAY",
    //                 "date": "2023-01-26"
    //               },
    //               {
    //                 "name": "MAHA SIVARATRI / SHAB-E-MIRAJ",
    //                 "date": "2023-02-18"
    //               },
    //               {
    //                 "name": "HOLi",
    //                 "date": "2023-03-08"
    //               },
    //               {
    //                 "name": "UGADI",
    //                 "date": "2023-03-22"
    //               },
    //               {
    //                 "name": "SRI RAMA NAVAMI",
    //                 "date": "2023-03-30"
    //               },
    //               {
    //                 "name": "BABU JAGIVAN RAM’S BIRTHDAY",
    //                 "date": "2023-04-05"
    //               },
    //               {
    //                 "name": "GOOD FRIDAY",
    //                 "date": "2023-04-07"
    //               },
    //               {
    //                 "name": "DR.B.R. AMBEDKAR’S BIRTHDAY",
    //                 "date": "2023-04-14"
    //               },
    //               {
    //                 "name": "RAMZAN (Eid-ul-Fitr)",
    //                 "date": "2023-04-22"
    //               },
    //               {
    //                 "name": "BAKRID (Eid -ul-Zuha)",
    //                 "date": "2023-06-29"
    //               },
    //               {
    //                 "name": "MOHARRUM",
    //                 "date": "2023-07-29"
    //               },
    //               {
    //                 "name": "INDEPENDENCE DAY",
    //                 "date": "2023-08-15"
    //               },
    //               {
    //                 "name": "SRI KRISHNA ASTAMI",
    //                 "date": "2023-09-06"
    //               },
    //               {
    //                 "name": "VINAYAKA CHAVITHI",
    //                 "date": "2023-09-18"
    //               },
    //               {
    //                 "name": "EID MILADUN NAB! (Birthday of Prophet Mohammad)",
    //                 "date": "2023-09-28"
    //               },
    //               {
    //                 "name": "MAHATMA GANDHI JAYANTHI",
    //                 "date": "2023-10-02"
    //               },
    //               {
    //                 "name": "DURGASTAMI",
    //                 "date": "2023-10-22"
    //               },
    //               {
    //                 "name": "VUAYADASAMI",
    //                 "date": "2023-10-23"
    //               },
    //               {
    //                 "name": "DEEPAVALI",
    //                 "date": "2023-11-12"
    //               },
    //               {
    //                 "name": "CHRISTMAS",
    //                 "date": "2023-12-25"
    //               }
    //         ]
    //       };
    //       var optionHolidayModel = new sap.ui.model.json.JSONModel(optionHolidayData);
    //       this.getView().setModel(optionHolidayModel, "optionHolidayModel");

    //       var optHolidayModel = this.getView().getModel("optionHolidayModel");

    //         oLeg.addItem(new CalendarLegendItem({
    //             type: "Type02",
    //      text: "Optional Holiday",
    //      color:"#FFFF00"
    //  }));
    //  if (optHolidayModel) {
   
    //     var optholidays = optHolidayModel.getProperty("/optionHolidays");

       
    //     var oCalendar = this.byId("calendar");

    //     // Loop through the holidays and add them as special dates
    //     for (var i = 0; i < optholidays.length; i++) {
    //         var holiday = optholidays[i];

    //         oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
    //             startDate: new Date(holiday.date),
    //             type: "Type02",
    //             text: "Optional Holiday",
    //             tooltip: "Optional Holiday",
    //             color:"#FFFF00",
    //             customStyleClass: "DateRangeColor" 
                
               
    //         }));
    //     }
    // }
                // oLeg.removeAllItems();
                // oCalendar.removeAllSpecialDates();

                        // $.ajax({
                        //     url: "/catalog/Holiday",
                        //     method: "GET",
                        //     dataType: "json",
                        //     success: function (data, textStatus) {
       
                        //         // Add a legend item for "Public Holiday" if not already added
                        //         if (!oLeg.getItems().some(item => item.getText() === "Public Holiday")) {
                        //            oLeg.addItem(new CalendarLegendItem({
                        //                  text: "Public Holiday",
                        //                  type: "Type02",
                        //                  color: "rgb(187, 187, 241)"
                        //                }));
                        //             }
      
                        //          // Loop through each public holiday entry and add DateTypeRange for each day
                        //           data.value.forEach(function (holiday) {
                        //               var holidayDate = new Date(holiday.date);
      
                        //                   // Check if the holiday is a weekday (Monday to Friday)
                        //                if (holidayDate.getDay() !== 0 && holidayDate.getDay() !== 6) {
                        //                       // Add DateTypeRange for each day
                        //                      var dateTypeRange = new sap.ui.unified.DateTypeRange({
                        //                              startDate: holidayDate,
                        //                              type: "Type02",
                        //                              color: "rgb(187, 187, 241)"
                        //                          });
      
                        //                        oCalendar.addSpecialDate(dateTypeRange);
                        //                  }
                        //            });
                        //      },
                        //      error: function (jqXHR, textStatus, errorThrown) {
                        //      // Log any errors
                        //              console.error("AJAX Error:", errorThrown);
                        //       }
                        //   });

                        var that =this;
                        var employeeId = that.getEmployeeIdFromURL();
                        var oLeg = this.byId("legend");
                        var oCalendar = this.byId("calendar");

                          $.ajax({
                            url: "/catalog/myLeave" ,
                            method: "GET",
                            dataType: "json",
                            success: function (data, textStatus) {
                              // Filter the data based on the dynamic employeeId
                              var predefinedData =  data.value.filter(function (entry) {
                                return entry.EmpID === employeeId;
                              });
                        
                              // Create a new JSON model for the filtered data
                              var predefinedModel = new sap.ui.model.json.JSONModel(predefinedData);
                        
                              // Set the filtered data model to the table
                              that.getView().setModel(predefinedModel, "myLeaveModel");
                              // Clear existing legend items and special dates on the calenda
                  
                          // Check if there are leaves to display
                          if (predefinedData.length > 0) {
                              // Add a legend item for "Applied Leave" if not already added
                              if (!oLeg.getItems().some(item => item.getText() === "Applied Leave")) {
                                  oLeg.addItem(new CalendarLegendItem({
                                      text: "Applied Leave",
                                      color: "rgb(241, 187, 187)"
                                  }));
                              }
                  
                              // Loop through each leave entry and add DateTypeRange for each day
                              predefinedData.forEach(function (leave) {
                                  var startDate = new Date(leave.FromDt);
                                  var endDate = new Date(leave.ToDt);
                                  var diffDays = 0;
                  
                                  while (startDate <= endDate) {
                                      // Check if the current day is a weekday (Monday to Friday)
                                      if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
                                          diffDays++;
                                          // Add DateTypeRange for each day
                                          var dateTypeRange = new sap.ui.unified.DateTypeRange({
                                              startDate: new Date(startDate),
                                              color: "rgb(241, 187, 187)"
                                          });
                  
                                          oCalendar.addSpecialDate(dateTypeRange);
                                      }
                  
                                      // Move to the next day
                                      startDate.setDate(startDate.getDate() + 1);
                                  }
                              });
                          }
                          },
                            error: function (jqXHR, textStatus, errorThrown) {
                              // Log any errors
                              console.error("AJAX Error:", errorThrown);
                            }
                          });

                          $.ajax({
                            url: "/catalog/OptinalHolidays",
                            method: "GET",
                            dataType: "json",
                            success: function (optionalData, textStatus) {
                                // Add a legend item for "Optional Holiday" if not already added
                                if (!oLeg.getItems().some(item => item.getText() === "Optional Holiday")) {
                                    oLeg.addItem(new CalendarLegendItem({
                                        text: "Optional Holiday",
                                        type: "Type03",
                                        color: "rgb(249, 255, 187)"
                                    }));
                                }
                        
                                // Loop through each optional holiday entry and add DateTypeRange for each day
                                optionalData.value.forEach(function (optionalHoliday) {
                                    var optionalHolidayDate = new Date(optionalHoliday.dates);
                        
                                    // Check if the optional holiday is a weekday (Monday to Friday)
                                    if (optionalHolidayDate.getDay() !== 0 && optionalHolidayDate.getDay() !== 6) {
                                        // Add DateTypeRange for each day
                                        var dateTypeRange = new sap.ui.unified.DateTypeRange({
                                            startDate: optionalHolidayDate,
                                            type: "Type03",
                                            color: "rgb(249, 255, 187)"
                                        });
                        
                                        oCalendar.addSpecialDate(dateTypeRange);
                                    }
                                });
                            },
                            error: function (jqXHR, textStatus, errorThrown) {
                                // Handle errors for the optional holidays AJAX call
                                console.error("Optional Holidays AJAX Error:", errorThrown);
                            }
                        });
                        

          

        // for optional holiday part end
                // for calender
                var oView = this.getView();
                var oList = oView.byId("holidayList"); // Replace with the actual ID of your list control
 
               var rfsmodel = new sap.ui.model.json.JSONModel();
               this.getView().setModel(rfsmodel,'desRequests');
               var url = "/catalog/Holiday";
               $.ajax({
                     url: url,
                     method: "GET",
                     dataType: "json",
                     contentType: "application/json",
                     success: function (data, textStatus, jqXHR) {
                        rfsmodel.setData(data);
                     if (!oLeg.getItems().some(item => item.getText() === "Public Holiday")) {
                        oLeg.addItem(new CalendarLegendItem({
                              text: "Public Holiday",
                              type: "Type02",
                              color: "rgb(187, 187, 241)"
                            }));
                         }

                      // Loop through each public holiday entry and add DateTypeRange for each day
                           data.value.forEach(function (holiday) {
                           var holidayDate = new Date(holiday.date);

                               // Check if the holiday is a weekday (Monday to Friday)
                            if (holidayDate.getDay() !== 0 && holidayDate.getDay() !== 6) {
                                   // Add DateTypeRange for each day
                                  var dateTypeRange = new sap.ui.unified.DateTypeRange({
                                          startDate: holidayDate,
                                          type: "Type02",
                                          color: "rgb(187, 187, 241)"
                                      });

                                    oCalendar.addSpecialDate(dateTypeRange);
                              }
                        });
                        rfsmodel.refresh(true);
            
             },
             error: function (data, jqXHR) {
                   debugger;
            }
         });
            },
            getEmployeeIdFromURL: function () {
              var hash = window.location.hash;
              var parts = hash.split('/');
              return parts[parts.length - 1]; // Extract the last part of the URL
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
                onDateSelect: function (oEvent) {
                    var oSelectedDate = oEvent.getSource().getSelectedDates()[0].getStartDate();
                    var sFormattedDate = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "dd" }).format(oSelectedDate);
                    var sCurrentDay = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "EEEE" }).format(oSelectedDate);
                
                    var rfsmodel = this.getView().getModel("desRequests");
                    // Check if the selected date has a holiday
                    var sHolidayName = this.getHolidayNameForDate(oSelectedDate, rfsmodel);
                
                    var oModel = this.getView().getModel("calendarModel");
                    oModel.setProperty("/currentDate", sFormattedDate);
                    oModel.setProperty("/currentDay", sCurrentDay);
                    rfsmodel.setProperty("/description", sHolidayName); // Add a new property for holidayName
                
                    // Update the Text control with the holiday information
                    var oTextControl = this.getView().byId("todayEventText");
                    if (sHolidayName) {
                        oTextControl.setText("Today Event: " + sHolidayName);
                    } else {
                        oTextControl.setText("Today Event: No holiday");
                    }
                },   
                             
                getHolidayNameForDate: function (selectedDate, rfsmodel) {
                    var sHolidayName ;
                    var holidayData = rfsmodel.getData().value;




































































                    
                
                    console.log("Selected Date:", selectedDate);
                
                    holidayData.forEach(function (holiday) {
                        var holidayDate = new Date(holiday.date);
                        console.log("Holiday Date:", holidayDate);
                
                        if (holidayDate.toDateString() === selectedDate.toDateString()) {
                            sHolidayName = holiday.description;
                        }
                    });
                
                    console.log("Holiday Name:", sHolidayName);
                
                    return sHolidayName;
                }                
        });
    });
