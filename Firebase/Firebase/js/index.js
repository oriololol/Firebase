import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cestadenerea-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);


const database = getDatabase(app);
const shoopingListInDB = ref(database, "shoppinglist");

const inputFieldEl = document.getElementById("input");
const addButtonEl = document.getElementById("boto");
const shoppingListElement = document.getElementById("shopping-list")

onValue(shoopingListInDB, function(snapshot){
    if(snapshot.exists()){
    clearLisEl();
    let listArray = Object.entries(snapshot.val())
  
    for(let i=0; i<listArray.length; i++){
        appendItemToShoppingListEl(listArray[i])
    }}else{
        shoppingListElement.innerHTML ="No hi ha res..."
    }
})                                   
        
function clearLisEl(){
    shoppingListElement.innerHTML=" "
}

addButtonEl.addEventListener("click", function(){
    let inputValue = inputFieldEl.value;
    push(shoopingListInDB, inputValue)
    clearInputfield()
    
    console.log(`${inputValue} added to Database`)
    console.log(inputValue);
})

function clearInputfield(){
    inputFieldEl.value = ""
}
function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let htmlEL = document.createElement("li")
    htmlEL.textContent = itemValue
    htmlEL.addEventListener('dblclick', function(){
        
            let exactLocationOfItemDB = ref(database, `shoppinglist/${itemID}`);
            remove(exactLocationOfItemDB);
       
        
        
    })    
    shoppingListElement.append(htmlEL) 

}