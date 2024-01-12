using {
    cuid,
    managed,
    sap.common
} from '@sap/cds/common';
context mycapproj.db {

entity Sales {
  key ID          : Integer;
      region      : String(100);
      country     : String(100);
      org         : String(4);
      amount      : Integer;
      comments    : String(100);
      criticality : Integer;
};
// entity EmpData {
//   key ID          : String(100);
//       UserName    : String(100);
//       Password    : String(100);
//       Position    : String(4);
//       Image       : Integer;
// };
// entity EmpAdress {
//   key ID          : String(100);
//       AdsName    : String(100);
//       AdsStreet    : String(100);
//       ZipCode    : String(4);
//       Country       : String;
//         Web    : String(100);
//       Url    : String(100);
//       Twitter   : String(4);
//       Email      : String;
//       Tel    : String(100);
//       Sms    : String(100);
//       Mobile   : String(4);
//       Pager      : String;
//       Fax:String;
// };
  // Using Extend Aspects
  entity Product @some.entity.level.annotations{
  key ID: UUID @some.field.level.annotations;
  name: String(100) @titleFieldAnnotation: {
    description: 'The name of the product'
  };
  price: Decimal(15, 2);
}


extend mycapproj.db.Product with {
  description: String(255);
  category: String(50);
}

  // using Annotations
  

    // example of Localize
    entity Books { 
    key ID : UUID;   
  title : localized String;
  descr : localized String;
};

entity  empTable{
  key ID          : Integer;
      Name      : String(100);
};
entity EmpData {
  key ID          : String(100);
      UserName    : String(100);
      Firstname   :String(100);
      Lastname    :String(100);
      Password    : String(100);
      Position    : String(4);


      AdsName    : String(100);
       AdsStreet    : String(100);
       ZipCode    : String(4);
        Country       : String;
        Web    : String(100);
       Url    : String(100);
       Twitter   : String(4);
       Email      : String;
       Tel    : String(100);
       Sms    : String(100);
       Mobile   : String(4);
       Pager      : String;
       Fax:String;
       image: String(100);
     

};
entity EmpAdress {
  key ID          : String(100);
       AdsName    : String(100);
       AdsStreet    : String(100);
       ZipCode    : String(4);
        Country       : String;
        Web    : String(100);
       Url    : String(100);
       Twitter   : String(4);
       Email      : String;
       Tel    : String(100);
       Sms    : String(100);
       Mobile   : String(4);
       Pager      : String;
       Fax:String;
     
};

entity myEntries {
  key EmpID:String(100);
  key slNo:String(100);
  Date:String(100);
  noOfHours:String(100);
  Project:String(100);
  Task:String(100);
  SubTask:String(100);
  Status: String(100);
  TaskDescription:String(100);
}

entity myLeave {
   key EmpID:String(100);
   key slNo: String(100);
   LeaveType:String(100);
   FromDt:String(100);
   ToDt:String(100);
   noOfDates: String(100);
   shift: String(100);
   Description:String(100);
}
 

entity Holiday {
    key date: String(100);
    description: String;
    imageUrl : String(100);
    detail: String(100);
}
entity OptinalHolidays{
  key dates: String(100);
    Description: String;
};
entity myEmp{
  key name : String(100);
  icon: String(100);
}

//  example of Association
entity Employee {
  key ID: UUID;
  firstName: String;
  lastName: String;
  department: Association to Department;
}

entity Department {
  key ID: UUID;
  key name: String;
  employees: Association to many Employee on employees.department = $self;
}

  // example of Composition

entity Customer {
  key ID: UUID;
  name: String;
  orders: Composition of many Order on orders.customer_ID = $self.ID;
}

entity Order {
  key ID: UUID;
  orderNumber: Integer;
  customer_ID: UUID;
  items: Composition of many OrderItem on items.order_ID = $self.ID;
}

entity OrderItem {
  key ID: UUID;
  product: String;
  quantity: Integer;
  order_ID: UUID;
}


}

@cds.persistence.exists
@cds.persistence.calcview
entity CV_SALES {
  key REGION  : String(100);
      AMOUNT  : Integer;
}

@cds.persistence.exists
@cds.persistence.calcview
entity CV_SESSION_INFO {
  key ITEM     : String(5000);
      VALUE    : String(5000);
}
