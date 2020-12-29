let todoData = [{
}
]

let doneData = [{

}]

let viewData = [{

}]

let flag = false;

const getFormatDate = (date)=>{
    let year = date.getFullYear();
    let month = (1+ date.getMonth());
    month = month >=10 ? month : '0' + month;    
    let day = date.getDate();
    day = day >= 10? day : '0' +day;
    return year + '-'+ month +'-' + day
}
let doneDate = getFormatDate(new Date());

let todoId = 0;
let doneId = 0;
let todoTitleId = 0;
let dateId = 2020;
let removeTodoList = [];
let alreadyRemoved = [];

const todoTable = document.getElementById('todo-list');
const doneTable = document.getElementById('done-list');
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('input-title');
const content = document.getElementById('input-content');
const inputDate = document.getElementById('input-date');
const todoListContainer = document.getElementById('todo-list-container');
const doneListContanier = document.getElementById('done-list-container');
const closeModalBtn = document.getElementById('modal-close-btn');
const modal = document.getElementById('modal-box');
const submit = document.getElementById('submit');

if(!todoData.content){
    todoListContainer.style.display = 'none';
    doneListContanier.style.display = 'none';
    submit.style.display = 'none';
}

IDBFactory
addBtn.addEventListener("click", () => {
    submit.style.display ='';
    //수정 버튼, 삭제 버튼 추가
    const isAdd = true;
    if(title.value ==""){
        alert('제목을 입력해주세요 !')
    }
    else if (content.value == ""){
        alert('할 일을 입력해주세요 !')
    }
    else if (inputDate.value == ""){
        alert('마감 날짜를 입력해주세요 !')
    }
    else {
        todoId += 1;
        doneId += 2;
        todoTitleId -=1;
        dateId += 1;
        const todoTrId = todoId;
        const doneTrId = doneId;
        const todoTitleTdId = todoTitleId;
        const dateTdId = dateId;
        
        const tr = document.createElement('tr');
        tr.id = todoTrId;
        const titleTd = document.createElement('td');
        titleTd.id = todoTitleTdId;
        const checkTd = document.createElement('td');
        const createDateTd = document.createElement('td');
        createDateTd.id = dateId;
        const buttonTd = document.createElement('td');
        const check = document.createElement('input');
        const aT = title.value;
        const aC = content.value;     
        const aD = inputDate.value;
        check.type = 'checkbox';
        check.addEventListener("click", ()=> onClick(todoTrId, doneTrId, titleTd));
        todoData.push({ id: todoId, title: aT, content: aC , deadLine : aD, doneDate : doneDate});
        todoListContainer.style.display = '';
        let span = todoListContainer.parentNode.childNodes[5];
        span.style.display = 'none';
        titleTd.innerText = title.value;
        createDateTd.innerText = inputDate.value;
        tr.appendChild(checkTd);
        checkTd.appendChild(check);
        tr.appendChild(titleTd);
        tr.appendChild(createDateTd);
        titleTd.addEventListener("click", ()=> onRead(todoTrId, aT, aC));
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => onDelete(todoTrId));
        deleteBtn.innerText = '삭제';
        const updateBtn = document.createElement('button');
        updateBtn.addEventListener('click', () => openUpdateModal(todoTrId, todoTitleTdId , dateTdId));
        updateBtn.innerText = '수정';
        buttonTd.appendChild(deleteBtn);
        buttonTd.appendChild(updateBtn);
        tr.appendChild(buttonTd);
        todoTable.appendChild(tr);

        title.value = "";
        content.value = "";
        inputDate.value = "";
    }
});

submit.addEventListener('click', ()=> onCheck());

const onClick = (todoId, doneId, title)=>{
    let _isChecked = doneData.find(done => done.id === doneId);
    let todoToDoneData = todoData.find(item => item.id === todoId);
    let _isRemoveChecked = removeTodoList.find(item => item === todoId);
    if(!_isChecked){
        title.style.textDecoration = "line-through";
        doneData.push(todoToDoneData);
    }
    else {
        title.style.textDecoration = "none";
        doneData = doneData.filter(done => done.id !== doneId);
    }
    if(!_isRemoveChecked){
        removeTodoList.push(todoId);
    }
    else {
        removeTodoList.filter(item => item !== todoId);
    }
}



const closeReadModal =(title, content)=>{
    document.querySelector('.modal').classList.add('hidden');
    modal.removeChild(title);
    modal.removeChild(content);    
}

const closeUpdateModal = (inputContainer)=>{
    document.querySelector('.modal').classList.add('hidden');
    modal.removeChild(inputContainer);
}

const onRead =(id, title, content)=>{    
    document.querySelector('.modal').classList.remove('hidden');
        const modalTitle = document.createElement('h3');
        const modalContent = document.createElement('span');
        modalTitle.innerText = title;
        modalContent.innerText = content;
        modal.appendChild(modalTitle);
        modal.appendChild(modalContent);
        closeModalBtn.addEventListener('click', ()=> closeReadModal( modalTitle, modalContent));

}

const openUpdateModal = (trId, titleId, dateId) => {
    let toUpdateData = todoData.find(item => item.id === trId);
    document.querySelector('.modal').classList.remove('hidden');
    const inputContainer = document.createElement('div');
    inputContainer.id = 'input-container'
    const inputTitle = document.createElement('input');
    const inputContent = document.createElement('input');
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    const submit = document.createElement('button');
    submit.innerText="저장"
    submit.style.backgroundColor = 'black';
    submit.style.color = ' white';
    submit.style.width = 'auto';
    inputTitle.value = toUpdateData.title;
    inputContent.value = toUpdateData.content;
    inputDate.value = toUpdateData.deadLine;
    inputTitle.style.marginBottom="7px";
    inputContent.style.marginBottom="7px";
    inputDate.style.marginBottom = "20px";
    inputContainer.appendChild(inputTitle);
    inputContainer.appendChild(inputContent);
    inputContainer.appendChild(inputDate);
    inputContainer.appendChild(submit);
    modal.appendChild(inputContainer);
    closeModalBtn.addEventListener('click', ()=> closeUpdateModal( inputContainer));
    submit.addEventListener('click', ()=> onUpdate(trId, titleId, dateId, inputTitle.value, inputContent.value, inputDate.value, inputContainer));
};

const onUpdate = (id, titleId, dateId, title, value, inputDate, inputContainer)=>{
    let updateIndex = todoData.findIndex(item => item.id === id);    
    const updateItem = {id : id, title : title, content : value, deadLine : inputDate, doneDate : doneDate};
    todoData.splice(updateIndex,1, updateItem );   
    console.log(todoData); 
    const updateHTML = document.getElementById(id);
    console.log(updateHTML)
    const titleHTML = document.getElementById(titleId);
    const dateHTML = document.getElementById(dateId);
    console.log(dateHTML)
    const titleTd = document.createElement('td');
    const dateTd = document.createElement('td');    
    titleTd.innerText = title;  
    dateTd.innerText = inputDate;
    titleTd.id = titleId;
    dateTd.id = dateId;
    titleTd.addEventListener("click", ()=> onRead(id, title, value))
    updateHTML.removeChild(titleHTML);
    updateHTML.removeChild(dateHTML);
    updateHTML.insertBefore(titleTd, updateHTML.childNodes[1]);
    updateHTML.insertBefore(dateTd, updateHTML.childNodes[2]);
    closeUpdateModal( inputContainer)
}
const onDelete = trId => {
    todoData = todoData.filter(item => item.id !==trId);
    const remove = document.getElementById(trId);
    todoTable.removeChild(remove);
};

const onCheck = () => {
    let _index = [];
    doneListContanier.style.display = '';
    doneTable.innerHTML = '';
    console.log(doneData);
    doneData.forEach((item, index)=> {
         if( index > 0){
             const tr = document.createElement('tr'); 
             tr.className= "relative";
             const titleTd = document.createElement('td');
             const popoverContainer = document.createElement('div');
             const popoverBox = document.createElement('div');
             popoverContainer.className = "popover";
             popoverContainer.style.display = "none";             
             popoverBox.className = "popover-box"
             popoverBox.innerText = item.doneDate + "에 끝";             
             popoverContainer.appendChild(popoverBox);
             tr.id = item.id;            
             titleTd.innerText = item.title;
             titleTd.addEventListener("mouseover", ()=> {
                 popoverContainer.style.display = "";
             })
             titleTd.addEventListener("mouseout", ()=> {
                popoverContainer.style.display = "none";
            })
             tr.appendChild(titleTd);
             tr.appendChild(popoverContainer);
             doneTable.appendChild(tr);
         }
     })

    todoData= todoData.filter((todo) =>{
       let _remove = removeTodoList.find(remove => remove.id === todo.id);
       return _remove === undefined;
    });

    removeTodoList= removeTodoList.filter((item)=> item!== alreadyRemoved.find((remove)=> remove == item))

    removeTodoList.forEach((id)=>{
        alreadyRemoved.push(id);
        console.log(id);
        const remove = document.getElementById(id);
        
        todoTable.removeChild(remove);
    })
}
