module.exports = function(Orders) {
	/* sample get
  Orders.status = function(cb) {
    var currentDate = new Date();
    var currentHour = currentDate.getHours();
    var OPEN_HOUR = 6;
    var CLOSE_HOUR = 20;
    console.log('Current hour is ' + currentHour);
    var response;
    if (currentHour > OPEN_HOUR && currentHour < CLOSE_HOUR) {
      response = 'We are open for business.';
    } else {
      response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
    }
    cb(null, response);
  };
  Orders.remoteMethod(
    'status',
    {
      http: {path: '/status', verb: 'get'},
      returns: {arg: 'status', type: 'string'}
    }
  );

  Orders.getName = function(shopId, cb) {
    Orders.findById( shopId, function (err, instance) {
        response = "Name of coffee shop is "+shopId;
        cb(null, response);
        console.log(response);
    });
  }

  Orders.remoteMethod (
        'getName',
        {
          http: {path: '/getname', verb: 'get'},
          accepts:[
              {arg: 'id', type: 'number', http: { source: 'query' } }
              ],
          returns: {arg: 'name', type: 'string'}
        }
    );
*/
  Orders.getOrders=function(sdate,edate,cb){
   	    
    var ordersCollection=Orders.getDataSource().connector.collection(Orders.modelName);
    ordersCollection.aggregate([
      {
         $match:
          {
            createdAt:
            {
                $gte:sdate, 
                $lt:edate
             }
          }
       }
      ,
      { 
      $group:
          {
              _id:
              {
                  createdAt:
                  {
                      month:{$month:"$createdAt"}, 
                      day:{$dayOfMonth:"$createdAt"}, 
                      year:{$year:"$createdAt"}
                    }
                 }, 
            count:{$sum:1}
            }
      
    

    }], 
    function(err,groupByRecords){
      //console.log("err",err);
      //console.log("groupByRecords",groupByRecords);
       cb(null,groupByRecords);
    });

}
  Orders.remoteMethod(
      'getOrders',
      {
        http:{path : '/getOrders', verb:'get'},
        accepts :[
          {arg: 'start_date',type:'Date',http:{source : 'query'}},
          {arg: 'end_date',type:'Date',http:{source : 'query'}}
          ],
        returns:{ arg: 'result',type:'object'}
        
      }
    );

  
};
