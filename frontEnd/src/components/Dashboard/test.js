// arr = [1,2,3,4,5]
// k = z

// for(i=0;i<k;i++){
//     arr.unshift(arr.pop())
// }
// console.log(arr)

arr = [1,2,3,4,5]
res = []
res2 = [] 
k = 6
for (i = 0; i < arr.length - k; i++) {
    res.push(arr[i]);
}

for (i = arr.length - k; i < arr.length; i++) {
    res2.push(arr[i]);
}

console.log(res2.concat(res))

let arr = [1, 2, 3, 4, 5];
let arr1 = [], arr2 = [];
let size = 33;
size = size % arr.length; 

for (let i = 0; i < arr.length; i++) {
    if (i >= arr.length - size) {
        arr1.push(arr[i]);
    } else {
        arr2.push(arr[i]);
    }
}
let res = arr1.concat(arr2);
console.log(res);
