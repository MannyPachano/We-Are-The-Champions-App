// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appsettings = { 
    databaseURL: "https://realtime-database-496a2-default-rtdb.asia-southeast1.firebasedatabase.app/" 
    }
    
const app = initializeApp(appsettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "endorsements")

const inputEl = document.getElementById("input-el")
const btnEl = document.getElementById("btn-el")
const endorsementsList = document.getElementById("endorsements-list")

btnEl.addEventListener("click", function () {
    let inputValue = inputEl.value
    
    push(endorsementsInDB, inputValue)    
    console.log(`${inputValue} added to DB`)
    
    clearInputEl()
})

onValue(endorsementsInDB, function(snapshot) {
    if(snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        
        clearEndorsementsList()
        
        for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i]
        let currentItemID = itemsArray[0]
        let currentItemValue = itemsArray[1]
        
        appendItemToEndorsementsList(currentItem)
        }
    } else {
    endorsementsList.innerHTML = "No endorsements here... yet"
    }
})

function clearInputEl() {
    inputEl.value = ""
}

function clearEndorsementsList() {
    endorsementsList.innerHTML = ""
}

function appendItemToEndorsementsList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
        
    newEl.textContent = itemValue
    
    endorsementsList.append(newEl)  
}