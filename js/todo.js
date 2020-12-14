const todoData = [{
}
]
let id = 0;
const tableBody = document.getElementById('todo-list')
const addBtn = document.getElementById('add-btn');
const title = document.getElementById('input-title');
const content = document.getElementById('input-content');
const listContainer = document.getElementById('todo-list-container')


if(!todoData.content){
    listContainer.style.display = 'none';
}

addBtn.addEventListener("click", () => {   
    //수정 버튼, 삭제 버튼 추가
    const trId = id;
    const tr = document.createElement('tr');
    const titleTd = document.createElement('td');
    const contentTd = document.createElement('td');
    todoData.push({ id: id + 1, title: title.value, content: content.value });
    listContainer.style.display = '';
    let span = listContainer.parentNode.childNodes[5];
    span.style.display = 'none';
    titleTd.innerText = title.value;
    contentTd.innerText = content.value;
    tr.appendChild(titleTd);
    tr.appendChild(contentTd);
    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', () => onDelete(trId));
    deleteBtn.innerText = '삭제';
    const updateBtn = document.createElement('button');
    updateBtn.addEventListener('click', () => onUpdate(trId));
    updateBtn.innerText = '수정';
    const readBtn = document.createElement('button');
    readBtn.addEventListener('click', () => onRead(trId));
    readBtn.innerText = '보기';
    tr.appendChild(deleteBtn);
    tr.appendChild(updateBtn);
    tr.appendChild(readBtn);
    tableBody.appendChild(tr);
    id += 1;
});

const onUpdate = trId => {console.log(trId)};
const onDelete = trId => {console.log(trId)};
const onRead = trId => {console.log(trId)};

