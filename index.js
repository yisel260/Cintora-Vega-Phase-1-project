document.addEventListener('DOMContentLoaded', function (){

    function resetResults (){
      itemContainer.innerText =""
      informationDisplay.innerText =""
    }


    const searchName = document.getElementById("search-by-name")
    searchName.addEventListener('submit', function (event){
      event.preventDefault()
      resetResults()
      let name = document.querySelector('#name').value.toLowerCase()
      handleSearchByName (name)
    })

    const searchRoom = document.getElementById("search-by-room")
    searchRoom.addEventListener('submit', function (event){
      event.preventDefault()
      resetResults()
      let room = document.querySelector('#room').value.toLowerCase()
      handleSearchByRoom (room)
    })

    const searchCategory = document.getElementById("search-by-category")
    searchCategory.addEventListener('submit', function (event){
      event.preventDefault()
      resetResults()
      let category = document.querySelector('#category').value.toLowerCase()
      handleSearchByCategory (category)
    })

    const notFound = document.querySelector("#notFoundAnswer")
    let informationDisplay = document.querySelector('#information-display')

    function handleSearchByName(name){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
       .then(itemsInfo => { 
        for (const item of itemsInfo) {
             if(item.name === name ){
            renderObjects(item)
             }
        } 
          })
    
    }

    function handleSearchByRoom(room){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
       .then(itemsInfo => { 
        for (const item of itemsInfo) {
             if(item.room === room ){
            renderObjects(item)
             }
        } 
          })
    }

    function handleSearchByCategory(category){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
       .then(itemsInfo => { 
        for (const item of itemsInfo) {
             if(item.category === category ){
            renderObjects(item)
             }
        } 
   
    }) 
}


   let itemContainer = document.querySelector('#results');
   
   function renderObjects(item){
    let p = document.createElement('p')
    p.innerText = item.name
    itemContainer.appendChild(p)

    p.addEventListener('click', function (event) {
        const pClicked = event.target;
        displayinformation(item)
    })
   
   function displayinformation(item){
    informationDisplay.innerHTML = `
        <table style="width:50%">
         <tr>
           <td>Name</td>
           <td>${item.name}</td>
         </tr>
         <tr>
          <td> Room</td>
          <td>${item.room}</td>
         </tr>
         <tr>
          <td> Location </td>
          <td>${item.location}</td>
         </tr>
         <tr>
         <td> Category</td>
         <td>${item.category}</td>
         </tr>
        </table>
    
    `
   }


   //Add new item to data list 

const addItemButton = document.getElementById("store-item")
addItemButton.addEventListener('submit', function(event){
  event.preventDefault()
  handleSubmit()
})


function handleSubmit() {
 
    const itemName = document.querySelector('#item-name').value;
    const itemRoom = document.querySelector('#item-room').value;
    const itemLocation = document.querySelector('#item-location').value;
    const itemCategory= document.querySelector('#item-category').value;
    const newItem = {
      name : itemName,
      room: itemRoom,
      location: itemLocation,
      category: itemCategory,
    };
  
   fetch('http://localhost:3000/items', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
       },
     body: JSON.stringify(newItem)
      })
        .then (renderObjects(newItem))
      
        .catch(error => {
         console.error('Error:', error);
        });
      }
     }
    })
