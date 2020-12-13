const data = [{
}
]
let id = 0;
const tablebody = document.getElementById('todo-list')
const addbtn = document.getElementById('add-btn');
const title = document.getElementById('input-title');
const content = document.getElementById('input-content');
const listcontainer = document.getElementById('todo-list-container')

const tr = document.createElement('tr');
const titletd = document.createElement('td');
const contenttd = document.createElement('td');

if(!data.content){
    console.log(data)
    listcontainer.style.display = 'none';
}

addbtn.addEventListener("click",()=>{   
    data.push({id : id+1, title : title.value, content:content.value})
    listcontainer.style.display = '';
    let span = listcontainer.parentNode.childNodes[5];
    span.style.display = 'none';

    tablebody.appendChild(tr);
    titletd.innerText = title.value;
    contenttd.innerText = content.value;
    tablebody.childNodes[3].appendChild(titletd);
    tablebody.childNodes[3].appendChild(contenttd);
    
    console.log(tablebody);
});




