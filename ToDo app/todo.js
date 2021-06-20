const getTasks = () => {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || []
    return tasks
}
const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const createElement = (parent, element, classes , attributes, text) => {
    const myElement = document.createElement(element)
    parent.appendChild(myElement)
    if(classes != '') myElement.className = classes
    if(text != '') myElement.textContent = text
    if(attributes.length != 0){    
        attributes.forEach(attribute=>{
            myElement.setAttribute(attribute.attrName, attribute.attValue)
        })
    }
    return myElement
}
const addtask = (taskId, taskTitle, taskContent, type, taskdueDate, taskStatus, taskImportant) => {
    let task = {
        id:taskId ,
        title: taskTitle,
        content:taskContent,
        taskType:type,
        dueDate:taskdueDate,
        status:taskStatus,
        important:taskImportant
    }
    tasks = getTasks()
    tasks.push(task)
    saveTasks(tasks)
    showAllTasks()
    this.reset()
}
document.querySelector('#addTask').addEventListener('submit', function(){
    addtask()
})

const showAllTasks = () => {
    tasks = getTasks()
    let section =document.querySelector('#allTasks')
    tasks.forEach(t => {
        let div = createElement(section,'div','bg-info text-dark mb-1 text-center ' , [], '')
        createElement(div,'h6', '', [], `id: ${t.id}`)
        createElement(div,'h6', '', [], `title: ${t.title}`)
        createElement(div,'h6', '', [], `task Content: ${t.content}`)
        createElement(div,'h6', '', [], `type: ${t.taskType}`)
        createElement(div,'h6', '', [], `task dueDate: ${t.dueDate}`)
        createElement(div,'h6', '', [], `taskStatus: ${t.status}`)
        createElement(div,'h6', '', [], `taskImportant: ${t.important}`)
        createElement(div,'button','btn btn-primary edit',[],'edit')
        createElement(div,'button','btn btn-danger delete',[],'delete')
      //console.log(`id: ${t.id}  title: ${t.title} task Content: ${t.content}`)
     
    });
}

showAllTasks()
const getTaskIndex = (id) => {
    tasks = getTasks()
    findedTask = tasks.findIndex(t => t.taskId == id)
    return findedTask
}
const editTask = (id, title, content , dueDate , status, important) => {
    findedTask = getTaskIndex(id)
    if (findedTask == -1) return console.log('task not found')
   tasks = getTasks()
    tasks[findedTask].taskTitle = title
    tasks[findedTask].taskContent = content
    tasks[findedTask].taskdueDate = dueDate
    tasks[findedTask].taskStatus = status
    tasks[findedTask].taskImportant = important
    saveTasks(tasks)
}

const deleteTask = (id) => {
    findedTask  = getTaskIndex(id)
    if (findedTask  === -1) return console.log('task not found')
    tasks = getTasks()
    tasks.splice(findedTask, 1)
    saveTasks(tasks)
}

// addtask(1, "111","content", "taskType", "dueDate", "status", "important")
// addtask(2, "222","content", "taskType", "dueDate", "status", "important")
// addtask(3, "333","content", "taskType", "dueDate", "status", "important")
// deleteTask(1)
// editTask(3, "333","3", "taskType")
// showAllTasks()