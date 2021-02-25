import { addClass, removeClass } from "./utils-class";

let data = {
  "complete-name" : "",
  "email-address" : "",
  address : "",
  "phone-number" : "",
  courier : "",
  payment : "",

};
//variabel inputs menyimpan hasil pencarian input yang memiliki [data-input] pada #shipping-details
const inputs = document.querySelectorAll("#shipping-detail input[data-input]");  //ini utk fungsi yang form input
for (let index = 0; index < inputs.length; index++) {
  const inputinit = inputs[index];
  inputinit.addEventListener("change", function (event) { //ketika dichange maka akan melakukan function apa ?
    //console.dir(event.target);
    data[event.target.id] = event.target.value;
      
    check()

  }); 
}

const options = document.querySelectorAll("#shipping-detail button[data-name]"); //ini untuk fungsi yang payment
for (let index = 0; index < options.length; index++) {
  const optioninit = options[index];
  optioninit.addEventListener("click", function () {
    const value = this.attributes['data-value'].value;
    const name = this.attributes['data-name'].value;

    data[name] = value ; //pada data name jadi payment lalu value bisa jadi american express atau dhl

    check();
  })

  
}

function check() { //mengecek jika value pada "data" kosong maka buttonnya di-disable
  //const find = Object.keys(data); kalu ini untuk keys pada "data" di atas
  console.log(data);
  const find = Object.values(data).filter( (item) => item === "");
  if (find.length === 0) {
    console.log(document.querySelector("#shipping-detail button[type='submit']"));
    document.querySelector("#shipping-detail button[type='submit']").disabled = false;
    
  }
}