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
    var modelStub = {};
    
    beforeEach(function () {
        modelStub = sinon.stub(model,'fetchAllMembers');
    });
    
    afterEach(function () {           
        modelStub.restore();        
    });
    
    it('returns all members',function(done){
        const response = [{name:'member1'},{name:'member2'}];
        modelStub.returns(Q.resolve(response));
        controller.getAllMembers(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response); 
           done();  
        });
    });
    it('model throws an error', function(done){
       var err = {message: "failed to get response"};
       modelStub.throws(err);
       controller.getAllMembers(req,res,next);
       process.nextTick(function(){
           expect(res.send).to.have.been.calledWith(err);      
           done();  
        });  
    });
    it('model returns an error response from the db',function(){
        const response = {message:'failed to fetch from db'};
        modelStub.returns(Q.resolve(response));
        controller.getAllMembers(req,res,next);    
        process.nextTick(function(){
           expect(res.json).to.have.been.calledWith(response);        
           done();  
        });
    });
});