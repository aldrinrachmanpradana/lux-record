import { addClass, removeClass } from "./utils-class";

function accordion(){
  const accordionContainer = document.getElementsByClassName("accordion");

  //Perulangan pada setiap accordion
  for (let index = 0; index < accordionContainer.length; index++) {
    const e = accordionContainer[index]; //index ini jalan terus dari nol sampai ketemu lenght-nya
    
    //START JS Button
    const button = document.createElement("button");
    addClass(button, "absolute block md:hidden right-0 transform -translate-y-1/2 focus:outline-none transition duration-200 rotate-0");
    
    button.style.top = "50%";
    button.innerHTML = `<svg width="20" height="9" viewBox="0 0 20 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L9.75 7.5L18.5 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`; //SVG icon v (panah) pada button
    //END JS button

    //penambahan khusus pada tag <ul>
    const ulList = e.getElementsByTagName("ul")[0];
    addClass(ulList,"transition duration-200");

    function onClickAccordion() { //fungsi button atau kasih event pada button dengan function namanya onClickAccordion
      if (ulList.className.indexOf("h-0") > -1) { //jika ada h-0 pada class name dari ulList maka akan dilakukan
        addClass(button, "rotate-180"); //penambahan rotate-180 pada button
        addClass(ulList, "opacity-100");
        removeClass(ulList, "h-0 invisible opacity-0"); //penghapusan pada ulList
      }
      else{
        removeClass(button, "rotate-180"); //penghapusan rotate-180 pada button
        removeClass(ulList, "opacity-100");
        addClass(ulList, "h-0 invisible opacity-0"); //penambahan pada ulList

      }
    }

    button.addEventListener("click", onClickAccordion); //jika button di klik maka akan menjalankan fungsi onClickAccordion
  
    e.getElementsByTagName("h5")[0].append(button); //mencari h5 pada accordion lalu pada index h5 dari yg ke 0 disisipin button (peyisipan button pada h5)
  }
}

if (window.innerWidth < 768) window.addEventListener("load", accordion);
//768 ukuran layar small
//pada window ditambahin event listener yang ketika di load maka akan jalanin accordion
//fungsi pemanggilan accordion ini kurang dinamis karena hanya utk di layar < 768