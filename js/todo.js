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

addBtn.addEventListener("click", (e) => {   
    console.log(e.target);
    const h = document.createElement('h');
    h.innerText = 'asdf';
    e.target.appendChild(h);
    //수정 버튼, 삭제 버튼 추가
    const tr = document.createElement('tr');
    const titleTd = document.createElement('td');
    const contentTd = document.createElement('td');
    todoData.push({id : id+1, title : title.value, content:content.value})
    listContainer.style.display = '';
    let span = listContainer.parentNode.childNodes[5];
    span.style.display = 'none';
    titleTd.innerText = title.value;
    contentTd.innerText = content.value;
    tr.appendChild(titleTd);
    tr.appendChild(contentTd);
    tableBody.appendChild(tr);
});

const onChange = () => { };
const onDelete = () => { };

