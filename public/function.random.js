module.exports = function random(arr){
    var item = arr[Math.floor(Math.random()*arr.length)];
    return item;
}