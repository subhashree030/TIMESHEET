sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("mytestui..mytestui.controller.Detail", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("DetailList").attachPatternMatched(this._onDetailMatched, this);
                              
            },
            _onDetailMatched: function (oEvent) {
               
                //var sContextPath = oEvent.getParameters().arguments.contextPath;
                // var sindex = oEvent.getParameters().arguments.index || sindgex ;
                // this.getView().bindElement({
                //     path: "/ProductCollection/" + sindex,
                //     model: "products"
                // });
                //var sContextPath = oEvent.getParameters().arguments.contextPath;
                var sContextPath1 = oEvent.getParameters().arguments.index;
                var oProductDetailPanel = this.byId("SimpleFormDisplay354");
			oProductDetailPanel.bindElement({ path:"products>/"+"ProductCollection/"+sContextPath1 , model: "products" });

    //   var oView = this.getView();
    //   oView.bindElement({
    //     path: "/"+sContextPath + "/"+index,
    //     model: "products"
    //   });
               
            }
        });
    });
