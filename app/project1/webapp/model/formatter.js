sap.ui.define(["sap/ui/core/format/DateFormat",
                "sap/ui/core/LocaleData",], 
        function (DateFormat, LocaleData) {
  "use strict";
  var dateToLocal = function (oDate) {
    if (!oDate) {
      return undefined;
    }
    var _oDate = new Date(oDate.getTime());
    _oDate.setMinutes(_oDate.getMinutes() + oDate.getTimezoneOffset());
    return _oDate;
  };
  return {
    statusText: function (sStatus) {
      if ( sStatus >= "00:00 AM" && sStatus <= "11:59 AM") {
               return "Good morning";
              } else if ( sStatus >= "12:00 PM" && sStatus <=  "16:59 PM") {
                return "Good afternoon";
              } else {
                return "Good evening";
              }
    }
  };
});
