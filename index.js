document.addEventListener('DOMContentLoaded', function (){

    const searchName = document.getElementById("search-by-name")

    console.log(searchName)

    searchName.addEventListener('submit', function (event){
      event.preventDefault()
      let name = document.querySelector('#name').value
      handleSearchByName (name)
    })

    function handleSearchByName(name){
        fetch('http://localhost:3000/items')
        .then(res => res.json())
       .then(itemsInfo => { 
        for (const item of itemsInfo) {
             if(item.name === name ){
            console.log(item);
            renderObjects(item)
             }
        } 
          })
    }

   let itemContainer = document.querySelector('#results');
   function renderObjects(item){
    console.log("renderObjects called");
    let p = document.createElement('p')
    p.innerText = item.name
    itemContainer.appendChild(p)

    p.addEventListener('click', function (event) {
        const pClicked = event.target;
        displayinformation(item)
    })
   }

   function displayinformation(item){
    let informationDisplay = document.querySelector('#information-display')
    //let information = document.createElement('table')
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


})