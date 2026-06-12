/* ------------------------------------------------ loading the html tags  ---------------------------------- */
let bud_in = document.getElementById('bud_in')
let task_inp = document.getElementById('task-in')
let task_table = document.getElementById("task-table");



/* -------------------------------------------------- create a new task -------------------------------------- */
function create_task(){

    if(task_inp.value === " "){
        alert("input required")
    }
    else{
        let new_table_row = document.createElement('tr')
    
        new_table_row.innerHTML=`
        <td>${task_inp.value}</td>
        <td><input type="number" class="render_in"/></td>
        <td><button class="del_btn">🗑</button></td>
        `
        task_table.appendChild(new_table_row);
        task_inp.value=" "
    }
}

task_inp.addEventListener("keydown",(e)=>{
    if (e.key === "Enter") {
    e.preventDefault();
        create_task()
    }
})
/* ---------------------------------------------- render the data from localstorage -------------------------- */
function renderrer(){
    let bud_local_amt = localStorage.getItem("budget")
    bud_in.value= bud_local_amt
}

document.addEventListener("DOMContentLoaded",()=>{
    renderrer()
    
})

/* -------------------------------------------------- for adding the budjet -------------------------------- */
function add_budjet(bud_amt){ 
    localStorage.setItem("budget",bud_amt);
}


bud_in.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        add_budjet(Number(bud_in.value));
        alert(`Budget of ${bud_in.value} added`);
    }
    else{
        console.log("nothing is working")
    }
});

/* ---------------------------------------- RESET FUNCTIONALITY ---------------------------------------------------- */

function RESET(){
    localStorage.clear()
    window.location.reload()
}

/* ---------------------------------------------------------- print it --------------------------------------------- */
function Print_tasks(){
    
}