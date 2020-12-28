let todoData = [{
}
]

let doneData = [{

}]

let viewData = [{

}]

let flag = false;


let todoId = 0;
let doneId = 0;
let todoTitleId = 0;
let removeTodoList = [];
let alreadyRemoved = [];
const todoTable = document.getElementById('todo-list');
const doneTable = document.getElementById('done-list');
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('input-title');
const content = document.getElementById('input-content');
const todoListContainer = document.getElementById('todo-list-container');
const doneListContanier = document.getElementById('done-list-container');
const closeModalBtn = document.getElementById('modal-close-btn');
const modal = document.getElementById('modal-box');
const submit = document.getElementById('submit');
let addTitle ='';
let addContent = '';
let isUpdated = [];
if(!todoData.content){
    todoListContainer.style.display = 'none';
    doneListContanier.style.display = 'none';
    submit.style.display = 'none';
}

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
    else {
        todoId += 1;
        doneId += 2;
        todoTitleId -=1;
        const todoTrId = todoId;
        const doneTrId = doneId;
        const todoTitleTdId = todoTitleId;
        const tr = document.createElement('tr');
        tr.id = todoTrId;
        const titleTd = document.createElement('td');
        titleTd.id = todoTitleTdId;
        const checkTd = document.createElement('td');
        const buttonTd = document.createElement('td');
        const check = document.createElement('input');
        addTitle = title.value;
        addContent = content.value;  
        const aT = addTitle;
        const aC = addContent;
        check.type = 'checkbox';
        check.addEventListener("click", ()=> onClick(todoTrId, doneTrId, titleTd, aT, aC));
        todoData.push({ id: todoId, title: addTitle, content: addContent });
        todoListContainer.style.display = '';
        let span = todoListContainer.parentNode.childNodes[5];
        span.style.display = 'none';
        titleTd.innerText = title.value;
        tr.appendChild(checkTd);
        checkTd.appendChild(check);
        tr.appendChild(titleTd);
        titleTd.addEventListener("click", ()=> onRead(todoTrId, aT, aC));
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => onDelete(todoTrId));
        deleteBtn.innerText = '삭제';
        const updateBtn = document.createElement('button');
        updateBtn.addEventListener('click', () => openUpdateModal(todoTrId, todoTitleTdId, aT, aC));
        updateBtn.innerText = '수정';
        buttonTd.appendChild(deleteBtn);
        buttonTd.appendChild(updateBtn);
        tr.appendChild(buttonTd);
        todoTable.appendChild(tr);

        title.value = "";
        content.value = "";
    }
});

submit.addEventListener('click', ()=> onCheck());

const onClick = (todoId, doneId, title, addTitle, addContent)=>{
    console.log(addTitle, addContent)
    let _isChecked = doneData.find(done => done.id === doneId);
    let _isRemoveChecked = removeTodoList.find(item => item === todoId);
    if(!_isChecked){
        title.style.textDecoration = "line-through";
        doneData.push({ id: doneId, title: addTitle, content: addContent });
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
    modal.style.height ="";
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

const openUpdateModal = (trId, titleId, title, content) => {
    modal.style.height = "100px";
    document.querySelector('.modal').classList.remove('hidden');
    const inputContainer = document.createElement('div');
    inputContainer.id = 'input-container'
    inputContainer.style.display = 'flex';
    inputContainer.style.flexDirection = 'column';
    const inputTitle = document.createElement('input');
    const inputContent = document.createElement('input');
    const submit = document.createElement('button');
    submit.innerText="저장"
    inputTitle.value = title;
    inputContent.value = content;
    inputTitle.style.marginBottom="7px";
    inputContent.style.marginBottom="20px";
    inputContainer.appendChild(inputTitle);
    inputContainer.appendChild(inputContent);
    inputContainer.appendChild(submit);
    modal.appendChild(inputContainer);
    closeModalBtn.addEventListener('click', ()=> closeUpdateModal( inputContainer));
    submit.addEventListener('click', ()=> onUpdate(trId, titleId, inputTitle.value, inputContent.value, inputContainer));
};

const onUpdate = (id,titleId, title, value, inputContainer)=>{
    let updateIndex = todoData.findIndex(item => item.id === id);    
    const updateItem = {id : id, title : title, value : value};
    todoData.splice(updateIndex,1, updateItem );    
    const updateHTML = document.getElementById(id);
    const titleHTML = document.getElementById(titleId);
    const titleTd = document.createElement('td');
    titleTd.innerText = title;  
    titleTd.id = titleId;
    titleTd.addEventListener("click", ()=> onRead(id, title, value))
    updateHTML.removeChild(titleHTML);
    updateHTML.insertBefore(titleTd, updateHTML.childNodes[1]);
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
             const titleTd = document.createElement('td');
             tr.id = item.id;             
             titleTd.innerText = item.title;
             tr.appendChild(titleTd);
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
