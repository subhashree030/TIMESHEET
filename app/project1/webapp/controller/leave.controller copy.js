sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/core/Fragment"
        
    ],
    function(BaseController,Fragment) {
      "use strict";
  
      return BaseController.extend("timesheet.com.project1.controller.leave", {
        onInit() {
         // Create a JSON model and set it to the view
         var leaveModel = new sap.ui.model.json.JSONModel({
            leaveData: []
        });
        this.getView().setModel(leaveModel);

        var oRouter = this.getOwnerComponent().getRouter();
                oRouter.initialize();

       oRouter.getRoute("EmployeeDetails").attachPatternMatched(this._onObjectMatched, this);


        },
        onApplyButtonPress:function(){
            var oView = this.getView();
      
          // Access the input controls using this.getView().byId()
         
          var oSLNO = oView.byId("slNo");
          var oSelect = oView.byId("leave");
          var oFromDate = oView.byId("fdate");
          var oToDate = oView.byId("tdate");
          var oDescription = oView.byId("description");
      
          // Get the values from the input controls
         
          var SlNo = oSLNO.getValue();
          var selectedLeaveKey = oSelect.getSelectedKey();
          var FromDate = oFromDate.getValue();
          var ToDate = oToDate.getValue();
          var description = oDescription.getValue();

             // Check if any of the required fields are empty
    if (
        SlNo === "" ||
        selectedLeaveKey === "Select" ||
        FromDate === "" ||
        ToDate === "" ||
        description === ""
    ) {
        // Display an error message
        sap.m.MessageToast.show("Please fill in all the required fields.");
        return; // Do not proceed with saving data
    }
    
      
          // Create an object with the user input data
          var postData = {
           
            slNo:SlNo,
            LeaveType:selectedLeaveKey,
            FromDt:FromDate,
            ToDt:ToDate,
            Description:description
           
          };
      
          // Perform a POST request to save data to your backend service
          $.ajax({
              type: "POST",
              url: "/catalog/myLeave", 
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
              url: "/catalog/myLeave",
              method: "GET",
              dataType: "json",
              success: function (data, textStatus) {
               
                 
             
              
                  var myLeaveModel = new sap.ui.model.json.JSONModel(data);
                  that.getView().setModel(myLeaveModel,"myLeaveModel");
              },
              error: function (jqXHR, textStatus, errorThrown) {
                
              }
          });
               },
      
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
        onDeleteMyEntries: function (oEvent) {
            var oButton = oEvent.getSource();
            var oContext = oButton.getBindingContext("myLeaveModel");
            var oRowData = oContext.getObject();
            console.log("Clicked Row Data:", oRowData);
                var SlNo = oRowData.slNo;
                var leaveType = oRowData.LeaveType;
                var fromDt = oRowData.FromDt;
                var toDt = oRowData.ToDt;
                var description = oRowData.Description;
                var deleteno = parseInt(SlNo,10)
                console.log("Row Data:", oRowData);
                var that = this;

                var criteriaToDelete = {
                    slNo: SlNo,
                    LeaveType: leaveType,
                    FromDt: fromDt,
                    ToDt: toDt,
                    Description: description,  
                };
                $.ajax({
                    type: "DELETE",
                    url: "/catalog/myLeave/" + deleteno, // Replace with your service URL
                    data: JSON.stringify(criteriaToDelete),
                    contentType: "application/json",
                    success: function (data, textStatus, jqXHR) {
                        // Handle success, e.g., show a success message
                        that.getView().getModel("myLeaveModel").refresh(true);
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
        onEditMyLeaves :function(oEvent){
            
        
            // Create the edit dialog
            if (!this.byId("editDialogbox")) {
                var oView = this.getView();
                Fragment.load({
                    id: oView.getId(),
                    name: "timesheet.com.project1.view.Fragments.leaves",
                    controller: this,
                }).then(function (oDialog) {
                    oView.addDependent(oDialog);
                    oDialog.open();
                });
            } else {
                this.byId("editDialogbox").open();
            }
                }
            });
    });
  