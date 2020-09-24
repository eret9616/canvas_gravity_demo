// 时间扭曲函数

function easeIn(strength) {
    return function(percent) {
      return Math.pow(percent, strength * 2);
    };
}

function easeOut(strength) {
    return function(percent) {
      return 1 - Math.pow(1 - percent, strength * 2);
    }
}

function easeInOut() {
    return function(percent) {
      return percent - Math.sin(percent * Math.PI * 2) / (2 * Math.PI);
    };
}