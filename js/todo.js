let todoData = [{
}
]

let doneData = [{

}]

let viewData = [{

}]

let id = 0;
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

if(!todoData.content){
    todoListContainer.style.display = 'none';
    doneListContanier.style.display = 'none';
    submit.style.display = 'none';
}

addBtn.addEventListener("click", () => {
    submit.style.display ='';
    //수정 버튼, 삭제 버튼 추가
    if(title.value ==""){
        alert('제목을 입력해주세요 !')
    }
    else if (content.value == ""){
        alert('할 일을 입력해주세요 !')
    }
    else {
        id += 1;
        const trId = id;
        const addTitle = title.value;
        const addContent = content.value;
        const tr = document.createElement('tr');
        tr.id = trId;
        const titleTd = document.createElement('td');
        const checkTd = document.createElement('td');
        const buttonTd = document.createElement('td');
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.addEventListener("click", ()=> onClick(trId, titleTd, addTitle, addContent));
        todoData.push({ id: id, title: addTitle, content: addContent });
        todoListContainer.style.display = '';
        let span = todoListContainer.parentNode.childNodes[5];
        span.style.display = 'none';
        titleTd.innerText = title.value;
        tr.appendChild(checkTd);
        checkTd.appendChild(check);
        tr.appendChild(titleTd);

        titleTd.addEventListener("click", ()=> onRead(trId, addTitle, addContent));
        const deleteBtn = document.createElement('button');
        deleteBtn.addEventListener('click', () => onDelete(trId));
        deleteBtn.innerText = '삭제';
        const updateBtn = document.createElement('button');
        updateBtn.addEventListener('click', () => onUpdate(trId));
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

const onClick = (id, title, addTitle, addContent)=>{
    let _isChecked = doneData.find(done => done.id === id);
    if(!_isChecked){
        title.style.textDecoration = "line-through";
        doneData.push({ id: id, title: addTitle, content: addContent });
    }
    else {
        title.style.textDecoration = "none";
        doneData = doneData.filter(done => done.id !== id);
    }
    
}

const onRead =(id, title, content)=>{
    
    document.querySelector('.modal').classList.remove('hidden');
    const modalTitle = document.createElement('h3');
    const modalContent = document.createElement('span');
    modalTitle.innerText = title;
    modalContent.innerText = content;
    modal.appendChild(modalTitle);
    modal.appendChild(modalContent);
    closeModalBtn.addEventListener('click', ()=> closeModal(modalTitle, modalContent));
}

const closeModal =(title, content)=>{
    document.querySelector('.modal').classList.add('hidden');
    modal.removeChild(title);
    modal.removeChild(content);
}

const onUpdate = trId => {console.log(trId)};
const onDelete = trId => {console.log(trId)};

const onCheck = () => {
    let _index = [];
    doneListContanier.style.display = '';
    doneTable.innerHTML = '';
    doneData.forEach((item, index)=> {
         if( index > 0){
             const tr = document.createElement('tr');
             tr.id = item.id;
             const titleTd = document.createElement('td');
             titleTd.innerText = item.title;
             tr.appendChild(titleTd);
             doneTable.appendChild(tr);
         }
     })

    todoData= todoData.filter((todo) =>{
       let _remove = doneData.find(done => done.id === todo.id);
       return _remove === undefined;
    });

    doneData.forEach((done, index)=> {
        console.log('데이터 >>> ', done);
        console.log('노드 >>> ', todoTable);
        let _remove = todoData.find((item)=> {
            item.id == done.id;
        });
        let _id = 0;
        console.log(_remove);
        if(index > 0 && !_remove){
            _id = document.getElementById(done.id);
            todoTable.removeChild(_id);            
        }        
    })    
    
}
