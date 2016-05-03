var ValidationUtil = function () {
    this.isNumber = function(input){
        return typeof(input) === 'number';
    };
    this.isString = function(input){
        return typeof(input) === 'string';
    }
}