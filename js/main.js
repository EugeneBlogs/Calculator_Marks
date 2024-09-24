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

function UpdateTable() {
    let const_number = '<th class="table-danger">X (число)</th>'
    let const_count = '<th class="table-danger">M (количество)</th>'
    let text_number = ''
    let text_count = ''
    let numbers = {}
    let copy = []
    for (let i = 0; i < mark_list.length; i++) {
        copy.push(mark_list[i])
    }
    copy.sort(Sort)
    for (let i = 0, j = copy.length; i < j; i++) {
        numbers[copy[i]] = (numbers[copy[i]] || 0) + 1
    }
    for (let index in numbers) {
        if (index < 0) {
            text_number = `\n<td>${index}</td>\n` + text_number
            text_count = `\n<td>${numbers[index]}</td>\n` + text_count
        } else {
            text_number += `\n<td>${index}</td>`
            text_count += `\n<td>${numbers[index]}</td>`
        }
    }
    document.querySelector('.number_distribution').innerHTML = const_number + text_number
    document.querySelector('.count_distribution').innerHTML = const_count + text_count
}

function ShowFormula() {
    let formula = ""
    for (let i = 0; i < mark_list.length; i++) {
        let m = mark_list[i]
        let c = coefficient_list[i]
        formula += m + " * " + c + " + "
    }
    formula = formula.slice(0, -3)
    let all_coef = ""
    for (let i = 0; i < coefficient_list.length; i++) {
        all_coef += coefficient_list[i] + " + "
    }
    all_coef = all_coef.slice(0, -3)
    formula = `<span class="text-danger">(${formula})</span> / <span class="text-warning">(${all_coef})</span> = <span class="text-success">${document.getElementById("middle_mark").innerHTML}</span>`
    document.getElementById("text_formula").innerHTML = formula
    let modal = new bootstrap.Modal(document.getElementById("modal_formula"))
    modal.show()
}

function ShowInfo() {
    let copy_marks = []
    for (let i = 0; i < mark_list.length; i++) {
        copy_marks.push(mark_list[i])
    }
    copy_marks.sort(Sort)
    document.getElementById("text_upor_column").innerHTML = copy_marks
    document.getElementById("text_min").innerHTML = Min(copy_marks)
    document.getElementById("text_max").innerHTML = Max(copy_marks)
    document.getElementById("text_razmah").innerHTML = Razmah(copy_marks)
    document.getElementById("text_sum").innerHTML = Summa(copy_marks)
    document.getElementById("text_geom").innerHTML = Geometry(copy_marks)
    document.getElementById("text_moda").innerHTML = Moda(copy_marks)
    document.getElementById("text_mediana").innerHTML = Mediana(copy_marks)
    document.getElementById("text_dispersia").innerHTML = Dispersiya(copy_marks)
    let modal = new bootstrap.Modal(document.getElementById("modal_info"))
    modal.show()
}

function Sort(a, b) { return a - b }

function Min(array) {
    return Math.min.apply(null, array)
}

function Max(array) {
    return Math.max.apply(null, array)
}

function Razmah(array) {
    let a = Number(Max(array)) - Number(Min(array))
    return Math.round(a * Math.pow(10, 2)) / Math.pow(10, 2)
}

function Summa(array) {
    let sum = 0
    array.forEach(element => {
        sum += Number(element)
    });
    return sum
}

function Geometry(array) {
    let count = array.length
    let proizvedenie = 1
    array.forEach(element => {
        proizvedenie *= Number(element)
    });
    return Math.round(Math.pow(proizvedenie, 1 / count) * Math.pow(10, 4)) / Math.pow(10, 4)
}

function Moda(array) {
    let a = []
    for (let i = 0; i < array.length; i++) {
        a.push(array[i])
    }
    let none_repeat = a.filter((item, index) => a.indexOf(item) === index)
    let results = []
    let count = 0
    while (a.length != 0) {
        let frequency = {}
        let maxValue = 0
        let maxKey = 0
        for (let v in a) {
            frequency[a[v]] = (frequency[a[v]] || 0) + 1
            if (frequency[a[v]] > maxValue) {
                maxValue = frequency[a[v]]
                maxKey = a[v]
            }
        }
        if (results.length == 0) {
            if (!results.includes(maxKey)) results.push(maxKey)
            count = maxValue
        } else {
            if (maxValue == count) {
                if (!results.includes(maxKey)) results.push(maxKey)
            }
        }
        a.shift()
    }
    return results
}

function Mediana(array) {
    let length = array.length
    if (length > 1) {
        if (length % 2 != 0) {
            let index = Math.round(length / 2)
            return array[index - 1]
        } else {
            let index = length / 2
            index--
            let a = Number(array[index])
            let b = Number(array[index + 1])
            let c = a + b
            return c / 2
        }
    } else {
        return "не обнаружена"
    }
}

function Dispersiya(array) {
    let srednee = 0
    let chislitel = 0
    let znamenatel = 0
    for (let i = 0; i < mark_list.length; i++) {
        let pred = Number(mark_list[i]) * Number(coefficient_list[i])
        chislitel += pred
        znamenatel += Number(coefficient_list[i])
    }
    srednee = chislitel / znamenatel
    srednee = Math.round(srednee * Math.pow(10, 2)) / Math.pow(10, 2)
    let chislitel_dispersii = 0
    for (let i = 0; i < mark_list.length; i++) {
        let a = Number(mark_list[i]) - Number(srednee)
        let b = Math.pow(a, 2)
        let c = Number(b) * Number(coefficient_list[i])
        chislitel_dispersii += c
    }
    let result = chislitel_dispersii / znamenatel
    result = Math.round(result * Math.pow(10, 2)) / Math.pow(10, 2)
    return result
}

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
    UpdateTable()
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
    UpdateTable()
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
    UpdateTable()
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
    UpdateTable()
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
