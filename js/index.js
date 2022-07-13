let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("save-btn");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage;
    renderLeads();
}

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    renderLeads();
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
})

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    renderLeads();
})

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        renderLeads();
    })
})

function renderLeads(){
    let listItem = "";
    for(let i = 0; i < myLeads.length; i++){
        listItem += `
            <li>
                <a target='_blank' href='https://${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    console.log(listItem);
    ulEl.innerHTML = listItem;
    inputEl.value = "";
}


