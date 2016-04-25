var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var Q = require("q");
chai.use(sinonChai);

var controller = require('../../app/controllers/member-controller');
var model = require('../../app/models/member');
var req,res,next = {};

beforeEach(function () {
    res = {
      json: sinon.spy(),
      send: sinon.spy()
    };
    sinon.spy(controller,'sendJsonResponse');
    sinon.spy(controller,'sendErrorResponse');
  });
  
afterEach(function () {
    res.send.reset();
    controller.sendJsonResponse.restore();
    controller.sendErrorResponse.restore();
});

describe('Get all members',function(){
    it('returns all members',function(done){
        const response = [{name:'member1'},{name:'member2'}];
        var modelStub = sinon.stub(model,'fetchAllMembers').
            returns(Q.resolve(response)); //returns a Q resolved response.
        controller.getAllMembers(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response); 
           modelStub.restore();        
           done();  
        });
    });
    it('model throws an error', function(done){
       var err = {message: "failed to get response"};
       var modelStub = sinon.stub(model,'fetchAllMembers').throws(err);
       controller.getAllMembers(req,res,next);
       process.nextTick(function(){
           expect(res.send).to.have.been.calledWith(err); 
           modelStub.restore();        
           done();  
        });  
    });
    it('model returns an error response from the db',function(){
        const response = {message:'failed to fetch from db'};
        var modelStub = sinon.stub(model,'fetchAllMembers').
            returns(Q.resolve(response)); //returns a Q resolved response.
        controller.getAllMembers(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response); 
           modelStub.restore();        
           done();  
        });
    });
});