function userDropdown() {
    document.querySelector(".header__submenu").classList.toggle("header__submenu_expanded");
    document.querySelector(".header__account").classList.toggle("header__account_expanded");
    
};


const rangeInput = document.querySelectorAll(".filter__price-range input"),
priceInput = document.querySelectorAll(".filter__price-inputs input");
progress = document.querySelector(".filter__price-progress");
let priceGap = 50;

rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal= parseInt(rangeInput[1].value);   
        if (maxVal - minVal < priceGap) {
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            } else{
                rangeInput[1].value = minVal + priceGap;
            };
        } else {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }

    });
});


priceInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(priceInput[0].value),
        maxVal= parseInt(priceInput[1].value);   
        if ((maxVal - minVal >= priceGap) && (maxVal<=500)) {
            if(e.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            } else{
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            };
        }

    });
});


$(".address__item").click(function() {
    $(".address__item").removeClass("address__item-active").eq($(this).index()).addClass("address__item-active");
}).eq(0).addClass("address__item-active");

const categoriesData = {
    category1: [{
        lat: 65.3245338126839,
        lon: 53.403638957641576,
        name: 'п.Щельяюр'
    }],
    category2: [{
        lat: 65.30119724502546,
        lon: 53.204326,
        name: 'д.Вертеп'
    }],
    category3: [{
        lat: 65.29474827436935,
        lon: 53.27947449999999,
        name: 'с.Краснобор'
    }],
    category4: [{
        lat: 65.27684390445064,
        lon: 53.357524999999995,
        name: 'д.Диюр'
    }],

}



const init = () => {
    const map = new ymaps.Map('map', {
      center: [55.753215, 37.622504],
      zoom: 14,
    });
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    let activeCategory = "category1";
  
    const showCategory = (category) => {
      map.geoObjects.removeAll();
  
      categoriesData[category].forEach((item) => {
        const placemark = new ymaps.Placemark([item.lat, item.lon], {
          hintContent: item.name,
          balloonContent: item.name,
        });
        map.setCenter([item.lat, item.lon]);
        map.geoObjects.add(placemark);
      });
  
      activeCategory = category;
    }
  
    const categoryButtons = document.querySelectorAll('.address__item');
    categoryButtons.forEach((button) => {
        // button.removeClass( "address__item-active");
        button.addEventListener('click', (e) => {
            const category = e.currentTarget.dataset.category;
            showCategory(category);        
            button.addClass( "address__item-active");
        });
    });
  
    showCategory(activeCategory);
  };
  
  ymaps.ready(init);
