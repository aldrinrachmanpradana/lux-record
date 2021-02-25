// import { parse } from "postcss";
import { removeClass } from "./utils-class";

  const cart = ["1", "2", "3"];
  localStorage.setItem("cart", JSON.stringify(cart)); //localStorage namanya cart dan isinya cart (yg atas), kalau distringify maka nanti kudu di parse biar bisa dibaca Js

  const shoppingCart = document.getElementById("shopping-cart");

  if (shoppingCart) {
    const headerCart = document.getElementById("header-cart") //di cart.html
    const buttons = shoppingCart.querySelectorAll("button[data-delete-item]"); //button didapat dari shoppingCart -> tag button
    
    for (let index = 0; index < buttons.length; index++) {
      const buttoninit = buttons[index];
      //console.dir(buttoninit);
      const id = buttoninit.attributes["data-delete-item"].value; //2. kalau misalkan ambil data-delete-item="3" maka id = 3

      buttoninit.addEventListener("click", function() {
        shoppingCart.querySelector(`div[data-row='${id}']`).remove() //1. shoppingCart mencari div yang memiliki data-row berdasarkan id yang didapat dari klik button
        
        const CART = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart")); //membuat variabel bantuan dan mencari item cart
                                                                                               // lalu jika ada dilakukan parse agar stringify bisa dibaca Js
        const found = CART.indexOf(id);
        if (found > -1) {
          CART.splice(found, 1);
          localStorage.setItem("cart", JSON.stringify(CART)); //jadi kalau udh di splice maka di save lagi dalam localStorage (cart)
        }
        if (CART.length===0) { 
          removeClass(headerCart, "cart-filled"); //menghapus titik warna pink di loco cart
          removeClass(document.getElementById("cart-empty"), "hidden"); //function jika cart kosong 
        }

      })

    }
  }



// const cart = ["1", "2", "3"];
// localStorage.setItem("cart", JSON.stringify(cart));

// const shoppingCart = document.getElementById("shopping-cart");

// if (shoppingCart) {
//   const headerCart = document.getElementById("header-cart");
//   const buttons = shoppingCart.querySelectorAll("button[data-delete-item]");

//   for (let index = 0; index < buttons.length; index++) {
//     const button = buttons[index];
//     const id = button.attributes["data-delete-item"].value;

//     button.addEventListener("click", function () {
//       shoppingCart.querySelector(`div[data-row='${id}']`).remove();

//       const CART =
//         localStorage.getItem("cart") &&
//         JSON.parse(localStorage.getItem("cart"));

//       const found = CART.indexOf(id);
//       if (found > -1) {
//         CART.splice(found, 1);
//         localStorage.setItem("cart", JSON.stringify(CART));
//       }

//       if (CART.length === 0) {
//         removeClass(headerCart, "cart-filled");
//         removeClass(document.getElementById("cart-empty"), "hidden");
//       }
//     });
//   }
// }
