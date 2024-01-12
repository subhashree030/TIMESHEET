sap.ui.define([
  "sap/ui/core/mvc/Controller"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller) {
    "use strict";

    return Controller.extend("mytestui..mytestui.controller.List", {
      onInit: function () {

        // // Sample data for the JSON model
        var jsonData = {
          "ProductCollection": [
            {
              Name: "Product 1",
              ProductId: "001",
              Price: 49.99,
              CurrencyCode: "USD"
            },
            {
              Name: "Product 2",
              ProductId: "002",
              Price: 29.99,
              CurrencyCode: "EUR"
            },
            // Add more product entries as needed
          ]
        };


        var oModel = new sap.ui.model.json.JSONModel(jsonData);
        this.getView().setModel(oModel, "products");




        // for filtering dupllicate entry 


        // Assuming you have a JSON object as shown above
        var employeeData = {
          "employees": [
            {
              "id": "1",
              "name": "John Doe",
              "position": "Developer",
              "department": "IT"
            },
            {
              "id": "1",
              "name": "John Doe",
              "position": "Developer",
              "department": "IT"
            },
            {
              "id": "2",
              "name": "Jane Smith",
              "position": "Designer",
              "department": "Creative"
            },
            {
              "id": "2",
              "name": "Jane Smith",
              "position": "Designer",
              "department": "Creative"
            },
            {
              "id": "3",
              "name": "David Johnson",
              "position": "Manager",
              "department": "Operations"
            }
          ]
        };

        // Create a JSON model
        var empSetModel = new sap.ui.model.json.JSONModel(employeeData);


        // Set the model to the view
        this.getView().setModel(empSetModel,"empSetModel");


        function removeDuplicates(arr, prop) {
          const uniqueIds = new Set();
          return arr.filter(item => {
            if (!uniqueIds.has(item[prop])) {
              uniqueIds.add(item[prop]);
              return true;
            }
            return false;
          });
        }
        
        // Removing duplicates based on 'id'
        employeeData.employees = removeDuplicates(employeeData.employees, 'id');

       


// Set the model to the view
this.getView().setModel(empSetModel, "empSetModel");
        
        // Create a JSON model
        var empSetModel = new sap.ui.model.json.JSONModel(employeeData);
        
        // Set the model to the view
        this.getView().setModel(empSetModel, "empSetModel");



      },
      onListItemPress: function (oEvent) {
        alert("hii")
        var oSelectedItem = oEvent.getSource();


        var oBindingContext = oSelectedItem.getBindingContext("products").getPath().substr(1);
        var result1 = oBindingContext.substring(oBindingContext.indexOf("/") + 1);
        var result2 = result1.replace(/\/0$/, '');
        var result = oBindingContext.replace(/\/0$/, '');

        var oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo("DetailList", {
          // contextPath: result,
          index: result2
        });




      }
    });
  });
