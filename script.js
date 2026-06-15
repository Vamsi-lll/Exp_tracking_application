/* ------------------------------------------------ loading the html tags ---------------------------------- */
let bud_in = document.getElementById('bud_in')
let task_inp = document.getElementById('task-in')
let task_table = document.getElementById("task-table");
let left = document.getElementById("left_")
let spent = document.getElementById("spent_")

/* -------------------------------------------------- local storage data -------------------------------------- */

let all_tasks = JSON.parse(localStorage.getItem("tasks")) || []

/* -------------------------------------------------- create a new task -------------------------------------- */

function create_task(){

    if(task_inp.value.trim() === ""){
        alert("input required")
        return
    }

    all_tasks.push({
        task: task_inp.value,
        amount: 0
    })

    localStorage.setItem("tasks", JSON.stringify(all_tasks))

    task_inp.value = ""

    renderrer()
}

task_inp.addEventListener("keydown",(e)=>{
    if (e.key === "Enter") {
        e.preventDefault();
        create_task()
    }
})

/* ---------------------------------------------- render the data from localstorage -------------------------- */

function renderrer(){

    let bud_local_amt = localStorage.getItem("budget") || 0
    bud_in.value = bud_local_amt

    task_table.innerHTML = ''

    all_tasks.forEach((task_obj,index)=>{

        let new_table_row = document.createElement('tr')

        let display_task = task_obj.task

        if(display_task.length >= 20){
            display_task = display_task.slice(0,19) + "..."
        }

        new_table_row.innerHTML = `
            <td>${display_task}</td>
            <td>
                <input
                    type="number"
                    class="render_in"
                    value="${task_obj.amount}"
                />
            </td>
            <td>
                <button class="del_btn">🗑</button>
            </td>
        `

        task_table.appendChild(new_table_row)

        /* update amount */

        let amount_input = new_table_row.querySelector(".render_in")

        amount_input.addEventListener("input",()=>{

            all_tasks[index].amount = Number(amount_input.value)

            localStorage.setItem(
                "tasks",
                JSON.stringify(all_tasks)
            )

            calculate_totals()
        })

        /* delete task */

        let del_btn = new_table_row.querySelector(".del_btn")

        del_btn.addEventListener("click",()=>{

            all_tasks.splice(index,1)

            localStorage.setItem(
                "tasks",
                JSON.stringify(all_tasks)
            )

            renderrer()
        })
    })

    calculate_totals()
}

/* ---------------------------------------------- calculate spent and left ------------------------------------ */

function calculate_totals(){

    let total_spent = 0

    all_tasks.forEach((task)=>{

        total_spent += Number(task.amount)
    })

    spent.innerText = `Spent : ${total_spent}`

    let budget = Number(localStorage.getItem("budget")) || 0

    let left_amt = budget - total_spent

    left.innerText = `Left : ${left_amt}`
}

/* -------------------------------------------------- page load ---------------------------------------------- */

document.addEventListener("DOMContentLoaded",()=>{

    renderrer()
})

/* -------------------------------------------------- for adding the budget ---------------------------------- */

function add_budjet(bud_amt){

    localStorage.setItem("budget",bud_amt)

    calculate_totals()
}

bud_in.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        e.preventDefault()

        add_budjet(Number(bud_in.value))

        alert(`Budget of ${bud_in.value} added`)
    }
})

/* ---------------------------------------- RESET FUNCTIONALITY ---------------------------------------------- */

function RESET(){

    localStorage.removeItem("budget")
    localStorage.removeItem("tasks")

    window.location.reload()
}

/* ---------------------------------------------------------- print it -------------------------------------- */

function Print_tasks(){

    window.print()
}