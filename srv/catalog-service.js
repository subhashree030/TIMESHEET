const cds = require('@sap/cds');
const debug = require('debug')('srv:catalog-service');

module.exports = cds.service.impl(async function () {

    const s4hcso = await cds.connect.to('API_SALES_ORDER_SRV');

    const {
            Sales
            ,
            SalesOrders
          } = this.entities;

    this.after('READ', Sales, (each) => {
        if (each.amount > 500) {
            each.criticality = 3;
            if (each.comments === null)
                each.comments = '';
            else
                each.comments += ' ';
            each.comments += 'Exceptional!';
            debug(each.comments, {"country": each.country, "amount": each.amount});
        } else if (each.amount < 150) {
            each.criticality = 1;
        } else {
            each.criticality = 2;
        }
    });

    this.on('boost', Sales, async req => {
        try {
            const ID = req.params[0];
            const tx = cds.tx(req);
            await tx.update(Sales)
                .with({ amount: { '+=': 250 }, comments: 'Boosted!' })
                .where({ ID: { '=': ID } })
                ;
            debug('Boosted ID:', ID);
            const cs = await cds.connect.to('CatalogService');
            let results = await cs.read(SELECT.from(Sales, ID));
            return results;
        } catch (err) {
            req.reject(err);
        }
    });


    this.on('topSales', async (req) => {
        try {
            const tx = cds.tx(req);
            const results = await tx.run(`CALL "MYCAPPROJ_DB_SP_TopSales"(?,?)`, [req.data.amount]);
            return results.RESULT;
        } catch (err) {
            req.reject(err);
        }
    });

    this.on('READ', SalesOrders, async (req) => {
        try {
            const tx = s4hcso.transaction(req);
            return await tx.send({
                query: req.query
            })
        } catch (err) {
            req.reject(err);
        }
    });

    this.on('largestOrder', Sales, async (req) => {
        try {
            const tx1 = cds.tx(req);
            const res1 = await tx1.read(Sales)
                .where({ ID: { '=': req.params[0] } })
                ;
            let cql = SELECT.one(SalesOrders).where({ SalesOrganization: res1[0].org }).orderBy({ TotalNetAmount: 'desc' });
            const tx2 = s4hcso.transaction(req);
            const res2 = await tx2.send({
                query: cql
            });
            if (res2) {
                return res2.SoldToParty + ' @ ' + res2.TransactionCurrency + ' ' + Math.round(res2.TotalNetAmount).toString();
            } else {
                return 'Not found';
            }
        } catch (err) {
            req.reject(err);
        }
    });














    // this.on('userInfo', req => {
    //     let results = {};
    //     results.user = cds.context.user.id;
    //     results.locale = cds.context.locale;
    //     results.scopes = {};
    //     results.scopes.identified = req.user.is('identified-user');
    //     results.scopes.authenticated = req.user.is('authenticated-user');
    //     results.scopes.Viewer = req.user.is('Viewer');
    //     results.scopes.Admin = req.user.is('Admin');
    //     return results;
    // });

    this.on('getEmployee', async(req)=>{
        var getID = req.data.EmpID;
        var getEmpInfo = await cds.run(cds.parse.cql("SELECT * FROM mycapproj.db.empTable WHERE ID=" + getID ));
        var empNames = getEmpInfo[0].Name;
        var output = {
            "EmpName": empNames 
        };
        return output;
    });
    this.on('getallEmployee', async(req)=>{
        
        var getallEmpInfo = await cds.run(cds.parse.cql("SELECT * FROM mycapproj.db.empTable"));
        var allEmp = [];
        getallEmpInfo.forEach(emp=>{
            var empName = emp.Name;
            allEmp.push(empName);
        });
        console.log(allEmp);
        // var output = {
        //     "EmpName": allEmp[0]
        // };
        // console.log(output);
        return allEmp;
    });

    //.........
    this.on('getEmployeeAction', async(req)=>{
        var getID = req.data.EmpID;
        var getEmpInfo = await cds.run(cds.parse.cql("SELECT * FROM mycapproj.db.empTable WHERE ID=" + getID ));
        var empNames = getEmpInfo[0].Name;
        var output = {
            "EmpName": empNames 
        };
        return output;
    });
    //........................
    this.on('createNewEmployeeAction', async(req)=>{
        var getID = req.data.EmpID;
        var getName = req.data.EmpName;
      
        const tx = cds.transaction(req);
        // var getEmpInfo = await cds.run(cds.parse.cql("INSERT * INTO capproject.db.Employee"));
        var insert = await tx.run(INSERT.into("mycapproj.db.empTable").entries({
            ID: getID,
            Name:getName,
         
        }));
        console.log(insert);

        // var empNames = getEmpInfo[0].Name;
        var output = {
            "EmpName": getName 
        };
        return output;
    });
      //........................
      this.on('updateEmployeeAction', async(req)=>{
        var getID = req.data.EmpID;
        var getName = req.data.EmpName;
      
        const tx = cds.transaction(req);
        // if (getID == 1) {
            const update = await tx.run(UPDATE('mycapproj.db.empTable').set({ Name: getName }).where({ ID: getID }));
            console.log('Employee with ID 1 updated:', update);
        // }

        // var empNames = getEmpInfo[0].Name;
        var output = {
            "EmpName": getName 
        };
        return output;
    });

    this.on('deleteEmployeeAction', async(req)=>{
        var getID = req.data.EmpID;
        var getName = req.data.EmpName;
      
        const tx = cds.transaction(req);
        if (getID == 1) {
            var deletion = await tx.run(DELETE.from('mycapproj.db.empTable').where({ ID: getID }));
            console.log(deletion);
            
        }

        // var empNames = getEmpInfo[0].Name;
        var output = {
            "EmpName": getName 
        };
        return output;
    });

});