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
    let informationTable = document.querySelector('#informationTable').value 
    informationTable.innertext = `${item}`
   }


   <table style="width:100%">
  <tr>
    <th>itemname</th>
    <th>Contact</th>
    <th>Country</th>
  </tr>
  <tr>
    <td>Alfreds Futterkiste</td>
    <td>Maria Anders</td>
    <td>Germany</td>
  </tr>
  <tr>
    <td>Centro comercial Moctezuma</td>
    <td>Francisco Chang</td>
    <td>Mexico</td>
  </tr>
</table>







})