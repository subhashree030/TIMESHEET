using {mycapproj.db as db} from '../db/data-model';

using {CV_SALES, CV_SESSION_INFO} from '../db/data-model';

using { API_SALES_ORDER_SRV } from './external/API_SALES_ORDER_SRV.csn';














service CatalogService @(path : '/catalog')
 @(requires: 'authenticated-user')
{
     entity Sales
       @(restrict: [{ grant: ['READ'],
                      to: 'Viewer'
                    },
                    { grant: ['WRITE'],
                      to: 'Admin' 
                   }
                  ])
       as select * from db.Sales
       actions {
         @(restrict: [{ to: 'Viewer' }])
         function largestOrder() returns String;
         @(restrict: [{ to: 'Admin' }])
         action boost() returns Sales;
       }
     ;


    @readonly
    entity VSales
      @(restrict: [{ to: 'Viewer' }])
      as select * from CV_SALES
    ;

    @readonly
    entity SessionInfo
      @(restrict: [{ to: 'Viewer' }])
      as select * from CV_SESSION_INFO
    ;

    function topSales
      @(restrict: [{ to: 'Viewer' }])
      (amount: Integer)
      returns many Sales;

    @readonly
    entity SalesOrders
      @(restrict: [{ to: 'Viewer' }])
      as projection on API_SALES_ORDER_SRV.A_SalesOrder {
          SalesOrder,
          SalesOrganization,
          DistributionChannel,
          SoldToParty,
          IncotermsLocation1,
          TotalNetAmount,
          TransactionCurrency
        };















     type userScopes { identified: Boolean; authenticated: Boolean; Viewer: Boolean; Admin: Boolean; };
     type userType { user: String; locale: String; scopes: userScopes; };
      entity empTable as projection on db.empTable
    
   entity Department as projection on db.Department
   entity Employee as projection on db.Employee
       entity Books as projection on db.Books           
    entity Customer as projection on db.Customer
     entity Order as projection on db.Order
      entity OrderItem as projection on db.OrderItem
      entity Products as projection on db.Product;
      entity EmpData as projection on db.EmpData;
      entity EmpAdress as projection on db.EmpAdress;
       entity Holiday as projection on db.Holiday;
       entity OptinalHolidays as projection on db.OptinalHolidays;
       entity myEntries as projection on db.myEntries;
       entity myLeave as projection on db.myLeave;
       entity myEmp as projection on db.myEmp;
  
    //  function userInfo() returns userType;

     // action   EMPLOYEE_RULES(feature : String);
    function getEmployee(EmpID:Integer)
    returns {
      EmpName: String(100);
    };
    function getallEmployee()
    returns 
       array of String;


    action getEmployeeAction(EmpID:Integer)
    returns {
      EmpName: String(100);
    };
    action createNewEmployeeAction(EmpID:Integer, EmpName:String)
    returns {
      EmpName: String(100);
    };

      action updateEmployeeAction(EmpID:Integer, EmpName:String)
    returns {
      EmpName: String(100);
    };

     action deleteEmployeeAction(EmpID:Integer, EmpName:String)
    returns {
      EmpName: String(100);
    };
};