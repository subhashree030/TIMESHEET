sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/base/Log",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Log,JSONModel, MessageToast) {
        "use strict";

        return Controller.extend("timesheet.com.project1.controller.calendar", {
            onInit: function () {
                var sUrl = "/catalog/myEmp"; // Replace with your actual URL
                var oModel = new JSONModel(); var oModel = new JSONModel();
                this.getView().setModel(oModel, "empModel");
                var oList = this.getView().byId("ListId");
          
                // Perform AJAX GET call
                $.ajax({
                  url: sUrl,
                  type: "GET",
                  contentType: "application/json",
                  success: function(data) {
                    // Handle successful response
                    this.getView().getModel("empModel").setData(data);
                    MessageToast.show("AJAX GET request successful");
                  }.bind(this),
                  error: function(error) {
                    // Handle error response
                    MessageToast.show("AJAX GET request failed");
                  }
                });
            },
            onPressGoToMaster: function () {
                this.getSplitAppObj().toMaster(this.createId("master2"));
            },
            onPressMasterBack: function () {
                this.getSplitAppObj().backMaster();
            },
            onListItemPress: function (oEvent) {
                var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
    
                this.getSplitAppObj().toDetail(this.createId(sToPageId));
            },   
            onPressDetailBack: function () {
                this.getSplitAppObj().backDetail();
            }, 
            onPressDetailonBack: function(){
                this.getSplitAppObj().backDetail();
            },
            getSplitAppObj: function () {
                var result = this.byId("SplitAppDemo");
                if (!result) {
                    Log.info("SplitApp object can't be found");
                }
                return result;
            }
                         
        });
    });