var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
sinonChai = require('sinon-chai');
var Q = require("q");
chai.use(sinonChai);

var controller = require('../../app/controllers/member-controller');
var model = require('../../app/models/member');
var req,res,next = {};
beforeEach(function () {
    res = {
      json: sinon.spy()
    };
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
    it('fails')
});