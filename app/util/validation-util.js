var ValidationUtil = function () {
};
ValidationUtil.isNumber = function(input){
    return typeof(input) === 'number';
};
ValidationUtil.isString = function(input){
    return typeof(input) === 'string';
};

module.exports = ValidationUtil;