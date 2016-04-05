//require
var Q = require("q");
var mongoose = require('mongoose')

//Schema
var Schema = mongoose.Schema;
var memberSchema = new Schema({
    firstName:String,
    lastName:String,
    city:String
});

//Model creation
var MemberModel = mongoose.model('Member',memberSchema);

//Model interaction methods 
//Get a new instance
MemberModel.getNewInstance = function(){
    return new MemberModel();
};

//Fetch all Members
MemberModel.fetchAllMembers = function(){
    var deferred = Q.defer();
    MemberModel.find(function(err,members){
      if(!err)
        deferred.resolve(members);
      else
        deferred.reject("Members fetching failed");
  });
  return deferred.promise;
};

//Fetch an individual Member by ID
MemberModel.fetchMemberById = function(id){
    var deferred = Q.defer();
    MemberModel.findById(id,function(err,member){
      if(!err)
        deferred.resolve(member);
      else
        deferred.reject("Fetching member by ID failed");
  });
  return deferred.promise;
};

//Filter Members based on where clause
MemberModel.filterMembers = function(filterObject){
    var deferred = Q.defer();
    MemberModel.find(filterObject,function(err,members){
      if(!err)
        deferred.resolve(members);
      else
        deferred.reject("Fetching member by ID failed");
  });
  return deferred.promise;
};

//Add a member
MemberModel.add = function(req){
     var deferred = Q.defer();
     var member = MemberModel.buildFromReq(req);
     member.save(function(err,member){
       if(!err)
            deferred.resolve(member);
       else     
           deferred.reject("Adding member failed");        
   });
   return deferred.promise;
};

//Build a member object from request
MemberModel.buildFromReq = function(req){
   var Member = MemberModel.getNewInstance();
   Member.firstName = req.body.firstName;
   Member.lastName = req.body.lastName;
   Member.city = req.body.city;
   return Member;
};

module.exports = MemberModel;
