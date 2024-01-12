sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/m/HBox",
        "sap/m/Label",
        "sap/m/Input",
        "sap/m/Button",
        "sap/ui/core/Fragment",
        'sap/ui/unified/CalendarLegendItem',
		'sap/ui/unified/DateTypeRange',
		'sap/ui/core/date/UI5Date'
        
    ],
    function(BaseController,HBox,Label,Input,Button,Fragment,CalendarLegendItem,DateTypeRange,UI5Date) {
      "use strict";
  
      return BaseController.extend("timesheet.com.project1.controller.myEntries", {
        onInit() {
            var oDatePicker = this.byId("fdate");

            oDatePicker.setMinDate(null);
            var oMaxDate = new Date();
            oDatePicker.setMaxDate(oMaxDate);
          
            var oModel = new sap.ui.model.json.JSONModel({
                specialDates: [
                    {
                        startDate: new Date("2023-11-01"),
                        endDate: new Date("2023-11-01"),
                        tooltip: "Special Date 1: Additional information"
                    },
                    {
                        startDate: new Date("2023-11-15"),
                        endDate: new Date("2023-11-15"),
                        tooltip: "Special Date 2: Additional information"
                    },
                    // Add more special dates as needed
                ]
            });
            
            this.getView().setModel(oModel);

            this._myDelegate = {
                onmouseover: this._showPopover,
                onmouseout: this._clearPopover,
              };
              this.byId("calendar").addEventDelegate(this._myDelegate, this);
           

         
               // for Public holiday date part start

//                var oCalendar = this.byId("calendar");
//                var oLeg = this.byId("legend");
//                  // new method
//                  var jsonData = {
//                      holidays: [
//                          {
//                              "date": "2023-01-01",
//                              "description": "New Year's Day"
//                            },
                          
//                            {
//                              "date": "2023-04-22",
//                              "description": "Eid-ul-Fitr"
//                            },
                          
//                            {
//                              "date": "2023-04-08",
//                              "description": "Easter"
//                            },
//                            {
//                              "date": "2023-04-09",
//                              "description": "Easter"
//                            },
                          
//                            {
//                              "date": "2023-09-15",
//                              "description": "Janmashtami"
//                            },
                          
                          
//                            {
//                              "date": "2023-10-24",
//                              "description": "Dussehra"
//                            },
                           
                           
//                            {
//                              "date": "2023-11-27",
//                              "description": "Guru Nanak’s Jayanti"
//                            }
//                      ]
//                    };
//                    var HolidayModel = new sap.ui.model.json.JSONModel(jsonData);
//                    this.getView().setModel(HolidayModel, "HolidayModel");

//                    var HModel = this.getView().getModel("HolidayModel");

//                      oLeg.addItem(new CalendarLegendItem({
//                        color:"#FFC0CB",
//                   text: "Public Holiday"
//               }));

//                    if (HModel) {
//                        // Get the array of holidays from the model
//                        var holidays = HModel.getProperty("/holidays");
               
//                        // Get a reference to the Calendar control
//                        var oCalendar = this.byId("calendar");
               
//                        // Loop through the holidays and add them as special dates
//                        for (var i = 0; i < holidays.length; i++) {
//                            var holiday = holidays[i];
               
//                            oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
//                                startDate: new Date(holiday.date),
//                                // Set the type for yellow color
//                                text: "Public Holiday",
//                                tooltip: "Public Holiday",
//                                color:"#FFC0CB"
//                            }));
//                        }
//                    }
               
//      // for optional holiday part start
//      var optionHolidayData = {
//          optionHolidays: [
//              {
//                  "name": "BHOGI",
//                  "date": "2023-01-14"
//                },
//                {
//                  "name": "MAKARA SANKRANTI",
//                  "date": "2023-01-15"
//                },
//                {
//                  "name": "KANUMA",
//                  "date": "2023-01-16"
//                },
//                {
//                  "name": "REPUBLIC DAY",
//                  "date": "2023-01-26"
//                },
//                {
//                  "name": "MAHA SIVARATRI / SHAB-E-MIRAJ",
//                  "date": "2023-02-18"
//                },
//                {
//                  "name": "HOLi",
//                  "date": "2023-03-08"
//                },
//                {
//                  "name": "UGADI",
//                  "date": "2023-03-22"
//                },
//                {
//                  "name": "SRI RAMA NAVAMI",
//                  "date": "2023-03-30"
//                },
//                {
//                  "name": "BABU JAGIVAN RAM’S BIRTHDAY",
//                  "date": "2023-04-05"
//                },
//                {
//                  "name": "GOOD FRIDAY",
//                  "date": "2023-04-07"
//                },
//                {
//                  "name": "DR.B.R. AMBEDKAR’S BIRTHDAY",
//                  "date": "2023-04-14"
//                },
//                {
//                  "name": "RAMZAN (Eid-ul-Fitr)",
//                  "date": "2023-04-22"
//                },
//                {
//                  "name": "BAKRID (Eid -ul-Zuha)",
//                  "date": "2023-06-29"
//                },
//                {
//                  "name": "MOHARRUM",
//                  "date": "2023-07-29"
//                },
//                {
//                  "name": "INDEPENDENCE DAY",
//                  "date": "2023-08-15"
//                },
//                {
//                  "name": "SRI KRISHNA ASTAMI",
//                  "date": "2023-09-06"
//                },
//                {
//                  "name": "VINAYAKA CHAVITHI",
//                  "date": "2023-09-18"
//                },
//                {
//                  "name": "EID MILADUN NAB! (Birthday of Prophet Mohammad)",
//                  "date": "2023-09-28"
//                },
//                {
//                  "name": "MAHATMA GANDHI JAYANTHI",
//                  "date": "2023-10-02"
//                },
//                {
//                  "name": "DURGASTAMI",
//                  "date": "2023-10-22"
//                },
//                {
//                  "name": "VUAYADASAMI",
//                  "date": "2023-10-23"
//                },
//                {
//                  "name": "DEEPAVALI",
//                  "date": "2023-11-12"
//                },
//                {
//                  "name": "CHRISTMAS",
//                  "date": "2023-12-25"
//                }
//          ]
//        };
//        var optionHolidayModel = new sap.ui.model.json.JSONModel(optionHolidayData);
//        this.getView().setModel(optionHolidayModel, "optionHolidayModel");

//        var optHolidayModel = this.getView().getModel("optionHolidayModel");

//          oLeg.addItem(new CalendarLegendItem({
//              type: "Type02",
//       text: "Optional Holiday",
//       color:"#FFFF00"
//   }));
//   if (optHolidayModel) {

//      var optholidays = optHolidayModel.getProperty("/optionHolidays");

    
//      var oCalendar = this.byId("calendar");

//      // Loop through the holidays and add them as special dates
//      for (var i = 0; i < optholidays.length; i++) {
//          var holiday = optholidays[i];

//          oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
//              startDate: new Date(holiday.date),
//              type: "Type02",
//              text: "Optional Holiday",
//              tooltip: "Optional Holiday",
//              color:"#FFFF00",
//              customStyleClass: "DateRangeColor" 
             
            
//          }));
//      }
//  }

//      // for optional holiday part end
     
//      // for leave part model start
//      var ApplyleaveModelData = {
//       Applyleave: [
//           {
//               "name": "Personal Leave",
//               "date": "2023-11-06"
//             },
//             {
//               "name": "Personal Leave",
//               "date": "2023-11-01"
//             },
//             {
//               "name": "Personal Leave",
//               "date": "2023-10-02"
//             },
//             {
//               "name": "Personal Leave",
//               "date": "2023-09-08"
//             },
//             {
//               "name": "Personal Leave",
//               "date": "2023-08-19"
//             }
           
//       ]
//     };

//      var applyLeaveModel = new sap.ui.model.json.JSONModel(ApplyleaveModelData);
//      this.getView().setModel(applyLeaveModel, "applyLeaveModel");

//      var aplLeaveModel = this.getView().getModel("applyLeaveModel");

//        oLeg.addItem(new CalendarLegendItem({
//            type: "Type03",
//     text: "Applied Leave",
//     color:"rgba(255, 255, 0, 0.23)"
// }));
// if (aplLeaveModel) {

//    var applyLeaveModelLoop = aplLeaveModel.getProperty("/Applyleave");

  
//    var oCalendar = this.byId("calendar");

//    // Loop through the holidays and add them as special dates
//    for (var i = 0; i < applyLeaveModelLoop.length; i++) {
//        var holiday = applyLeaveModelLoop[i];

//        oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
//            startDate: new Date(holiday.date),
//            type: "Type03",
//            text: "Applied Leave",
//            tooltip: "Applied Leave",
//            color:"rgba(255, 255, 0, 0.23)",
//            customStyleClass: "DateRangeColor" 
           
          
//        }));
//    }
// }
     // for leave part model end
             // for calender

       
          //this.rowCounter = 0;
           // Create a JSON model and set it to the view
        //    var leaveModel = new sap.ui.model.json.JSONModel({
        //     leaveData: []
        // });
        // this.getView().setModel(leaveModel);

        //   // Attach a route pattern matched handler to the router
        //   var oRouter = this.getOwnerComponent().getRouter();
        //   oRouter.getRoute("myEntries").attachPatternMatched(this._onRouteMatched, this);

            //  for objectheader card start 
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.initialize();

   oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);

            //  new changes 09-11-23

            var that =this;
            var employeeId = that.getEmployeeIdFromURL();
            var oLeg = that.byId("legend");
                var oCalendar = that.byId("calendar");
                oLeg.removeAllItems();
                oCalendar.removeAllSpecialDates();

          
            $.ajax({
              url: "/catalog/myEntries" ,
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
                that.getView().setModel(predefinedModel, "myEntriesModel");
          
               
              },
              error: function (jqXHR, textStatus, errorThrown) {
                // Log any errors
                console.error("AJAX Error:", errorThrown);
              }
            });

            $.ajax({
              url: "/catalog/Holiday",
              method: "GET",
              dataType: "json",
              success: function (data, textStatus) {
                  // ... (previous code)
              
                  // Add a legend item for "Public Holiday" if not already added
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
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  // Log any errors
                  console.error("AJAX Error:", errorThrown);
              }
          });
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

        },
        getEmployeeIdFromURL: function () {
          var hash = window.location.hash;
          var parts = hash.split('/');
          return parts[parts.length - 1]; // Extract the last part of the URL
        },

        handleDateSelect: function (oEvent) {
            var that =this;
            var employeeId = that.getEmployeeIdFromURL()
            var selectedDate = oEvent.getSource().getSelectedDates()[0].getStartDate();

            // Format the selected date
            var dateFormat = sap.ui.core.format.DateFormat.getDateInstance({ pattern: "MM/dd/yy" });
            var formattedDate = dateFormat.format(selectedDate);
        
            // Make AJAX request
            $.ajax({
                url: "/catalog/myEntries",
                method: "GET",
                dataType: "json",
                success: function (data, textStatus) {
                    // Filter the data based on the selected date and employeeId
                    var filteredData = data.value.filter(function (entry) {
                        return entry.EmpID === employeeId && entry.Date === formattedDate;
                    });
        
                    // Create a new JSON model for the filtered data
                    var filteredModel = new sap.ui.model.json.JSONModel(filteredData);
        
                    // Set the filtered data model to the table (replace 'yourTableId' with the actual ID of your table)
                    that.getView().setModel(filteredModel, "myEntriesModel");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    // Log any errors
                    console.error("AJAX Error:", errorThrown);
                }
            });
        },

        //  new changes 09-11-23 end
        // onAddPress: function() {
        //     // Create a new row
        //     var newHBox = new HBox();
        //     var labelClass = "lclass";
        //     var inputClass = "vclass";

        //     newHBox.addItem(new Label({ text: "Date",}));
        //     newHBox.addItem(new Input({ id: "dateInput" + this.rowCounter, width: "95%", class:"vclass" }));
        //     newHBox.addItem(new Label({ text: "Task Title", class: labelClass }));
        //     newHBox.addItem(new Input({ id: "taskTitleInput" + this.rowCounter, width: "95%", class: inputClass }));
        //     newHBox.addItem(new Label({ text: "Task Description", class: labelClass }));
        //     newHBox.addItem(new Input({ id: "taskDescriptionInput" + this.rowCounter, width: "95%", class: inputClass }));
        //     newHBox.addItem(new Label({ text: "Project", class: labelClass}));
        //     newHBox.addItem(new Input({ id: "projectInput" + this.rowCounter, width: "95%", class: inputClass }));
        //     newHBox.addItem(new Label({ text: "No. of Hours", class: labelClass }));
        //     newHBox.addItem(new Input({ id: "hoursInput" + this.rowCounter, class: labelClass, width: "95%", class: inputClass  }));
        //     newHBox.addItem(new Button({ text: "",icon:"sap-icon://less", press: this.onRemovePress.bind(this, this.rowCounter), class:"btnclass" }));
            
      
        //     // Add the new row to the dynamic form
        //     var oDynamicForm = this.getView().byId("dynamicForm");
        //     oDynamicForm.addItem(newHBox);
      
        //     // Increment the counter for unique IDs
        //     this.rowCounter++;
        //   },
  
       
        //   onRemovePress: function(rowCounter) {
        //     // Remove the clicked row when the "Remove" button is pressed
        //     var oDynamicForm = this.getView().byId("dynamicForm");
        //     var rowToRemove = oDynamicForm.getItems()[rowCounter];
        //     oDynamicForm.removeItem(rowToRemove);
        //   },

//         onApplyButtonPress: function () {
//           var oView = this.getView();
//           var leaveModel = oView.getModel();
//           var oData = leaveModel.getData();
      
//           // Retrieve data from the form inputs
//           var sEmpName = oView.byId("EmpName").getValue();
//           var sEmpID = oView.byId("EmpID").getValue();
//           var sToL = oView.byId("leave").getSelectedKey();
//           var sFDate = oView.byId("fdate").getValue();
//           var startTime = oView.byId("TP").getValue();
//           var endTime = oView.byId("TP1").getValue();
//           var sTDate = oView.byId("tdate").getValue();
//           var sDescription = oView.byId("description").getValue();

//           var sFromDateStr = sFDate + " " + startTime;
//           var sToDateStr = sTDate + " " + endTime;
        
//           var sFromDate = new Date(sFromDateStr);
//           var sToDate = new Date(sToDateStr);

//           var timeDifference = sToDate - sFromDate;

// // Calculate the total time spent in hours
// var totalHours = timeDifference / (1000 * 60 * 60);

//           // Check if any of the required fields is empty
//           if (!sEmpName || !sEmpID || sToL === "Select" || !sFDate || !sTDate || !sDescription) {
//               // Show a warning message
//               sap.m.MessageToast.show("Please fill in all the required fields.");
//           } else {
//               // Create a new leave entry
//               var newLeaveEntry = {
//                   EmpName: sEmpName,
//                   EmpID: sEmpID,
//                   ToL: sToL,
//                   fdate: sFDate,
//                   tdate: sTDate,
//                   description: sDescription,
//                   hour:totalHours,
//               };
      
//               // Add the new entry to the data model
//               oData.leaveData.push(newLeaveEntry);
//               leaveModel.setData(oData);
      
//               // Clear form inputs after submission
//               oView.byId("EmpName").setValue("");
//               oView.byId("EmpID").setValue("");
//               oView.byId("leave").setSelectedKey("Select");
//               oView.byId("fdate").setValue("");
//               oView.byId("tdate").setValue("");
//               oView.byId("description").setValue("");
      
//               // Optionally, you can show a success message here
//               sap.m.MessageToast.show("Leave request submitted successfully.");
//           }
//       },
      onCancelPress: function () {
          var oView = this.getView();
      
          // Clear form inputs
          oView.byId("slno").setValue("");
          oView.byId("EmpName").setValue("");
          oView.byId("EmpID").setValue("");
          oView.byId("leave").setSelectedKey("Select");
          oView.byId("fdate").setValue("");
          oView.byId("TP1").setValue("");
          oView.byId("status").setSelectedKey("Select");
          oView.byId("description").setValue("");
         
          // Optionally, you can show a cancellation message
          sap.m.MessageToast.show("Entry Data cancelled.");
      },
     onApplyButtonPress:function(){
      var oView = this.getView();
      var oEmpId = oView.byId("Empid");
    // var oSLNO = oView.byId("slno");
    var oDatePicker = oView.byId("fdate");
    var oTimePicker = oView.byId("TP1");
    var oSelect = oView.byId("leave");
    var oEmpName = oView.byId("EmpName");
    var oEmpID = oView.byId("EmpID");
    var oStatus = oView.byId("status");
    var oDescription = oView.byId("description");
    // var SLNo = oSLNO.getValue();

  
    var empID = oEmpId.getValue();
    var date = oDatePicker.getValue();
    var noOfHours = oTimePicker.getValue();
    var selectedLeaveKey = oSelect.getSelectedKey();
    var EmpName = oEmpName.getValue();
    var EmpID = oEmpID.getValue();
    var status=oStatus.getSelectedKey();
    var description = oDescription.getValue();

     // Validation for myEntries Save Button
     if (
          empID === "" ||
        // SLNo === "" ||
        date === "" ||
        noOfHours === "" ||
        selectedLeaveKey === "Select" ||
        EmpName === "" ||
        EmpID === "" ||
        status === "" ||
        description === ""
    ) {
        // Display an error message
        sap.m.MessageToast.show("Please fill in all the required fields.");
        return; // Do not proceed with saving data
    }
    var myEntriesModel = this.getView().getModel("myEntriesModel");
    var entries = myEntriesModel.getProperty("/");
    var SLNo = (entries.length + 1).toString();
    
    var postData = {
      EmpID: empID,
        slNo:SLNo,
        Date: date,
        noOfHours: noOfHours + " Hours",
        Project: selectedLeaveKey,
        Task: EmpName,
        SubTask: EmpID,
        Status:status,
        TaskDescription: description
    };

    
    $.ajax({
      url: "/catalog/myEntries",
      method: "POST",
      data: JSON.stringify(postData), // Convert the data object to JSON
      contentType: "application/json", // Set content type to JSON
      success: function (response, textStatus) {
        //   alert(response);
          // Handle success, if needed
          console.log("Data added successfully:", response);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          // Handle errors
          console.error("Error adding data:", errorThrown);
      }
  });


  var that = this;
  var progressIndicator = this.getView().byId("progressIndicator");
  switch (status) {
      case "Completed":
          progressIndicator.setPercentValue(100);
          progressIndicator.setState("Information");
          progressIndicator.setDisplayValue("Completed");
          break;
      case "Pending":
          progressIndicator.setPercentValue(25);
          progressIndicator.setState("Error");
          progressIndicator.setDisplayValue("Pending");
          break;
      case "In Progress":
          progressIndicator.setPercentValue(70);
          progressIndicator.setState("Success");
          progressIndicator.setDisplayValue("In Progress");
          break;
      default:
          // Handle other cases or set default values
          break;
  }

  // Get the dynamic employeeId from the input field or any other source
  var employeeId = that.getView().byId("Empid").getValue();
  console.log("Employee ID: " + employeeId);

  $.ajax({
      url: "/catalog/myEntries",
      method: "GET",
      dataType: "json",
      success: function(data, textStatus) {
          // Log the retrieved data
          console.log("Data retrieved:", data);

          // Filter the data based on the dynamic employeeId
          var filteredData = data.value.filter(function(entry) {
              return entry.EmpID === employeeId;
          });
          console.log("Filtered Data:", filteredData);

          // Create a new JSON model for the filtered data
          var filteredModel = new sap.ui.model.json.JSONModel(filteredData);

          // Set the filtered data model in your view
          that.getView().setModel(filteredModel, "myEntriesModel");
          sap.m.MessageToast.show("Your Entry Data added successfully");
          filteredModel.refresh(true);

          // Clear the input field
        //   that.getView().byId("slno").setValue("");
          that.getView().byId("fdate").setValue("");
          that.getView().byId("TP1").setValue("");
          that.getView().byId("leave").setSelectedKey("Select");
          that.getView().byId("EmpName").setValue("");
          that.getView().byId("EmpID").setValue("");
          that.getView().byId("status").setSelectedKey("Select");
          that.getView().byId("description").setValue("");

      },
      error: function(jqXHR, textStatus, errorThrown) {
          // Log any errors
          console.error("AJAX Error:", errorThrown);
      }
  });
         },
   
    
    
         onDeleteMyEntries: function (oEvent) {
          var oButton = oEvent.getSource();
          var oContext = oButton.getBindingContext("myEntriesModel");
          var oRowData = oContext.getObject();
          console.log("Clicked Row Data:", oRowData);
          var EmpId = oRowData.EmpID
          var SlNo = oRowData.slNo;
          // var date = oRowData.Date;
          // var noOfHours = oRowData.noOfHours;
          // var project = oRowData.Project;
          // var task = oRowData.Task;
          // var subTask = oRowData.SubTask;
          // var taskDescription = oRowData.TaskDescription;
          // var deleteno = parseInt(SlNo, 10)
          console.log("Row Data:", oRowData);
          var that = this;
          if (!EmpId || !SlNo) {
              sap.m.MessageToast.show("Invalid data for deletion");
              return;
          }
          var url = "/catalog/myEntries/" + EmpId + "/" + SlNo;

          // var criteriaToDelete = {
          //     EmpID: EmpId,
          //     slNo: SlNo,
          //     Date: date,
          //     noOfHours: noOfHours,
          //     Project: project,
          //     Task: task,
          //     SubTask: subTask,
          //     TaskDescription: taskDescription
          // };
          $.ajax({
              type: "DELETE",
              url: url,
              contentType: "application/json",
              success: function(data, textStatus, jqXHR) {
                  // Handle success, e.g., show a success message
                  var oModel = that.getView().getModel("myEntriesModel");
                  var aData = oModel.getData();
                  var iIndexToDelete = aData.findIndex(entry => entry.EmpID === EmpId && entry.slNo === SlNo);
      
                  if (iIndexToDelete !== -1) {
                  aData.splice(iIndexToDelete, 1);
                  oModel.setData(aData); // Update the model data
                 }
      
                  sap.m.MessageToast.show("Entry Data deleted successfully");
             },
              error: function(jqXHR, textStatus, errorThrown) {
                  // Handle errors, e.g., show an error message
                  sap.m.MessageToast.show("Failed to delete the entry: " + errorThrown);
              }
          });
        },

        // for edit myEntries
        onEditMyEntries:function(oEvent){
          var oButton = oEvent.getSource();
          var oContext = oButton.getBindingContext("myEntriesModel");
          var oRowData = oContext.getObject();

          // Create a JSON model for the edit dialog
          var oEditModel = new sap.ui.model.json.JSONModel(oRowData);
          this.getView().setModel(oEditModel, "editModel");

          // Create the edit dialog
          if (!this.byId("editDialog")) {
              var oView = this.getView();
              Fragment.load({
                  id: oView.getId(),
                  name: "timesheet.com.project1.view.Fragments.myEntries",
                  controller: this,
              }).then(function(oDialog) {
                  oView.addDependent(oDialog);
                  oDialog.open();
              });
          } else {
              this.byId("editDialog").open();
          }
        },
        onEditSaveButtonPress: function () {
            // Handle the save button press in the edit dialog
            var oEditModel = this.getView().getModel("editModel");
            var oData = oEditModel.getData();
            var EmpId=oData.EmpID;
            var SlNo = oData.slNo;
            var date = oData.Date;
            // var deleteno = parseInt(SlNo, 10)
                // Make an AJAX request to update the data on the server with oData
            var oView = this.getView();
            var oTimePicker = oView.byId("editNoOfHours");
            var oSelect = oView.byId("editProject");
            var oSubTask = oView.byId("editSubTask");
            var oTask = oView.byId("editTask");
            var oStatus = oView.byId("editstatus");
            var oDescription = oView.byId("editTaskDescription");


            var noOfHours = oTimePicker.getValue();
            var selectedLeaveKey = oSelect.getSelectedKey();
            var SubTask = oSubTask.getValue();
            var Task = oTask.getValue();
            var statused = oStatus.getSelectedKey();
            var description = oDescription.getValue();
            var that = this;
            var updatedData = {
                EmpID:EmpId,
                slNo: SlNo,
                Date: date,
                noOfHours: noOfHours + " Hours",
                Project: selectedLeaveKey,
                Task: Task,
                SubTask: SubTask,
                Status : statused,
                TaskDescription: description
            };
            var progressIndicator = this.getView().byId("progressIndicator");
             switch (statused) {
               case "Completed":
                      progressIndicator.setPercentValue(100);
                      progressIndicator.setState("Information");
                      progressIndicator.setDisplayValue("Completed");
                      break;
              case "Pending":
                      progressIndicator.setPercentValue(25);
                      progressIndicator.setState("Error");
                      progressIndicator.setDisplayValue("Pending");
                      break;
             case "In Progress":
                      progressIndicator.setPercentValue(70);
                      progressIndicator.setState("Success");
                      progressIndicator.setDisplayValue("In Progress");
                      break;
             default:
                // Handle other cases or set default values
                     break;
            }
            $.ajax({
                type: "PATCH",
                url: "/catalog/myEntries/" +EmpId + "/" + SlNo, // Replace with your service URL
                data: JSON.stringify(updatedData),
                contentType: "application/json",
                success: function(data, textStatus, jqXHR) {
                    // Handle success, e.g., show a success message
                    var oModel = that.getView().getModel("myEntriesModel");
                    var aData = oModel.getData();
                    var entryToUpdate = aData.find(entry => entry.EmpID === EmpId && entry.slNo === SlNo);
                    if (entryToUpdate) {
                    Object.assign(entryToUpdate, updatedData);
                    oModel.refresh(true); // Trigger a refresh to update the UI
                  }

                  sap.m.MessageToast.show("Entry Data updated successfully");

                //   clear the field
                  oTimePicker.setValue(""); 
                  oSelect.setSelectedKey(""); 
                  oSubTask.setValue(""); 
                  oTask.setValue(""); 
                  oStatus.setSelectedKey("");
                  oDescription.setValue(""); 

                 },
                error: function(jqXHR, textStatus, errorThrown) {
                    // Handle errors, e.g., show an error message
                    sap.m.MessageToast.show("Failed to delete the entry: " + errorThrown);
                }




            });

            this.byId("editDialog").close();
        },
        
        onEditCancelButtonPress: function () {
            // Handle the cancel button press in the edit dialog
        
            // Close the edit dialog
            this.byId("editDialog").close();
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
        handleCalendarSelected: function(oEvent) {
            // Get the selected date from the calendar event
            const oCalendar = oEvent.getSource();
            const oSelectedDate = oCalendar.getSelectedDates()[0]; 

            if (oSelectedDate) {
                const oFromDateDatePicker = this.getView().byId("fdate"); 
                const oSelectedDateValue = oSelectedDate.getStartDate(); 

                // Set the "From Date" DatePicker's value to the selected date
                oFromDateDatePicker.setDateValue(oSelectedDateValue);
            }
        },
        _showPopover: function (oEvent) {
            var that= this;
            this._timeId = setTimeout(() => {
                // Get the source of the event (assuming it is the calendar control)
                var oCalendar = oEvent.srcControl;
        
                // Check if the calendar exists
                if (oCalendar) {
                    // Get the date from the cell that the mouse is over
                    var oHoveredDate = that._getDateFromMouseEvent(oEvent);
        
                    // Create a new popover
                    that._popover = new sap.m.Popover();
        
                    // Create content for the popover (replace this with your content)
                    const content = new sap.m.Text({
                        text: oHoveredDate,
                    });
        
                    // Add the content to the popover
                    that._popover.addContent(content);
        
                    // Open the popover by the calendar control
                    that._popover.openBy(oCalendar);
                }
            }, 500);
        },
        
        _clearPopover: function () {
            if (this._popover) {
                this._popover.close();
                this._popover.destroy(); // destroy the popover to avoid memory leaks
                clearTimeout(this._timeId);
            }
        },
        onExit: function() {
            this._clearPopover();
            this.byId("calendar").removeEventDelegate(this._myDelegate);
        },
        _getDateFromMouseEvent: function (oEvent) {
            // Get the target element from the event
            var oTarget = oEvent.srcControl;
        
            // Check if the target element is a control and its metadata matches the expected type
            if (oTarget && oTarget.getMetadata().getName() === "sap.ui.unified.DatePicker") {
                // Extract the date from the target element (adjust this part based on your HTML structure)
                var oHoveredDate = oTarget.getDateValue();
                
                return oHoveredDate;
            }
        
            // Return null or any other indicator if the mouse is not over a date cell
            return null;
        },
        onPIChangeValueButtonPressed: function (oEvent) {
            var sSourceId = oEvent.getSource().getId(),
                sButton = 'button',
                iIndexOfButton = sSourceId.indexOf(sButton),
                oProgressIndicator = this.getView().byId(sSourceId.substring(0, iIndexOfButton - 1)),
                sValue = sSourceId.substring(iIndexOfButton + sButton.length),
                sPreviousValue = oProgressIndicator.getDisplayValue(),
                sAccText;
        
            oProgressIndicator.setDisplayValue(sValue + '%');
            oProgressIndicator.setPercentValue(+sValue);
        
            // Add conditional statements to set state based on the percentage value
            if (+sValue === 0) {
                oProgressIndicator.setState(sap.ui.core.ValueState.Error);
            } else if (+sValue === 50) {
                oProgressIndicator.setState(sap.ui.core.ValueState.Warning);
            } else if (+sValue === 100) {
                oProgressIndicator.setState(sap.ui.core.ValueState.Success);
            } else {
                // If you want to reset the state for other values, you can add a default state here
                oProgressIndicator.setState(sap.ui.core.ValueState.None);
            }
        
            setTimeout(function () {
                sAccText = "Previous value was " + sPreviousValue + ". New value is " + sValue + "%.";
                InvisibleMessage.getInstance().announce(sAccText);
            });
        }
        

        //   _onRouteMatched: function (oEvent) {
        //     var oArguments = oEvent.getParameter("arguments");
        //     var selectedDate = oArguments.date;

        //     // Set the selected date to the model
        //     var oModel = this.getView().getModel();
        //     oModel.setProperty("/date", selectedDate);
        // }
            });
    });
  