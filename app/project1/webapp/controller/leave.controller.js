sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment",
        'sap/ui/unified/CalendarLegendItem'
        
    ],
    function(BaseController,Fragment,CalendarLegendItem) {
      "use strict";
  
      return BaseController.extend("timesheet.com.project1.controller.leave", {
        onInit() {
            var oDatePicker = this.byId("fdate");
            var oDate =this.byId("tdate");
            oDatePicker.setMaxDate(null);
            var oMinDate = new Date();
            oDatePicker.setMinDate(oMinDate);
            oDate.setMaxDate(null);
            var oMinDates = new Date();
            oDate.setMinDate(oMinDates);
         // Create a JSON model and set it to the view
         var leaveModel = new sap.ui.model.json.JSONModel({
            leaveData: []
        });
        this.getView().setModel(leaveModel);

        var oRouter = this.getOwnerComponent().getRouter();
                oRouter.initialize();

                 oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);

                 var remainingLeaveModel = new sap.ui.model.json.JSONModel({
                     RemainingLeave: 20
               });
              this.getView().setModel(remainingLeaveModel, "remainingLeaveModel");

              var that =this;
                var employeeId = that.getEmployeeIdFromURL();
                var oLeg = that.byId("legend");
                var oCalendar = that.byId("calendar");
                // oLeg.removeAllItems();
                // oCalendar.removeAllSpecialDates();

              
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
                        // oCalendar.rerender();
                    });
                }
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
                            // oCalendar.rerender();
                        });
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
                        //  oCalendar.rerender();
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
        onApplyButtonPress:function(){
            var oView = this.getView();
      
          // Access the input controls using this.getView().byId()
          var oEmpId = oView.byId("Empid");
        //   var oSLNO = oView.byId("slNo");
          var oSelect = oView.byId("leave");
          var oFromDate = oView.byId("fdate");
          var oToDate = oView.byId("tdate");
          var oDescription = oView.byId("description");
      
          // Get the values from the input controls
          var empID = oEmpId.getValue();
        //   var SlNo = oSLNO.getValue();
          var selectedLeaveKey = oSelect.getSelectedKey();
          var FromDate = oFromDate.getValue();
          var ToDate = oToDate.getValue();
          var description = oDescription.getValue();
          var fullDayRadioButton = oView.byId("fullDayRadioButton");
          var halfDayRadioButton = oView.byId("halfDayRadioButton");
          var firstshiftRadioButton = oView.byId("firstshiftRadioButton");
          var secondshiftRadioButton = oView.byId("secondshiftRadioButton");


          var isHalfDay = halfDayRadioButton.getSelected();
          var chooseOptionLabel = oView.byId("chooseOption");
             // Check if any of the required fields are empty
    if (
        // SlNo === "" ||
        selectedLeaveKey === "Select" ||
        FromDate === "" 
        
        // description === ""
    ) {
        // Display an error message
        sap.m.MessageToast.show("Please fill in all the required fields.");
        return; // Do not proceed with saving data
    }
    
         // Calculate the number of days based on the leave type and half-day selection
         var startDate = new Date(FromDate);
         var endDate = new Date(ToDate);
          var diffDays = 0;

               // Check if the selected leave type is Casual Leave and it's a half day
           if (selectedLeaveKey === "Casual leave" && isHalfDay) {
                diffDays = 0.5; // Set day count to 0.5 for half day
                ToDate=FromDate;

                var casualLeaveType = oView.byId("casualLeaveType").getSelectedButton().getText();
                var Shift = oView.byId("shift").getSelectedButton().getText();

             } else {
                if (ToDate < FromDate) {
                    // Display an error message
                    sap.m.MessageToast.show("To Date cannot be before From Date.");
                    return; // Do not proceed with saving data
                }
                   
                    // Iterate through each day between startDate and endDate
              while (startDate <= endDate) {
                  // Check if the current day is a weekday (Monday to Friday)
                  if (startDate.getDay() !== 0 && startDate.getDay() !== 6) {
                       diffDays++;


                        startDate.setDate(startDate.getDate() + 1);
                   }
                    
              
       
                 
                }
             }
            
             
                 // Get the existing total leaves applied from the model
                      var myLeaveModel = this.getView().getModel("myLeaveModel");
                      var totalLeavesApplied = 0;

                    if (myLeaveModel) {
                         var leaves = myLeaveModel.getProperty("/");
                         leaves.forEach(function (leave) {
                             // Accumulate the total leaves already applied
                                 totalLeavesApplied += parseFloat(leave.noOfDates.split(" ")[0]);
                       });
                 }

             // Deduct the applied leave from the yearly leave allowance
              var totalLeaveInYear = 20; // Change this according to your actual total leave count
              var remainingLeave = totalLeaveInYear - totalLeavesApplied;
              var SlNo = (leaves.length + 1).toString();
               if (remainingLeave >= diffDays) {
                      // Sufficient leave balance, deduct the applied leave
                      remainingLeave -= diffDays;
                 } else{
                    console.log("Insufficient");
                    return;
                 }

                 var remainingLeaveModel = new sap.ui.model.json.JSONModel({
                    RemainingLeave: remainingLeave
                });
                this.getView().setModel(remainingLeaveModel, "remainingLeaveModel");

          // Create an object with the user input data
           var postData = {

            EmpID: empID,
            slNo:SlNo,
            LeaveType:selectedLeaveKey,
            FromDt:FromDate,
            ToDt:ToDate,
            Description:description,
            noOfDates:diffDays + " Days",
            shift: Shift
          };
          if (remainingLeave < diffDays) {
            // Show a warning message
            sap.m.MessageBox.warning("Insufficient leave balance. You cannot apply for more leave than the remaining balance.", {
                title: "Warning",
                actions: [sap.m.MessageBox.Action.OK]
            });
            return; // Do not proceed with saving data
        }
          // Perform a POST request to save data to your backend service
          $.ajax({
            url: "/catalog/myLeave",
            method: "POST",
            data: JSON.stringify(postData), // Convert the data object to JSON
            contentType: "application/json", // Set content type to JSON
            success: function (response, textStatus) {
                // alert(response);
                // Handle success, if needed
                console.log("Data added successfully:", response);


                fullDayRadioButton.setSelected(false);
                halfDayRadioButton.setSelected(false);

                firstshiftRadioButton.setSelected(false);
                secondshiftRadioButton.setSelected(false);

                       sap.m.MessageBox.information("Remaining Leave in Year after deduction: " + remainingLeave, {
                        title: "Remaining Leave",
                        actions: [sap.m.MessageBox.Action.OK]
                    });
                
            // oSLNO.setValue("");
            oSelect.setSelectedKey("");
            oFromDate.setValue("");
            oToDate.setValue("");
            oDescription.setValue("");

            
            
            fullDayRadioButton.setSelected(false);
            halfDayRadioButton.setSelected(false);
            // casualLeaveType.setSelectedIndex(-1);
            // Shift.setSelectedIndex(-1);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Handle errors
                console.error("Error adding data:", errorThrown);
            }
        });
    
      
        var that = this;
        var employeeId = that.getView().byId("Empid").getValue();
        console.log("Employee ID: " + employeeId);
        
        
        $.ajax({
            url: "/catalog/myLeave",
            method: "GET",
            dataType: "json",
            success: function (data, textStatus) {
                // Log the retrieved data
                console.log("Data retrieved:", data);
        
                // Filter the data based on the dynamic employeeId
                var filteredData = data.value.filter(function (entry) {
                    return entry.EmpID === employeeId;
                });
                console.log("Filtered Data:", filteredData);
        
                // Create a new JSON model for the filtered data
                var myLeaveModel = new sap.ui.model.json.JSONModel(filteredData);
                that.getView().setModel(myLeaveModel, "myLeaveModel");
        
                // Clear existing legend items and special dates on the calendar
                var oLeg = that.byId("legend");
                var oCalendar = that.byId("calendar");
                // oLeg.removeAllItems();
                // oCalendar.removeAllSpecialDates();
        
                // Check if there are leaves to display
                if (filteredData.length > 0) {
                    // Add a legend item for "Applied Leave" if not already added
                    if (!oLeg.getItems().some(item => item.getText() === "Applied Leave")) {
                        oLeg.addItem(new CalendarLegendItem({
                            text: "Applied Leave",
                            color: "rgb(241, 187, 187)"
                        }));
                    }
        
                    // Loop through each leave entry and add DateTypeRange for each day
                    filteredData.forEach(function (leave) {
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
        
                // Refresh the calendar to apply the changes
                // oCalendar.rerender();
        
                sap.m.MessageToast.show("Leave request added successfully !");
                myLeaveModel.refresh(true);
                // oCalendar.getModel().refresh(true);
                // oLeg.getModel().refresh();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // Log any errors
                console.error("AJAX Error:", errorThrown);
            }
        });
        

    } ,
      
        onCancelPress: function () {
            var oView = this.getView();
        
            // Clear form inputs
           
            oView.byId("slNo").setValue("");
            oView.byId("leave").setSelectedKey("Select");
            oView.byId("fdate").setValue("");
            oView.byId("tdate").setValue("");
            oView.byId("description").setValue("");
        
            // Optionally, you can show a cancellation message
            sap.m.MessageToast.show("Leave request cancelled.");
        },
        onDeleteMyLeave: function (oEvent) {
            var oButton = oEvent.getSource();
                var oContext = oButton.getBindingContext("myLeaveModel");
                var oRowData = oContext.getObject();
                console.log("Clicked Row Data:", oRowData);
                var EmpId = oRowData.EmpID
                var SlNo = oRowData.slNo;
                console.log("Row Data:", oRowData);
                var that = this;
                if (!EmpId || !SlNo) {
                    sap.m.MessageToast.show("Invalid data for deletion");
                    return;
                }
                var url = "/catalog/myLeave/" + EmpId + "/" + SlNo;

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
                        var oModel = that.getView().getModel("myLeaveModel");
                        var aData = oModel.getData();
                        var iIndexToDelete = aData.findIndex(entry => entry.EmpID === EmpId && entry.slNo === SlNo);
            
                        if (iIndexToDelete !== -1) {
                        aData.splice(iIndexToDelete, 1);
                        oModel.setData(aData); // Update the model data
                       }
            
                        sap.m.MessageToast.show("Leave request deleted successfully");
                   },
                    error: function(jqXHR, textStatus, errorThrown) {
                        // Handle errors, e.g., show an error message
                        sap.m.MessageToast.show("Failed to delete the entry: " + errorThrown);
                    }
                });
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
        onEditMyLeave: function(oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("myLeaveModel");
            var oRowData = oContext.getObject();

            // Create a JSON model for the edit dialog
            var oEditModel = new sap.ui.model.json.JSONModel(oRowData);
            this.getView().setModel(oEditModel, "editModels");

            // Create the edit dialog
            if (!this.byId("editDialogbox")) {
                var oView = this.getView();
                Fragment.load({
                    id: oView.getId(),
                    name: "timesheet.com.project1.view.Fragments.leaves",
                    controller: this,
                }).then(function(oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("editDialogbox").open();
            }
        },
                onEditSaveButtonPress: function () {
                    var oEditModel = this.getView().getModel("editModels");
                    var oData = oEditModel.getData();
                    var EmpId = oData.EmpID;
                    var SlNo = oData.slNo;
                
                    var oView = this.getView();
                    var oSelect = oView.byId("leaveedit");
                    var oDatePickers = oView.byId("startdate");
                    var oDatePicker = oView.byId("enddate");
                    var oDescription = oView.byId("descriptions");
                    var fullDayRadioButtons = oView.byId("fullDayRadioButtons");
                    var halfDayRadioButtons = oView.byId("halfDayRadioButtons");
                    var firstshiftRadioButtons = oView.byId("firstshiftRadioButton");
                    var secondshiftRadioButtons = oView.byId("secondshiftRadioButton");
          
                    var isHalfDays = halfDayRadioButtons.getSelected();
          
                
                    var selectedLeaveKey = oSelect.getSelectedKey();
                    var fromDate = oDatePickers.getValue();
                    var toDate = oDatePicker.getValue();
                    var description = oDescription.getValue();
        
        
                    // Calculate the number of days based on the leave type and half-day selection
                   var startingDate = new Date(fromDate);
                   var endingDate = new Date(toDate);
                   var diffDays = 0;
        
                       // Check if the selected leave type is Casual Leave and it's a half day
                   if (selectedLeaveKey === "Casual leave" && isHalfDays) {
                        diffDays = 0.5; // Set day count to 0.5 for half day
                        toDate=fromDate;
        
                        // var casualLeaveType = oView.byId("casualLeaveType").getSelectedButton().getText();
                        var Shift = oView.byId("shifts").getSelectedButton().getText();
                     } else {
                      // Iterate through each day between startDate and endDate
                      while (startingDate <= endingDate) {
                          // Check if the current day is a weekday (Monday to Friday)
                          if (startingDate.getDay() !== 0 && startingDate.getDay() !== 6) {
                            diffDays++;
                }
        
                // Move to the next day
                startingDate.setDate(startingDate.getDate() + 1);
            }
        }
        var myLeaveModel = this.getView().getModel("myLeaveModel");
var totalLeavesApplied = 0; // Initialize totalLeavesApplied

// Get the selected item and update the leave
var leaveTable = this.getView().byId("leaveTable");
var selectedItems = leaveTable.getSelectedItems();

if (selectedItems.length === 1) {
    var selectedItem = selectedItems[0];
    var selectedIndex = leaveTable.indexOfItem(selectedItem);

    var selectedLeave = myLeaveModel.getProperty("/")[selectedIndex];

    // Deduct the initially applied leave from the yearly leave allowance
    totalLeavesApplied -= parseFloat(selectedLeave.initiallyApplied.split(" ")[0]);

    // Update the number of days for the selected leave (assuming "newNumberOfDays" is the new value)
    selectedLeave.noOfDates = newNumberOfDays + " days"; // Update as needed

    // Accumulate the total leaves already applied with the edited and initial leave
    totalLeavesApplied += parseFloat(selectedLeave.initiallyApplied.split(" ")[0]);
    totalLeavesApplied += parseFloat(selectedLeave.noOfDates.split(" ")[0]);

    // Update the initially applied leave for the selected entry
    selectedLeave.initiallyApplied = selectedLeave.noOfDates;

    // Update the model with the modified leave
    myLeaveModel.setProperty("/" + selectedIndex, selectedLeave);
}
var totalLeaveInYear = 20;
// Calculate the remaining leave by deducting the totalLeavesApplied
var remainingLeave = totalLeaveInYear - totalLeavesApplied;

// Deduct the applied leave from the remaining leave
if (remainingLeave >= diffDays) {
    remainingLeave -= diffDays;
} else {
    console.log("Insufficient");
    return;
}

// Update the Remaining Leave model
var remainingLeaveModel = new sap.ui.model.json.JSONModel({
    RemainingLeave: remainingLeave
});
this.getView().setModel(remainingLeaveModel, "remainingLeaveModel");

                    var updatedData = {
                        EmpID: EmpId,
                        slNo: SlNo,
                        LeaveType: selectedLeaveKey,
                        FromDt: fromDate,
                        ToDt:toDate,
                        Description: description,
                        noOfDates: diffDays + " Days",
                        shift: Shift
                    };
                    if (remainingLeave < diffDays) {
                        // Show a warning message
                        sap.m.MessageBox.warning("Insufficient leave balance. You cannot apply for more leave than the remaining balance.", {
                            title: "Warning",
                            actions: [sap.m.MessageBox.Action.OK]
                        });
                        return; // Do not proceed with saving data
                    }
                
                    $.ajax({
                        type: "PATCH",
                        url: "/catalog/myLeave/" + EmpId + "/" + SlNo, // Replace with your service URL
                        data: JSON.stringify(updatedData),
                        contentType: "application/json"
                    })
                    .done(function (data, textStatus, jqXHR) {
                        var oModel = this.getView().getModel("myLeaveModel");
                        var aData = oModel.getData();
                        var entryToUpdate = aData.find(entry => entry.EmpID === EmpId && entry.slNo === SlNo);
                        if (entryToUpdate) {
                            Object.assign(entryToUpdate, updatedData);
                            oModel.refresh(true); // Trigger a refresh to update the UI
                        }
                
                        sap.m.MessageToast.show("Leave request updated successfully");
        
                        fullDayRadioButtons.setSelected(false);
                        halfDayRadioButtons.setSelected(false);
        
                        firstshiftRadioButtons.setSelected(false);
                        secondshiftRadioButtons.setSelected(false);
        
                        sap.m.MessageBox.information("Remaining Leave in Year after deduction: " + remainingLeave, {
                            title: "Remaining Leave",
                            actions: [sap.m.MessageBox.Action.OK]
                        });
        
                        //   clear the field
                        oSelect.setSelectedKey(""); 
                        oDatePickers.setValue(""); 
                        oDatePicker.setValue(""); 
                        oDescription.setValue(""); 
        
                    }.bind(this))
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        sap.m.MessageToast.show("Failed to update the entry: " + errorThrown);
                    });
                
                    this.byId("editDialogbox").close();
                
                
                },
                onEditCancelButtonPress: function() {
                    // Handle the cancel button press in the edit dialog
        
                    // Close the edit dialog
                    this.byId("editDialogbox").close();
                    
                },
         // for leave adding

         onLeaveTypeChange: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sSelectedKey = oSelectedItem.getKey();
        
            var oCasualLeaveType = this.getView().byId("casualLeaveType");
            oCasualLeaveType.setVisible(sSelectedKey === "Casual leave");

            var selectedLeaveType = oEvent.getParameter("selectedItem").getKey();

            // Reset the Choose an Option RadioButtonGroup
            var oRadioButtonGroup = this.getView().byId("casualLeaveType");
            oRadioButtonGroup.setSelectedIndex(-1); // Reset the selection
        
            // Handle visibility of To Date field based on selected leave type
            var oTypesOfLeaveText = this.getView().byId("typesOfLeaveText");
            var oFromDateLabel = this.getView().byId("fromdate");
            var oToDateField = this.getView().byId("tdate");
            var shiftGroup = this.byId("shift");
            if (selectedLeaveType === "Sick leave" || selectedLeaveType === "Personal leave" || selectedLeaveType === "Maternity/Paternity leave") {
                oFromDateLabel.setText("From Date");
                oToDateField.setVisible(true);
                shiftGroup.setVisible(false);
            } else if (selectedLeaveType === "Casual leave") {
                // For Casual leave, reset the visibility based on the Choose an Option selection
                var oSelectedRadioButton = oRadioButtonGroup.getSelectedButton();
                if (oSelectedRadioButton && oSelectedRadioButton.getText() === "Half Day") {
                    oTypesOfLeaveText.setText("Casual leave - Half Day");
                    oFromDateLabel.setText("Date");
                    oToDateField.setVisible(false);
                    shiftGroup.setVisible(true);
                } else {
                    oFromDateLabel.setText("From Date");
                    oToDateField.setVisible(true);
                    shiftGroup.setVisible(false);
                }
            } else {
                oFromDateLabel.setText("From Date");
                oToDateField.setVisible(true);
                shiftGroup.setVisible(false);
            }
        
        
        },
        onCasualLeaveTypeSelected: function (oEvent) {
            var oSelectedItem = oEvent.getSource().getSelectedButton();
            var selectedLeaveType = oSelectedItem.getText();
        
            var oFromDateLabel = this.getView().byId("fromdate");
            var oToDateField = this.getView().byId("tdate");
            var oTypesOfLeaveText = this.getView().byId("typesOfLeaveText");
            var shiftGroup = this.byId("shift");
        
            if (selectedLeaveType === "Half Day") {
                oFromDateLabel.setText("Date");
                oTypesOfLeaveText.setText("Casual leave - Half Day");
                oToDateField.setVisible(false);
                shiftGroup.setVisible(true);
            } else {
                oFromDateLabel.setText("From Date");
                oToDateField.setVisible(true);
                shiftGroup.setVisible(false);
            }
        },

    //    for Edit button

        onLeaveTypeChanges: function(oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sSelectedKey = oSelectedItem.getKey();
        
            var oCasualLeaveType = this.getView().byId("casualLeaveTypes");
            oCasualLeaveType.setVisible(sSelectedKey === "Casual leave");

            var selectedLeaveType = oEvent.getParameter("selectedItem").getKey();

            // Reset the Choose an Option RadioButtonGroup
            var oRadioButtonGroup = this.getView().byId("casualLeaveTypes");
            oRadioButtonGroup.setSelectedIndex(-1); // Reset the selection
        
            // Handle visibility of To Date field based on selected leave type
            var oTypesOfLeaveText = this.getView().byId("typesOfLeaveText");
            var oFromDateLabel = this.getView().byId("Fromdate");
            var oToDateField = this.getView().byId("enddate");
            var shiftGroup = this.byId("shifts");
            if (selectedLeaveType === "Sick leave" || selectedLeaveType === "Personal leave" || selectedLeaveType === "Maternity/Paternity leave") {
                oFromDateLabel.setText("From Date");
                oToDateField.setVisible(true);
                shiftGroup.setVisible(false);
            } else if (selectedLeaveType === "Casual leave") {
                // For Casual leave, reset the visibility based on the Choose an Option selection
                var oSelectedRadioButton = oRadioButtonGroup.getSelectedButton();
                if (oSelectedRadioButton && oSelectedRadioButton.getText() === "Half Day") {
                    oTypesOfLeaveText.setText("Casual leave - Half Day");
                    oFromDateLabel.setText("Date");
                    oToDateField.setVisible(false);
                    shiftGroup.setVisible(true);
                } else {
                    oFromDateLabel.setText("From Date");
                    oToDateField.setVisible(true);
                    shiftGroup.setVisible(false);
                }
            } else {
                oFromDateLabel.setText("From Date");
                oToDateField.setVisible(true);
                shiftGroup.setVisible(false);
            }
        
        
        },
        onCasualLeaveTypeSelecteds: function (oEvent) {
            var oSelectedItem = oEvent.getSource().getSelectedButton();
            var selectedLeaveType = oSelectedItem.getText();
        
            var oFromDateLabel = this.getView().byId("Fromdate");
            var oToDateField = this.getView().byId("enddate");
            var oTypesOfLeaveText = this.getView().byId("typesOfLeaveText");
            var shiftGroup = this.byId("shifts");
        
            if (selectedLeaveType === "Half Day") {
                oFromDateLabel.setText("Date");
                oTypesOfLeaveText.setText("Casual leave - Half Day");
                oToDateField.setVisible(false);
                shiftGroup.setVisible(true);
            } else {
                oFromDateLabel.setText("From Date");
                oToDateField.setVisible(true);
                shiftGroup.setVisible(false);
            }
        },
            });
    });
  