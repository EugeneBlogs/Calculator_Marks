var timer;
var counter = 0;
var start_title = document.title;
var message = 'Eugene Blogs Company';
timer = setInterval(function () {
  if (counter % 2) {
    document.title = start_title;
  } else {
    document.title = message;
  }
  counter++;
}, 2000);

let divisible = 0
let divider = 0
let n = 1
let tag_list = []
let mark_list = []
let coefficient_list = []

function AddMark() {
  let t = document.getElementById("tag").value
  let m = document.getElementById("mark").value
  let c = document.getElementById("coefficient").value
  if (c == null || c == "") {
    c = "1"
  }
  divisible += eval(m * c)
  divider += eval(c)
  let middle = eval(divisible / divider)
  middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2);
  document.getElementById("middle_mark").innerHTML = `Средний балл: ${middle}.`
  let rounded = Math.round(middle)
  document.getElementById("final_mark").innerHTML = `Итоговая оценка: ${rounded}.`
  if (rounded == "5") {
    document.getElementById("final_mark").style.color = "green"
  } else if (rounded == "4") {
    document.getElementById("final_mark").style.color = "lightgreen"
  } else if (rounded == "3") {
    document.getElementById("final_mark").style.color = "orange"
  } else if (rounded == "2") {
    document.getElementById("final_mark").style.color = "red"
  } else {
    document.getElementById("final_mark").style.color = "blue"
  }
  document.querySelector('.list').insertAdjacentHTML('beforeend',
    ` 
<tr>
<td>${n}</td>
<td id="element_${n}_tag">${t}</td>
<td id="element_${n}_mark">${m}</td>
<td id="element_${n}_coefficient">${c}</td>
<td><button class="btn btn-danger" onclick="DeleteElement(${n})">&#10006;</button></td>
</tr>      
`)
tag_list.push(document.getElementById(`element_${n}_tag`).innerHTML)
mark_list.push(document.getElementById(`element_${n}_mark`).innerHTML)
coefficient_list.push(document.getElementById(`element_${n}_coefficient`).innerHTML)
  n++
}

function DeleteElement(num) {
  tag_list.splice(num-1, 1)
  mark_list.splice(num-1, 1)
  coefficient_list.splice(num-1, 1)
  divisible = 0
  divider = 0
  n = 1
  document.getElementById("tag").value = ""
  document.getElementById("mark").value = ""
  document.getElementById("coefficient").value = ""
  document.querySelector('.list').innerHTML = ""
  document.getElementById("middle_mark").innerHTML = `Средний балл: 0.`
  document.getElementById("final_mark").innerHTML = `Итоговая оценка: 0.`
  document.getElementById("final_mark").style.color = "black"
  for (let i = 0; i < mark_list.length; i++) {
    let t = tag_list[i]
    let m = mark_list[i]
    let c = coefficient_list[i]
    if (c == null || c == "") {
      c = "1"
    }
    divisible += eval(m * c)
    divider += eval(c)
    let middle = eval(divisible / divider)
    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2);
    document.getElementById("middle_mark").innerHTML = `Средний балл: ${middle}.`
    let rounded = Math.round(middle)
    document.getElementById("final_mark").innerHTML = `Итоговая оценка: ${rounded}.`
    if (rounded == "5") {
      document.getElementById("final_mark").style.color = "green"
    } else if (rounded == "4") {
      document.getElementById("final_mark").style.color = "lightgreen"
    } else if (rounded == "3") {
      document.getElementById("final_mark").style.color = "orange"
    } else if (rounded == "2") {
      document.getElementById("final_mark").style.color = "red"
    } else {
      document.getElementById("final_mark").style.color = "blue"
    }
    document.querySelector('.list').insertAdjacentHTML('beforeend',
      ` 
  <tr>
  <td>${n}</td>
  <td id="element_${n}_tag">${t}</td>
  <td id="element_${n}_mark">${m}</td>
  <td id="element_${n}_coefficient">${c}</td>
  <td><button class="btn btn-danger" onclick="DeleteElement(${n})">&#10060;</button></td>
  </tr>      
  `)
    n++
  }
}

function ClearMarks() {
  if (confirm("Вы действительно хотите удалить все оценки?") == true) {
    divisible = 0
    divider = 0
    n = 1
    document.getElementById("tag").value = ""
    document.getElementById("mark").value = ""
    document.getElementById("coefficient").value = ""
    document.querySelector('.list').innerHTML = ""
    document.getElementById("middle_mark").innerHTML = `Средний балл: 0.`
    document.getElementById("final_mark").innerHTML = `Итоговая оценка: 0.`
    document.getElementById("final_mark").style.color = "black"
    tag_list = []
    mark_list = []
    coefficient_list = []
  }
}
