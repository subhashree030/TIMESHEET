sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
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
    function(Controller,JSONModel,formatter,LocaleData,coreLibrary,Fragment,DateFormat,unifiedLibrary,MessageToast,UI5Date) {
      "use strict";
  
      return Controller.extend("timesheet.com.project1.controller.reportschart", {
        onInit() {

            var AnalyticallineChartData = {
                Title: "",
                values: [{
                    "date": "Week 1-6",
                    "count": "2"
                    
                }, {
                    
                    "date": "Week 7-12",
                    "count": "5"
                }, {
                    
                    "date": "Week 13-18",
                    "count": "7"
                    
                }, {
                    
                    "date": "Week 19-24",
                    "count": "9"
                },
                {
                    
                    "date": "Week 25-30",
                    "count": "11"
                    
                }, {
                    
                    "date": "Week 31-36",
                    "count": "100"
                },
                {
                    
                    "date": "Week 37-42",
                    "count": "70"
                    
                }, {
                    
                    "date": "Week 43-48",
                    "count": "60"
                },
                {
                    
                    "date": "Week 49-52",
                    "count": "22"
                    
                }]
            }

            var AnalyticallineChartModelData = new JSONModel(AnalyticallineChartData);
            this.getView().setModel(AnalyticallineChartModelData, "AnalyticallineChartModelData");
            
            var BuildBarChart={
                    "results": [{
                        "category": "HR",
                        "count": "76"
                        
                    }, {
                        
                        "category": "Sales",
                        "count": "12"
                    }, {
                        
                        "category": "Security",
                        "count": "25"
                        
                    }, {
                        
                        "category": "Travel and Expense",
                        "count": "87"
                    },{
                        
                        "category": "Others",
                        "count": "25"
                    }]
            }
            var buildBarChart = new JSONModel(BuildBarChart);
            this.getView().setModel(buildBarChart, "buildBarChart");

            var DonutChart={
                "results": [{
                    "category": "Authorization Request",
                    "count": "120"
                    
                }, {
                    
                    "category": "HR",
                    "count": "15"
                }, {
                    
                    "category": "Finance",
                    "count": "10"
                    
                }, {
                    
                    "category": "Mobile Services",
                    "count": "91"
                },{
                    
                    "category": "Others",
                    "count": "25"
                }]
        }
        var DonutChartmodeldata = new JSONModel(DonutChart);
        this.getView().setModel(DonutChartmodeldata, "DonutChartmodeldata");

        var RaderChart={
            "results": [{
                "sentiment": "Strong Positive",
                "count": "40"
                
            }, {
                
                "sentiment": "Strong Negative",
                "count": "10"
            },
            {
                "sentiment": "Weak Positive",
                "count": "20"
                
            },
            {
                "sentiment": "Weak Negative",
                "count": "10"
                
            }]
    }
    var RaderChartmodeldata = new JSONModel(RaderChart);
    this.getView().setModel(RaderChartmodeldata, "RaderChartmodeldata");

    var heatmapChart={
        "results":[{
            "date": "1/2022",
            "count": "100",
            "block": "20"
            
        }, {
            
            "date": "2/2022",
            "count": "80",
            "block": "17"
        },
        {
            "date": "3/2022",
            "count": "60",
            "block": "15"
            
        }, {
            
            "date": "4/2022",
            "count": "50",
            "block": "8"
        },
        {
            "date": "1/2023",
            "count": "40",
            "block": "7"
            
        }, {
            
            "date": "2/2023",
            "count": "20",
            "block": "4"
        }]
}
var heatmapChartmodeldata = new JSONModel(heatmapChart);
this.getView().setModel(heatmapChartmodeldata, "heatmapChartmodeldata");

var heatmapChart2={
    "results":[{
        "date": "1/2022",
        "count": "100",
        "block": "20"
        
    }, {
        
        "date": "2/2022",
        "count": "120",
        "block": "22"
    },
    {
        "date": "3/2022",
        "count": "130",
        "block": "30"
        
    }, {
        
        "date": "4/2022",
        "count": "140",
        "block": "35"
    },
    {
        "date": "1/2023",
        "count": "150",
        "block": "50"
        
    }, {
        
        "date": "2/2023",
        "count": "160",
        "block": "90"
    }]
}
var heatmapChartmodeldata2 = new JSONModel(heatmapChart2);
this.getView().setModel(heatmapChartmodeldata2, "heatmapChartmodeldata2");

var DonutChart2={
    "results":[
        {
            type: "Open",
            count: "14"
        },
        {
            type: "Closed",
            count: "13"
        },
        {
            type: "In Process",
            count: "2"
        }
    ]
}
var DonutChartmodeldata2 = new JSONModel(DonutChart2);
this.getView().setModel(DonutChartmodeldata2, "DonutChartmodeldata2");

var ConverstionLineChart = {
    Title: "",
    values: [{
        "date": "Week 1",
        "count": "44"

    }, {

        "date": "Week 2",
        "count": "31"
    }, {

        "date": "Week 3",
        "count": "8"

    }, {

        "date": "Week 4",
        "count": "2"
    },
    {

        "date": "Week 5",
        "count": "0"

    }]
}

var ConverstionLineChartModelData = new JSONModel(ConverstionLineChart);
this.getView().setModel(ConverstionLineChartModelData, "ConverstionLineChartModelData");

var BotdonutchartChart = {
    Title: "",
    values: [{
        "date": "fallback",
        "count": "44"

    }, {

        "date": "fuzzy-knowledgebase",
        "count": "31"
    }, {

        "date": "greeting",
        "count": "8"

    }, {

        "date": "consideraca",
        "count": "2"
    },
    {

        "date": "raise-ticket",
        "count": "0"

    }]
}

var BotdonutchartModelData = new JSONModel(BotdonutchartChart);
this.getView().setModel(BotdonutchartModelData, "BotdonutchartModelData");

var BotcolumChart = {
    Title: "",
    values: [{
        "date": "Week 1",
        "count": "107"

    }, {

        "date": "Week 2",
        "count": "109"
    }, {

        "date": "Week 3",
        "count": "12"

    }, {

        "date": "Week 4",
        "count": "9"
    },
    {

        "date": "Week 5",
        "count": "0"

    }]
}

var BotcolumChartModelData = new JSONModel(BotcolumChart);
this.getView().setModel(BotcolumChartModelData, "BotcolumChartModelData");

        
        },
            });
    }
  );