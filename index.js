let InputBox  = document.getElementById('taskName');
let InputBtn  = document.getElementById('taskBtn');
let TaskArray = [];

function creatElement(taskName,taskId,taskStatus){

	let newElement = document.createElement("div");
	newElement.setAttribute("id",taskId);
	if(taskStatus)newElement.setAttribute("class","Task");
	else newElement.setAttribute("class"," Task TaskRead");
	newElement.innerText = taskName.toUpperCase();
	document.getElementById('contentContainer').append(newElement);

	newElement.addEventListener("dblclick",deleteTask);
	newElement.addEventListener("click",updateTask);
}


function addTask(event){

	if(InputBox.value != ''){

		let taskValue  = InputBox.value;
		let taskId     = UniqueId();
		let taskStatus = false;

		creatElement(taskValue,taskId,taskStatus);
		const TaskObject = {Id:taskId,Name : taskValue,isCompleted : taskStatus};
		TaskArray.push(TaskObject);
		saveTask(TaskArray);

	}
	else alert("Please Enter Task");
}

function saveTask(data){
	localStorage.setItem("TaskList",JSON.stringify(data));   
}

function viewTask(){
	
	TaskData = JSON.parse(localStorage.getItem("TaskList"));
	if(TaskData != null){
		TaskArray = TaskData;
		for(let i=0;i<TaskArray.length;i++){
			creatElement(TaskArray[i].Name,TaskArray[i].Id,TaskArray[i].isCompleted);
		}
	}

	
}

function updateTask(){
	for(let j=0;j<TaskArray.length;j++){
		if(TaskArray[j].Id == this.id){
			TaskArray[j].isCompleted = !TaskArray[j].isCompleted;
			this.classList.toggle("TaskRead");
		}
	}	
	saveTask(TaskArray);
}

function deleteTask(){
	for(let j=0;j<TaskArray.length;j++){
		if(TaskArray[j].Id == this.id){
			TaskArray.splice(j,1);
			saveTask(TaskArray);
		}
		this.remove();
	}	

}

function keyHandle(event){
	if(event.keyCode === 13) addTask();
}

InputBtn.addEventListener('click',addTask);
InputBox.addEventListener('keyup',keyHandle);

function UniqueId(){

	var dateInfo     = new Date();
	var year         = dateInfo.getFullYear();
	var month        = dateInfo.getMonth();
	var date         = dateInfo.getDate();
	var hourse       = dateInfo.getTime();
	var minutes      = dateInfo.getMinutes();
	var seconds      = dateInfo.getSeconds();
	var milliseconds = dateInfo.getMilliseconds();
	var dateData     = year + month + date + hourse + minutes + seconds + milliseconds;
	return dateData;
}

viewTask();

