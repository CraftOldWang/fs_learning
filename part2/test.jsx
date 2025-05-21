// 测试snippet 、 练习 reduce函数


cosole.log('test',hello)

// 返回数组的最大值

const arr = [253,23523,61316,13461,3613,345,314,13461,6]

const maxIndex = arr.reduce((maxidx, currentnum, curidx,array) => 
    currentnum > array[maxidx] ? curidx : maxidx, 0)