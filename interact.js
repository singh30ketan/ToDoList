const inputTaskTitle = document.getElementById("task-title");
const dueDate = document.getElementById("due-date");
const category = document.getElementById("category");
const addTaskButton = document.getElementById("Add-task");
const parentgrid = document.querySelector(".parentgrid");
const searchbarinput = document.querySelector(".searchbarinput")
const filterType = document.getElementById("filter");
const paydate = document.getElementById("paydate");

show()
addTaskButton.addEventListener('click', () => {
  console.log("click done")
  addTask();
})

function addTask() {
  if (!localStorage.getItem(`tasks`)) {
    localStorage.setItem(`tasks`, JSON.stringify([]));
  }

  if (
    inputTaskTitle.value &&
    category.value &&
    dueDate.value
  ) {

    
    let temptasks = getTasks()
    if(temptasks.length!=0){
      temptasks = temptasks.sort((a,b)=>{
        return a.id - b.id
      })
    }

    
    let leng = temptasks.length>0?  temptasks[temptasks.length-1].id+1 : 0;

    let task = {
      title: inputTaskTitle.value,
      category: category.value,
      due: dueDate.value,
      status: false,
      id: leng
    };

    let tasks = getTasks();
    tasks.push(task);
    console.log(tasks);
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
  }

  show(state=true);
}


function show(state=false) {
  let tasks = getTasks();
  if(state){
    loadToUi(tasks,type="all",last=true);
  }
  loadToUi(tasks);
}


searchbarinput.addEventListener("input", () => {
  search()
})
filterType.addEventListener("change", () => {
  search()
})

function search() {

  
  let tasks = getTasks();

  searchedtasks = tasks.filter((task) => {

    return task.title.toLowerCase().includes(searchbarinput.value.toLowerCase())
  });
  
  loadToUi(searchedtasks, filterType.value);
}

function changeStatus(id) {
  let tasks = getTasks();
  tasks = tasks.map(task=>{
    if(task.id==id){
      task.status = !task.status
    }
    return task
  });
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
  show();
}

function deleteTask(id) {
  let tasks = getTasks();
  
  tasks = tasks.filter(task=>{
    if(task.id==id){
      return false
    }
    return true
  });
  localStorage.setItem(`tasks`, JSON.stringify(tasks));
  show();
}



paydate.addEventListener("click", () => {
  sortTask()
})


function sortTask() {
  let tasks = getTasks();

  // if(paydate.classList.contains("on")){
    tasks.sort(function (a, b) {

      let temp = new Date(a.due) - new Date(b.due);
    
      return temp;
  
    });
  //   paydate.classList.remove("on")
  // }else{
  //   paydate.classList.add("on")
  // }

  loadToUi(tasks);
}

function loadToUi(parsedData, type = "all",last=false) {
  parentgrid.innerHTML = "";



  parsedData.forEach((task, index) => {
    let gridchild = document.createElement("div");
    gridchild.classList.add("gridchild");

    let coldiv1 = document.createElement("div");
    coldiv1.classList.add("coldiv1");

    let coldiv1Child = document.createElement("div");
    coldiv1Child.classList.add("coldiv1-child");

    let coldiv1Button = document.createElement("div");
    coldiv1Button.classList.add("coldiv1-button");

   

    let dropDown = document.createElement("div")
    let img1 = document.createElement("img")
    let img2 = document.createElement("img")
    img1.setAttribute("id", "img1")
    img2.setAttribute("id", "img2")
    img1.src = "icons8-check-25.png"
    img2.src = "icons8-delete-25.png"
    dropDown.appendChild(img1)
    dropDown.appendChild(img2)
    
    coldiv1Button.appendChild(dropDown)
    // coldiv1Child.appendChild(imageTask)
    coldiv1.appendChild(coldiv1Child)
    coldiv1.appendChild(coldiv1Button)
    gridchild.appendChild(coldiv1)

    let coldiv2 = document.createElement("div");
    let paracoldivTwo = document.createElement("p");
    coldiv2.classList.add("coldiv2");
    let coldiv3 = document.createElement("div");
    let paracoldivThree = document.createElement("p");
    coldiv3.classList.add("coldiv3");
    let coldiv4 = document.createElement("div");
    let paracoldivFour = document.createElement("p");
    coldiv4.classList.add("coldiv4");

    paracoldivTwo.innerHTML = `${task.category}`
    coldiv2.appendChild(paracoldivTwo)
    paracoldivThree.innerHTML = `${task.title}`
    paracoldivThree.contentEditable = "true"
    coldiv3.appendChild(paracoldivThree)
    paracoldivFour.innerHTML = `${task.due}`
    coldiv4.appendChild(paracoldivFour)
    gridchild.appendChild(coldiv2)
    gridchild.appendChild(coldiv3)
    gridchild.appendChild(coldiv4)
    // if( task.id==(parsedData.length)-1 && last==true ){
    //   console.log(last)
    //   gridchild.classList.add("new-box")
    //   console.log(parsedData.length)
    // }

    paracoldivThree.addEventListener("input", (e) => {
      paracoldivThree.style.whiteSpace = "wrap"
      console.log(paracoldivThree.innerHTML)
      task.title = paracoldivThree.innerHTML
      parsedData[task.id] = task
      localStorage.setItem("tasks", JSON.stringify(parsedData))
    })

    if (task.status == true) {
      img1.src = "./icons8-reset-32.png"
    } else {
      img1.src = "./icons8-check-25.png"
    }
    img1.onclick = () => {
     
      changeStatus(task.id);
      sortTask();
    };

    img2.onclick = () => {
      deleteTask(task.id)
    }

    


    function addOrNot(list, taskcon, task) {
      //   console.log(type);
      if (type == "all") {
        list.appendChild(taskcon);
      } else if (type == "incompleted") {
        if (task.status == false) {
          list.appendChild(taskcon);
        }
      } else if (type == "completed") {
        if (task.status == true) {
          list.appendChild(taskcon);
        }
      }
    }
    
    
   
    addOrNot(parentgrid, gridchild, task)


  });
}




function getTasks() {
  return JSON.parse(localStorage.getItem(`tasks`)) || [];
}



let a;
let time;
setInterval(()=>{
  a=new Date();
  time=a.getHours()+":"+ a.getMinutes() +":"+ a.getSeconds();
  document.getElementById('currenttime').innerHTML=time;
},1000);