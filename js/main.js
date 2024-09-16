let divisible = 0
let divider = 0
let n = 1
let tag_list = []
let mark_list = []
let coefficient_list = []

let modal_error = new bootstrap.Modal(document.getElementById("modal_error"))
let modal_result = new bootstrap.Modal(document.getElementById("modal_result"))

document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("calculator_marks_list") != null) {
        let modal_storage = new bootstrap.Modal(document.getElementById("modal_storage")).show()
    }
});

function UpdateStorage() {
    let result_marks = []
    for (let i = 0; i < mark_list.length; i++) {
        let mark = [tag_list[i], mark_list[i], coefficient_list[i]]
        result_marks.push(mark)
    }
    if (result_marks.length != 0) {
        localStorage.setItem("calculator_marks_list", JSON.stringify(result_marks))
    } else {
        localStorage.removeItem("calculator_marks_list")
    }
}

function LoadStorage() {
    let marks = JSON.parse(localStorage.getItem("calculator_marks_list"))
    for (let i = 0; i < marks.length; i++) {
        let t = marks[i][0]
        let m = marks[i][1]
        let c = marks[i][2]
        divisible += eval(m * c)
        divider += eval(c)
        let middle = eval(divisible / divider)
        middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
        document.getElementById("middle_mark").innerHTML = middle
        let rounded = Math.round(middle)
        document.getElementById("final_mark").innerHTML = rounded
        if (rounded == "5") {
            document.getElementById("final_mark_block").style.color = "green"
        } else if (rounded == "4") {
            document.getElementById("final_mark_block").style.color = "lightgreen"
        } else if (rounded == "3") {
            document.getElementById("final_mark_block").style.color = "orange"
        } else if (rounded == "2") {
            document.getElementById("final_mark_block").style.color = "red"
        } else if (rounded == "1") {
            document.getElementById("final_mark_block").style.color = "darkred"
        } else {
            document.getElementById("final_mark_block").style.color = "blue"
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
    document.getElementById("text_result").innerHTML = `История успешно загружена!`
    modal_result.show()
}

function AddMark() {
    let t = document.getElementById("tag").value
    let m = document.getElementById("mark").value
    let c = document.getElementById("coefficient").value
    let r = document.getElementById("repeat").value
    if (c == null || c == "") {
        c = "1"
    }
    if (r == null || r == "") {
        r = "1"
    }
    for (let i = 0; i < Number(r); i++) {
        divisible += eval(m * c)
        divider += eval(c)
        let middle = eval(divisible / divider)
        middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
        document.getElementById("middle_mark").innerHTML = middle
        let rounded = Math.round(middle)
        document.getElementById("final_mark").innerHTML = rounded
        if (rounded == "5") {
            document.getElementById("final_mark_block").style.color = "green"
        } else if (rounded == "4") {
            document.getElementById("final_mark_block").style.color = "lightgreen"
        } else if (rounded == "3") {
            document.getElementById("final_mark_block").style.color = "orange"
        } else if (rounded == "2") {
            document.getElementById("final_mark_block").style.color = "red"
        } else if (rounded == "1") {
            document.getElementById("final_mark_block").style.color = "darkred"
        } else {
            document.getElementById("final_mark_block").style.color = "blue"
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
    UpdateStorage()
}

function DeleteElement(num) {
    tag_list.splice(num - 1, 1)
    mark_list.splice(num - 1, 1)
    coefficient_list.splice(num - 1, 1)
    divisible = 0
    divider = 0
    n = 1
    document.querySelector('.list').innerHTML = ""
    document.getElementById("middle_mark").innerHTML = `0`
    document.getElementById("final_mark").innerHTML = `0`
    document.getElementById("final_mark_block").style.color = "black"
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
        middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
        document.getElementById("middle_mark").innerHTML = middle
        let rounded = Math.round(middle)
        document.getElementById("final_mark").innerHTML = rounded
        if (rounded == "5") {
            document.getElementById("final_mark_block").style.color = "green"
        } else if (rounded == "4") {
            document.getElementById("final_mark_block").style.color = "lightgreen"
        } else if (rounded == "3") {
            document.getElementById("final_mark_block").style.color = "orange"
        } else if (rounded == "2") {
            document.getElementById("final_mark_block").style.color = "red"
        } else if (rounded == "1") {
            document.getElementById("final_mark_block").style.color = "darkred"
        } else {
            document.getElementById("final_mark_block").style.color = "blue"
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
    UpdateStorage()
}

function ClearMarks() {
    divisible = 0
    divider = 0
    n = 1
    document.getElementById("tag").value = ""
    document.getElementById("mark").value = ""
    document.getElementById("coefficient").value = ""
    document.getElementById("repeat").value = ""
    document.querySelector('.list').innerHTML = ""
    document.getElementById("middle_mark").innerHTML = `0`
    document.getElementById("final_mark").innerHTML = `0`
    document.getElementById("final_mark_block").style.color = "black"
    tag_list = []
    mark_list = []
    coefficient_list = []
    UpdateStorage()
}

function ShowPrompt() {
    for (let i = 2; i < 6; i++) {
        document.getElementById(`mark_${i}`).style.display = "inline-block"
        document.getElementById(`mark_${i}_lab`).style.display = "inline-block"
    }
    let current = Number(document.getElementById("final_mark").innerHTML)
    if (current == 5) {
        document.getElementById("text_error").innerHTML = "Текущая отметка является самой высокой."
        modal_error.show()
        return;
    } else if (current == 4) {
        document.getElementById("mark_5").checked = true
        CountMarks()
        return;
    } else if (current == 3) {
        document.getElementById("mark_2").style.display = "none"
        document.getElementById("mark_2_lab").style.display = "none"
        document.getElementById("mark_3").style.display = "none"
        document.getElementById("mark_3_lab").style.display = "none"
    } else if (current == 2) {
        document.getElementById("mark_2").style.display = "none"
        document.getElementById("mark_2_lab").style.display = "none"
    } else if (current == 1) { } else {
        document.getElementById("text_error").innerHTML = "Текущая отметка не соответствует 5-бальной системе оценивания."
        modal_error.show()
        return;
    }
    let modal_prompt = new bootstrap.Modal(document.getElementById("modal_prompt")).show()
}

function CountMarks() {
    let count_5 = 0
    let count_4 = 0
    let count_3 = 0
    let count_2 = 0
    let divisible_copy = divisible
    let divider_copy = divider
    let middle = eval(divisible_copy / divider_copy)
    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
    let rounded = Math.round(middle)
    if (rounded == 5 || rounded == 4 || rounded == 3 || rounded == 2 || rounded == 1) {
        let user_mark = ""
        if (document.getElementById("mark_2").checked) {
            user_mark = "2"
        } else if (document.getElementById("mark_3").checked) {
            user_mark = "3"
        } else if (document.getElementById("mark_4").checked) {
            user_mark = "4"
        } else if (document.getElementById("mark_5").checked) {
            user_mark = "5"
        } else {
            document.getElementById("text_error").innerHTML = "Выберите оценку."
            modal_error.show()
        }
        for (let i = 2; i < 6; i++) {
            document.getElementById(`mark_${i}`).checked = false
        }
        if (user_mark == "5") {
            if (Number(user_mark) <= rounded) {
                document.getElementById("text_error").innerHTML = "Вы уже имеете данную оценку, или желаемая оценка ниже текущей."
                modal_error.show()
            } else {
                while (rounded < Number(user_mark)) {
                    divisible_copy += 5
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_5++
                }
                document.getElementById("text_result").innerHTML = `До <span class="text-primary">${user_mark}</span> вам нужно <span class="text-danger">${count_5}</span> пятёрок.`
                modal_result.show()
            }
        } else if (user_mark == "4") {
            if (Number(user_mark) <= rounded) {
                document.getElementById("text_error").innerHTML = "Вы уже имеете данную оценку, или желаемая оценка ниже текущей."
                modal_error.show()
            } else {
                while (rounded < Number(user_mark)) {
                    divisible_copy += 5
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_5++
                }
                divisible_copy = divisible
                divider_copy = divider
                middle = eval(divisible_copy / divider_copy)
                middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                rounded = Math.round(middle)
                while (rounded < Number(user_mark)) {
                    divisible_copy += 4
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_4++
                }
                document.getElementById("text_result").innerHTML = `До <span class="text-primary">${user_mark}</span> вам нужно <span class="text-danger">${count_5}</span> пятёрок или <span class="text-danger">${count_4}</span> четвёрок.`
                modal_result.show()
            }
        } else if (user_mark == "3") {
            if (Number(user_mark) <= rounded) {
                document.getElementById("text_error").innerHTML = "Вы уже имеете данную оценку, или желаемая оценка ниже текущей."
                modal_error.show()
            } else {
                while (rounded < Number(user_mark)) {
                    divisible_copy += 5
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_5++
                }
                divisible_copy = divisible
                divider_copy = divider
                middle = eval(divisible_copy / divider_copy)
                middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                rounded = Math.round(middle)
                while (rounded < Number(user_mark)) {
                    divisible_copy += 4
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_4++
                }
                divisible_copy = divisible
                divider_copy = divider
                middle = eval(divisible_copy / divider_copy)
                middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                rounded = Math.round(middle)
                while (rounded < Number(user_mark)) {
                    divisible_copy += 3
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_3++
                }
                document.getElementById("text_result").innerHTML = `До <span class="text-primary">${user_mark}</span> вам нужно <span class="text-danger">${count_5}</span> пятёрок, <span class="text-danger">${count_4}</span> четвёрок или <span class="text-danger">${count_3}</span> троек.`
                modal_result.show()
            }
        } else if (user_mark == "2") {
            if (Number(user_mark) <= rounded) {
                document.getElementById("text_error").innerHTML = "Вы уже имеете данную оценку, или желаемая оценка ниже текущей."
                modal_error.show()
            } else {
                while (rounded < Number(user_mark)) {
                    divisible_copy += 5
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_5++
                }
                divisible_copy = divisible
                divider_copy = divider
                middle = eval(divisible_copy / divider_copy)
                middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                rounded = Math.round(middle)
                while (rounded < Number(user_mark)) {
                    divisible_copy += 4
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_4++
                }
                divisible_copy = divisible
                divider_copy = divider
                middle = eval(divisible_copy / divider_copy)
                middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                rounded = Math.round(middle)
                while (rounded < Number(user_mark)) {
                    divisible_copy += 3
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_3++
                }
                divisible_copy = divisible
                divider_copy = divider
                middle = eval(divisible_copy / divider_copy)
                middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                rounded = Math.round(middle)
                while (rounded < Number(user_mark)) {
                    divisible_copy += 2
                    divider_copy += 1
                    middle = eval(divisible_copy / divider_copy)
                    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
                    rounded = Math.round(middle)
                    count_2++
                }
                document.getElementById("text_result").innerHTML = `До <span class="text-primary">${user_mark}</span> вам нужно <span class="text-danger">${count_5}</span> пятёрок, <span class="text-danger">${count_4}</span> четвёрок, <span class="text-danger">${count_3}</span> троек или <span class="text-danger">${count_2}</span> двоек.`
                modal_result.show()
            }
        }
    } else {
        document.getElementById("text_error").innerHTML = "Текущая отметка не соответствует 5-бальной системе оценивания."
        modal_error.show()
    }
}

function Mistakes() {
    let count_4 = 0
    let count_3 = 0
    let count_2 = 0
    let count_1 = 0
    let divisible_copy = divisible
    let divider_copy = divider
    let middle = eval(divisible_copy / divider_copy)
    middle = Math.round(middle * Math.pow(10, 2)) / Math.pow(10, 2)
    let rounded = Math.round(middle)
    if (rounded == 5) {
        let chisl = divisible_copy
        let znam = divider_copy
        let sred = middle
        let round = rounded
        while (round > 4) {
            chisl += 4
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 4) count_4++
        }
        chisl = divisible_copy
        znam = divider_copy
        sred = middle
        round = rounded
        while (round > 4) {
            chisl += 3
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 4) count_3++
        }
        chisl = divisible_copy
        znam = divider_copy
        sred = middle
        round = rounded
        while (round > 4) {
            chisl += 2
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 4) count_2++
        }
        chisl = divisible_copy
        znam = divider_copy
        sred = middle
        round = rounded
        while (round > 4) {
            chisl += 1
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 4) count_1++
        }
        document.getElementById("text_result").innerHTML = `До понижения оценки вы можете получить ещё <span class="text-danger">${count_4}</span> четвёрок, <span class="text-danger">${count_3}</span> троек, <span class="text-danger">${count_2}</span> двоек или <span class="text-danger">${count_1}</span> единиц.`
        modal_result.show()
    } else if (rounded == 4) {
        let chisl = divisible_copy
        let znam = divider_copy
        let sred = middle
        let round = rounded
        while (round > 3) {
            chisl += 3
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 3) count_3++
        }
        chisl = divisible_copy
        znam = divider_copy
        sred = middle
        round = rounded
        while (round > 3) {
            chisl += 2
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 3) count_2++
        }
        chisl = divisible_copy
        znam = divider_copy
        sred = middle
        round = rounded
        while (round > 3) {
            chisl += 1
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 3) count_1++
        }
        document.getElementById("text_result").innerHTML = `До понижения оценки вы можете получить ещё <span class="text-danger">${count_3}</span> троек, <span class="text-danger">${count_2}</span> двоек или <span class="text-danger">${count_1}</span> единиц.`
        modal_result.show()
    } else if (rounded == 3) {
        let chisl = divisible_copy
        let znam = divider_copy
        let sred = middle
        let round = rounded
        while (round > 2) {
            chisl += 2
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 2) count_2++
        }
        chisl = divisible_copy
        znam = divider_copy
        sred = middle
        round = rounded
        while (round > 2) {
            chisl += 1
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 2) count_1++
        }
        document.getElementById("text_result").innerHTML = `До понижения оценки вы можете получить ещё <span class="text-danger">${count_2}</span> двоек или <span class="text-danger">${count_1}</span> единиц.`
        modal_result.show()
    } else if (rounded == 2) {
        let chisl = divisible_copy
        let znam = divider_copy
        let sred = middle
        let round = rounded
        while (round > 1) {
            chisl += 1
            znam += 1
            sred = eval(chisl / znam)
            sred = Math.round(sred * Math.pow(10, 2)) / Math.pow(10, 2)
            round = Math.round(sred)
            if (round > 1) count_1++
        }
        document.getElementById("text_result").innerHTML = `До понижения оценки вы можете получить ещё <span class="text-danger">${count_1}</span> единиц.`
        modal_result.show()
    } else if (rounded == 1) {
        document.getElementById("text_error").innerHTML = "Текущая отметка является самой низкой."
        modal_error.show()
    } else {
        document.getElementById("text_error").innerHTML = "Текущая отметка не соответствует 5-бальной системе оценивания."
        modal_error.show()
    }
}