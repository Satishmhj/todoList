//consume api and set the datas

getData = () => {
  return fetch("https://infodev-server.herokuapp.com/api/todos")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

function setData(data) {
  const ul = document.querySelector("#lecture-list ul");
  let arr = [];
  data.forEach((todo) => {
    const li = document.createElement("li");
    li.id = todo._id;
    let priority;

    switch (todo.priority) {
      case 0:
        priority = "low";
        break;
      case 1:
        priority = "medium";
        break;
      case 2:
        priority = "high";
        break;
      default:
    }

    li.innerHTML = `<div>
          <h6 class="title ${todo.completed ? "completed" : ""}">${
      todo.name
    }<span class="ml-2 ">${priority}</span></h6>
          <p class="description">${todo.description}</p>
                    </div>
                    <div>
                    ${
                      !todo.completed
                        ? '<button class="btn btn-success"><i class="fas fa-check"></i></i></button>  <button class="btn btn-warning"><i class="fas fa-pencil"></i></i></button>'
                        : ""
                    }
                    <button  id = "delete" class="btn btn-danger"><i class="far fa-trash-alt"></i></button>
                    </div>
                    `;

    arr.push(li);
  });

  ul.replaceChildren(...arr);
}

document.addEventListener("DOMContentLoaded", async () => {
  let data = await getData();
  console.log(data);

  setData(data);

  document.getElementById("lecture-add").onsubmit = async (e) => {
    e.preventDefault();
    let name = e.target.elements.name.value;
    let priority = e.target.elements.priority.value;
    let description = e.target.elements.description.value;

    // console.log(name, priority, description)

    if(name === null || priority === null || description === null){
        alert("fill all data")
    }else{
        let response =  await addTodo({name, priority, description})
        // console.log(response)
        data.push(response)
        setData(data)
    }

    
  }

  const todoItem = document.querySelector("#lecture-list ul");
    todoItem.addEventListener("click", (e) => {
      console.log(e.target.classList.value )

      if(e.target.classList.value === "btn btn-danger" || e.target.classList.value === "far fa-trash-alt" ){
          let todoId = e.target.parentElement.parentElement.id;
        
        //   console.log(todoId)
          let response =  deleteTodo(todoId)
          let index = data.findIndex(item => {
              return item._id == response.id

          } )
          data.splice(index, 1)
          setData(data)
      }
  });



   addTodo = async (fromData) => {
       
     return  await fetch('https://infodev-server.herokuapp.com/api/todos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fromData)
      }).then((response) => response.json())
      .then((data) => {
        return data;
      });

  }

  deleteTodo = async (id) => {
      return await fetch(`https://infodev-server.herokuapp.com/api/todos/${id}`,{
          method: 'DELETE'

      }).then((response) => response.json())
      .then((data) => {
        return data;
      });
  }

  

});
