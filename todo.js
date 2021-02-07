var button = document.getElementById('add-task');
var list = document.getElementById('list');
var donelist = document.getElementById('doneList'); 

flag_done=false;
var x = 0; //list counter
var y=0; //done list counter
var listarray = Array();
var donearray = Array();
//var flag=false;
function add_element_to_array()
{
        var tsk = document.getElementById("new-task").value;
        document.getElementById("new-task").value = "";
        var task = document.createElement('li'); // create element
        task.className = 'task'; //add class name
        task.id='task'+x+''; // add id
		task.innerHTML = '<div class="delete" id="delete'+ x +'">✕</div><div class="done" id="done'+ x +'">✔</div> <div class="text">'+tsk+'</div>'; // set contents of <li> to string
        localStorage.setItem(task.id, tsk); //add to local storage with unique key
        list.appendChild(task); // add the li to the list
       
         document.getElementById("delete"+x+"").addEventListener("click",removetask); // create the ec=vent lisnter to delete button
         document.getElementById("done"+x+"").addEventListener("click",donetask);  // create the ec=vent lisnter to done button
          
        x++;   // increase the list counter
}

button.addEventListener("click",add_element_to_array);  //the add task button

// remove element function
function removetask(){ 
    localStorage.removeItem(this.parentElement.id); //remove from local storage
    this.parentElement.remove(); // remove from list
    if(flag_done) // check if that element in the list or done list
    y--;
    else
    x--;
}  

// add to donen list function
function donetask(){ 
    var dtsk=this.parentNode.childNodes[3].innerHTML; // get the data from the selected input
    localStorage.removeItem(this.parentElement.id); // remove it from local storage
    var task = document.createElement('li'); // create new element of it in done list
    task.className = 'donetask'; //add class name
    task.id='dtask'+y+''; // add id
    task.innerHTML = '<div class="delete" id="deletedone'+y+'">✕</div> <div class="text">'+dtsk+'</div>'; 
    localStorage.setItem(task.id, dtsk); // add it to local storage with the new key
    donelist.appendChild(task); // append it to the done list
    flag_done=true;  // change flag
    document.getElementById("deletedone"+y+"").addEventListener("click",removetask); // create event lisnter to the delelte button    
    y++; // increase the done list counter
    this.parentElement.remove(); // remove the element from todo list after add it to done list
}

//retrive data from local storage function
function retrive(){
    for(var i=0;i<localStorage.length; i++) //loop on all local storage elements
    {
        if(localStorage.key(i).includes("dtask")){ // specify the done list 
            var dtsk=localStorage.getItem(localStorage.key(i)); // get the data
            var KeyName = localStorage.key(i); // get the key of it
            var skey=KeyName.substr(5,1); // substring to get the element id
            var task = document.createElement('li'); // create the element
            task.className = 'donetask'; //add class
            task.id='dtask'+skey+''; // add id after retrive it
            task.innerHTML = '<div class="delete" id="deletedone'+skey+'">✕</div> <div class="text">'+dtsk+'</div>'; // set contents of <li> to string
            donelist.appendChild(task);
            flag_done=true;
            document.getElementById("deletedone"+skey+"").addEventListener("click",removetask);
        }    
    else
    if (localStorage.key(i).includes("task")){ // specify the todo list 
        var tt=localStorage.getItem(localStorage.key(i));  // get the data
            var KeyName = localStorage.key(i); // get the key of it
            var skey=KeyName.substr(4,1); // substring to get the element id
        var task = document.createElement('li'); // create element
        task.className = 'task'; //add class
        task.id='task'+skey+'';// add id after retrive it
		task.innerHTML = '<div class="delete" id="delete'+ skey +'">✕</div><div class="done" id="done'+ skey +'">✔</div> <div class="text">'+tt+'</div>'; // set contents of <li> to string
        list.appendChild(task);
         document.getElementById("delete"+skey+"").addEventListener("click",removetask);
         document.getElementById("done"+skey+"").addEventListener("click",donetask);
      
     }
 }

}
retrive();
