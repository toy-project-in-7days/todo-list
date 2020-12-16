const todoData = [{
}
]

let doneData = [{

}]

let id = 0;
const tableBody = document.getElementById('todo-list')
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('input-title');
const content = document.getElementById('input-content');
const listContainer = document.getElementById('todo-list-container')
const closeModalBtn = document.getElementById('modal-close-btn');
const modal = document.getElementById('modal-box');
const submit = document.getElementById('submit');

if(!todoData.content){
    listContainer.style.display = 'none';
}

addBtn.addEventListener("click", () => {   
    //수정 버튼, 삭제 버튼 추가
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
    listContainer.style.display = '';    
    let span = listContainer.parentNode.childNodes[5];
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
    const readBtn = document.createElement('button');
    // readBtn.addEventListener('click', () => onRead(trId));
    // readBtn.innerText = '보기';
    buttonTd.appendChild(deleteBtn);
    buttonTd.appendChild(updateBtn);
    buttonTd.appendChild(readBtn);
    tr.appendChild(buttonTd);
    tableBody.appendChild(tr);
    
    title.value = "";
    content.value = "";
});

const onClick = (id, title, addTitle, addContent)=>{   

    let _isChecked = doneData.find(done => done.id === id);
    console.log(doneData, id);
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
    console.log(id);
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
