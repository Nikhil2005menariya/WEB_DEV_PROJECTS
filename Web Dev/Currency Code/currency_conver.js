const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@{date}/{apiVersion}/{endpoint}";
let dropdowns=document.querySelectorAll("select");
let btn=document.querySelector(".convert");
let from=document.querySelector(".from select");
let to=document.querySelector(".to select");
let msg=document.querySelector(".rate p");
let svg=document.querySelector(".svg");
let date= new Date().toISOString().split('T')[0]
for(let select of dropdowns){
    for(let option in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = option;
        newOption.value = option;
        if (select.name === "from" && option === "USD") {
          newOption.selected = "selected";
        } else if (select.name === "to" && option === "INR") {
          newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
      });
}
function updateFlag(evt){
    let url="https://flagsapi.com/US/flat/64.png"
    let code=evt.value;
    let country=countryList[code];
    let img=evt.parentElement.querySelector("img");
    img.src=`https://flagsapi.com/${country}/flat/64.png`;
}
 async function conversion(){
    let amount=document.querySelector("#amount").value;
    let am=amount;
    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${from.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate=data[from.value.toLowerCase()];
    let final=rate[to.value.toLowerCase()]*am;
    msg.innerText = `${am} ${from.value} = ${final} ${to.value}`;   
}
btn.addEventListener("click",conversion);
window.addEventListener("load", () => {
    conversion();
});
window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        conversion();  
    }
});
svg.addEventListener("click",()=>{
    let temp=from.value;
    from.value=to.value;
    to.value=temp;
    updateFlag(from);
    updateFlag(to);
    conversion();  
})

