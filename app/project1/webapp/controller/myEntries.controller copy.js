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
                       color:"#FFC0CB",
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
                               // Set the type for yellow color
                               text: "Public Holiday",
                               tooltip: "Public Holiday",
                               color:"#FFC0CB"
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
             color:"#FFFF00",
             customStyleClass: "DateRangeColor" 
             
            
         }));
     }
 }

     // for optional holiday part end
     
     // for leave part model start
     var ApplyleaveModelData = {
      Applyleave: [
          {
              "name": "Personal Leave",
              "date": "2023-11-06"
            },
            {
              "name": "Personal Leave",
              "date": "2023-11-01"
            },
            {
              "name": "Personal Leave",
              "date": "2023-10-02"
            },
            {
              "name": "Personal Leave",
              "date": "2023-09-08"
            },
            {
              "name": "Personal Leave",
              "date": "2023-08-19"
            }
           
      ]
    };

     var applyLeaveModel = new sap.ui.model.json.JSONModel(ApplyleaveModelData);
     this.getView().setModel(applyLeaveModel, "applyLeaveModel");

     var aplLeaveModel = this.getView().getModel("applyLeaveModel");

       oLeg.addItem(new CalendarLegendItem({
           type: "Type03",
    text: "Applied Leave",
    color:"rgba(255, 255, 0, 0.23)"
}));
if (aplLeaveModel) {

   var applyLeaveModelLoop = aplLeaveModel.getProperty("/Applyleave");

  
   var oCalendar = this.byId("calendar");

   // Loop through the holidays and add them as special dates
   for (var i = 0; i < applyLeaveModelLoop.length; i++) {
       var holiday = applyLeaveModelLoop[i];

       oCalendar.addSpecialDate(new sap.ui.unified.DateTypeRange({
           startDate: new Date(holiday.date),
           type: "Type03",
           text: "Applied Leave",
           tooltip: "Applied Leave",
           color:"rgba(255, 255, 0, 0.23)",
           customStyleClass: "DateRangeColor" 
           
          
       }));
   }
}
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

            //  for objectheader card end
        },
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
          oView.byId("description").setValue("");
      
          // Optionally, you can show a cancellation message
          
      },
     onApplyButtonPress:function(){
      var oView = this.getView();

    var oSLNO = oView.byId("slno");
    var oDatePicker = oView.byId("fdate");
    var oTimePicker = oView.byId("TP1");
    var oSelect = oView.byId("leave");
    var oEmpName = oView.byId("EmpName");
    var oEmpID = oView.byId("EmpID");
    var oDescription = oView.byId("description");
    var SLNo = oSLNO.getValue();

  

    var date = oDatePicker.getValue();
    var noOfHours = oTimePicker.getValue();
    var selectedLeaveKey = oSelect.getSelectedKey();
    var EmpName = oEmpName.getValue();
    var EmpID = oEmpID.getValue();
    var description = oDescription.getValue();

     // Validation for myEntries Save Button
     if (
        SLNo === "" ||
        date === "" ||
        noOfHours === "" ||
        selectedLeaveKey === "Select" ||
        EmpName === "" ||
        EmpID === "" ||
        description === ""
    ) {
        // Display an error message
        sap.m.MessageToast.show("Please fill in all the required fields.");
        return; // Do not proceed with saving data
    }

    
    var postData = {
        slNo:SLNo,
        Date: date,
        noOfHours: noOfHours,
        Project: selectedLeaveKey,
        Task: EmpName,
        SubTask: EmpID,
        TaskDescription: description
    };

    
    $.ajax({
        type: "POST",
        url: "/catalog/myEntries", 
        data: JSON.stringify(postData),
        contentType: "application/json",
        success: function (response) {
           alert(response)
        },
        error: function (error) {
            // Handle the error
        }
    });


    var that = this;
            
              
    $.ajax({
        url: "/catalog/myEntries",
        method: "GET",
        dataType: "json",
        success: function (data, textStatus) {
         
           
       
        
            var myEntriesModel = new sap.ui.model.json.JSONModel(data);
            that.getView().setModel(myEntriesModel,"myEntriesModel");
        },
        error: function (jqXHR, textStatus, errorThrown) {
          
        }
    });
         },
   
    
    
         onDeleteMyEntries: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("myEntriesModel");
            var oRowData = oContext.getObject();
            console.log("Clicked Row Data:", oRowData);
                var SlNo = oRowData.slNo;
                var date = oRowData.Date;
                var noOfHours = oRowData.noOfHours;
                 var project = oRowData.Project;
                 var task = oRowData.Task;
                 var subTask = oRowData.SubTask;
               var taskDescription = oRowData.TaskDescription;
                var deleteno = parseInt(SlNo,10)
                console.log("Row Data:", oRowData);
                var that = this;

                var criteriaToDelete = {
                    slNo: SlNo,
                    Date: date,
                    noOfHours: noOfHours,
                    Project: project,
                    Task: task,  
                    SubTask:subTask,
                    TaskDescription:taskDescription
                };
                $.ajax({
                    type: "DELETE",
                    url: "/catalog/myEntries/" + deleteno, // Replace with your service URL
                    data: JSON.stringify(criteriaToDelete),
                    contentType: "application/json",
                    success: function (data, textStatus, jqXHR) {
                        // Handle success, e.g., show a success message
                        that.getView().getModel("myEntriesModel").refresh(true);
                        var oModel = that.getView().getModel("myEntriesModel");
                        sap.m.MessageToast.show("Entry deleted successfully");
                        oModel.updateBindings();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
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
        }).then(function (oDialog) {
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
            var SlNo = oData.slNo;
            var date = oData.Date;
            var deleteno = parseInt(SlNo,10)
            // Make an AJAX request to update the data on the server with oData
            var oView = this.getView();
            var oTimePicker = oView.byId("editNoOfHours");
            var oSelect = oView.byId("editProject");
            var oSubTask = oView.byId("editSubTask");
            var oTask = oView.byId("editTask");
            var oDescription = oView.byId("editTaskDescription");
        
         
            var noOfHours = oTimePicker.getValue();
            var selectedLeaveKey = oSelect.getSelectedKey();
            var SubTask = oSubTask.getValue();
            var Task = oTask.getValue();
            var description = oDescription.getValue();
                var that = this;
                var updatedData = {
                    slNo: SlNo,
                    Date: date,
                    noOfHours: noOfHours,
                    Project: selectedLeaveKey,
                    Task: Task,  
                    SubTask:SubTask,
                    TaskDescription:description
                };
                $.ajax({
                    type: "PATCH",
                    url: "/catalog/myEntries/" + deleteno, // Replace with your service URL
                    data: JSON.stringify(updatedData),
                    contentType: "application/json",
                    success: function (data, textStatus, jqXHR) {
                        // Handle success, e.g., show a success message
                        that.getView().getModel("myEntriesModel").refresh(true);
                        var oModel = that.getView().getModel("myEntriesModel");
                        sap.m.MessageToast.show("Entry deleted successfully");
                        oModel.updateBindings();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
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
        }

        //   _onRouteMatched: function (oEvent) {
        //     var oArguments = oEvent.getParameter("arguments");
        //     var selectedDate = oArguments.date;

        //     // Set the selected date to the model
        //     var oModel = this.getView().getModel();
        //     oModel.setProperty("/date", selectedDate);
        // }
            });
    }
  );
  