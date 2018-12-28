exports.mockYaks = [
  {name: "Betty-1", age: 4, sex: 'f'},
  {name: "Betty-2", age: 8, sex: 'f'},
  {name: "Betty-3", age: 9.5, sex: 'f'}
]

exports.milkStok = (yaks, days) => {
  let day = 0;
  let sum = 0;
  for(day; day < days; day++) {
    yaks.forEach(yak => {
      sum += yak.milkPer(day);
    });
  }
  console.log(sum);
  return sum;
}