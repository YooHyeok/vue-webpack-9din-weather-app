const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
/* [for~of]: 배열 순회(요소) */
for (const num of arr) {
  console.log(num) // arr 순회 - 각 데이터를 순차적으로 num에 할당
  console.log(typeof num)
}

/* [for~in]: 객체 순회(key) */
const obj = {name1: "Jeff", name2: "Marco", name3: "Sunji" }
for (const item in obj) {
  console.log(item) // obj 순회 - 각 obj key를 순차적으로 item에 할당
  console.log(typeof item)
  console.log(obj[item]) // obj를 for~of 구문으로 obj의 value 가져오는법
}