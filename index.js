document.addEventListener('DOMContentLoaded', function (){

    function resetResults(){
      itemContainer.innerText =""
      informationDisplay.innerText =""
      endResultscontainer.innerText = ""
    
    }

    const searchName = document.getElementById("search-by-name")
    searchName.addEventListener('submit', function (event){
      event.preventDefault()
      resetResults();
      let name = document.querySelector('#name').value.toLowerCase().trim()
      handleSearchByName (name)
    })

    const searchRoom = document.getElementById("search-by-room")
    searchRoom.addEventListener('submit', function (event){
      event.preventDefault()
      resetResults()
      let room = document.querySelector('#room').value.toLowerCase().trim()
      handleSearchByRoom (room)
    })

    const searchCategory = document.getElementById("search-by-category")
    searchCategory.addEventListener('submit', function (event){
      event.preventDefault()
      resetResults()
      let category = document.querySelector('#category').value.toLowerCase().trim()
      handleSearchByCategory (category)
    })


    function handleSearchByName(name){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
       .then(itemsInfo => { 
        itemsInfo.forEach(item => {
          if(item.name === name ){
            renderObjects(item)
          }

          
        });
        endResults()
          })
    }

    function handleSearchByRoom(room){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
        .then(itemsInfo => { 
        itemsInfo.forEach(item=>{
          if(item.room === room){
            renderObjects(item)
        } 
          })
          endResults()
    })
  }

    function handleSearchByCategory(category){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
       .then(itemsInfo => { 
        itemsInfo.forEach(item=>{
          if(item.category == category){
            renderObjects(item)
          }
        })
        endResults()
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
   }


   let informationDisplay = document.querySelector('#information-display')
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

    let endResultscontainer = document.querySelector("#endResults")
    
    function endResults(){
    let h4 = document.createElement("h4")
    h4.innerText = "End of results. If your item is not listed try a different search."
    endResultscontainer.appendChild(h4)
    
   }

//    //Add new item to data list 

const addItemButton = document.getElementById("store-item")
 addItemButton.addEventListener('submit', function(event){
 event.preventDefault()
 //console.log("button was pushed")
  resetResults()
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

      endResults()
    }

})


