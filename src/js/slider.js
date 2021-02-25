import { addClass, removeClass } from "./utils-class";

  const sliders = document.getElementsByClassName("slider");

    for (let index = 0; index < sliders.length; index++) {
      const slider = sliders[index];

      const items = slider.querySelectorAll(".slider .item"); //const items menyimpan .slider dan .item atau tag gambar
      const preview = slider.querySelector("div > .preview"); //parent pertama pada div yang punya preview maka ke select

      for (let item = 0; item < items.length; item++) {
        const itemTrigger = items[item]; //const itemTrigger menyimpan items (tag .slider & .item(gambar))
        
        itemTrigger.addEventListener("click", function () {
          const dataImg = this.attributes?.['data-img']?.value //this = itemTrigger
          for (let eachItemTrigger = 0; eachItemTrigger < items.length; eachItemTrigger++) {
            const triggerNeedToRemoved = items[eachItemTrigger];
            
            removeClass(triggerNeedToRemoved, "selected"); //ngehapus black opacity (selected sebelumnya)
          } 
          
            addClass(itemTrigger, "selected"); //menampilkan black opacity (selected terbaru/selanjutnya)
            preview.querySelector("img").setAttribute("src",dataImg);
        })
      }
    }

    // itemTrigger : selected terbaru & triggerNeedToRemoved : ngehapus selected sebelumnya ketika selected baru
