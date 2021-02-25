import { addClass, removeClass } from "./utils-class";

const carouselId = document?.getElementById("carousel"); //271 carousel
const carouselItems = carouselId?.getElementsByClassName("flex")[0]; //273 flex
const carouselContainer = carouselId?.getElementsByClassName("container")[0]; //container 272

 function carouselCalculateOffset() {
   const carouselOffset = carouselContainer.getBoundingClientRect().left;

   carouselItems.style.paddingLeft = `${carouselOffset - 16}px`; //css in JS, pengurangan utk menjadikannya pixel dengan 16 = 1 rem
   carouselItems.style.paddingRight = `${carouselOffset - 16}px`;
 }

 function slide(wrapper, items) {
      
      let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      itemToShow = 4,
      slides = items.getElementsByClassName("card"),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName("card")[0].offsetWidth,
      index = 0,
      allowShift = true;


      wrapper.classList.add("loaded"); //nambahin kelas namanya loaded utk ngasih tau jika carousel berhasil ke loaded

      items.onmousedown = dragStart;
      items.addEventListener("touchstart", dragStart);
      items.addEventListener("touchend", dragEnd);
      items.addEventListener("touchmove", dragAction);

      items.addEventListener("transitionend", checkIndex);


      function dragStart(e){
        e = e || window.event;
        e.preventDefault(); //mematikan behavior bawaannya event
        posInitial = items.offsetLeft; //ngisi posInitial dapatin dari items
        
        if (e.type == "touchstart") {
          console.log(e.touches);
          posX1 = e.touches[0].clientX; //rubah posX1 dari event.touches elemen ke 0 jadi "clientX"
        }
        else{
          posX1 = e.clientX;
          document.onmouseup = dragEnd; //ketika mouse diangkat dia ngejalanin function dragEnd
          document.onmousemove = dragAction;
        }
      }

      function dragAction(e){
        e = e || window.event;

        if (e.type == "touchmove") {
          posX2 = posX1 - e.touches[0].clientX; // pos x2 dapat dari pengurangan 2 itu dan cari si clientX-nya (mouse kita)
          posX1 = e.touches[0].clientX; //lalu posX1 didapetin ketika
        }
        else{ //bukan type yg touchmove
          posX2 = posX1 - e.clientX; //posx2 didapetin dari pengurangan itu
          posX1 = e.clientX; //lalu posx1 adalah event.clientX
        }

        items.style.left =`${items.offsetLeft - posX2}px`;
      }

    function dragEnd(){
      posFinal = items.offsetLeft; //posFinal di dapatkan dari items offsetLeft

      if(posFinal - posInitial < -threshold){ //-threshold = minus 100, posInitial dideklarasikan pas di dragStart
        shiftSlide(1,"drag"); //1 itu ke kanan lalu dikasih event namanya drag
      }
      else if (posFinal - posInitial > threshold) {
        shiftSlide(-1,"drag"); //-1 itu ke kiri
      }
      else{
        items.style.left = posInitial + "px";
      }

      document.onmouseup = null; //ngasih tau dokumen bahwa mouse sudah diangkat
      document.onmousemove = null;
    }

    function shiftSlide (direction, action){ //(-1/1, "drag")
      addClass(items,"transition-all duration-200");

      if (allowShift) {
        if (!action) posInitial = items.offsetLeft;     
        
        if (direction == 1) {
          items.style.left =`${posInitial - slideSize}px`;
          index++;
        }
        else if(direction == -1){
          items.style.left = `${posInitial + slideSize}px`;
          index--;
        }
      }
      allowShift = false; //ngeprevent jika drag kecepetan
    }
    

    function checkIndex(){ //function yang memastikan posisi index sekarang udh bener apa ngga
      setTimeout(() => {
        removeClass(items, "transition-all duration-200"); //kita tahan 200 detik maksudnya lalu di remuvo class-class di baris ini
      }, 200); //200 dari function shiftSlide , 200 penahan

      if (index == -1) {  //pengaturan agar tidak bisa digeser lagi ke kanan /kiri jika sudah habis
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1; //ketika baris diatas sudah dijalankan, indexnya dipakasa menjadi total slide yg ada (slideLength) dikurang 1
      }

      if (index == slidesLength - itemToShow){
        items.style.left = -((slidesLength - itemToShow - 1) * slideSize) + "px";
        index = slidesLength - itemToShow - 1;
      }

      if (index == slidesLength || index == slidesLength - 1) { //kondisi untuk mengembalikan ke keadaan default
        items.style.left = '0px';
        index = 0;
      }

      allowShift = true;
    }
  }

   if (carouselId) {
      slide(carouselId, carouselItems);
      window.addEventListener("load", carouselCalculateOffset);
      window.addEventListener("resize", carouselCalculateOffset);
    }
