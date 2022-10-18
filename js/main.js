// timer
;(function () {
    let timerElem = document.querySelector('.timer');
    if (!timerElem) return;

    let timerDate = timerElem.getAttribute('data-time') || new Date;
    let countDownDate = new Date(timerDate).getTime();

    const daySpan = document.querySelector('.day .number');
    const hoursSpan = document.querySelector('.hours .number');
    const minutesSpan = document.querySelector('.minutes .number');
    const secondsSpan = document.querySelector('.seconds .number');

    const setTimer = () => {
        let now = new Date().getTime();

        if(now > countDownDate) {
            // daySpan.textContent = '00';
            // hoursSpan.textContent = '00';
            // minutesSpan.textContent = '00';
            // secondsSpan.textContent = '00';
            document.querySelector('.timer').style.opacity = 0;
            return;
        }
        let timeleft = countDownDate - now;

        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        daySpan.textContent = `0${days}`.slice(-2);
        hoursSpan.textContent = `0${hours}`.slice(-2);
        minutesSpan.textContent = `0${minutes}`.slice(-2);
        secondsSpan.textContent = `0${seconds}`.slice(-2);
    }

    let timer = setInterval(function() {
        setTimer();

    }, 1000)

    setTimer();
})();


new Accordion('.accordion-container');

document.querySelector('.copy-link a').addEventListener('click', function(e){
    e.preventDefault();
    this.closest('.copy-link').classList.add('visible');
    setTimeout(() => {
        this.closest('.copy-link').classList.remove('visible');
    }, 2000)

    let copyText = document.querySelector(".copy-input");

    copyText.select();

    navigator.clipboard.writeText(copyText.value);
});

// video
;(function () {
    document.querySelectorAll('.video').forEach(node => {
        node.addEventListener('click', function(){
            const iframe = node.querySelector('iframe')
            iframe.setAttribute('src', iframe.dataset.src);
            node.querySelector('.play-btn').style.display = 'none';
            node.querySelector('.preview').style.display = 'none';
            iframe.style.display = 'block';
        });
    })
})();


document.addEventListener('DOMContentLoaded', function(){

    if(window.parent){
        const links = document.querySelectorAll('[data-link]');
        links.forEach(link => {
            link.addEventListener('click', function(e){
                e.preventDefault();
                const url = e.target.dataset.link;
                window.parent.postMessage({
                    solar: true,
                    type: 'link',
                    value: url,
                }, '*')
            })
        })

        // document.querySelector('.country-choice').addEventListener('click', function(e){
        //     e.preventDefault();
        //     window.parent.postMessage({ 
        //         solar: true, 
        //         type: 'country_modal', 
        //         value: 'open', 
        //     })
        // })
    }


    const examplesSlider = new Swiper('.examples-slider', {
        slidesPerView: 2,
        slidesPerGroup: 2,
        speed: 400,
        spaceBetween: 35,
        wrapperClass: 'examples__slider-wrapper',
        slideClass: 'examples__slide',
        navigation: {
            nextEl: '.next-slide',
            prevEl: '.prev-slide',
        },
        pagination: {
            el: '.slider-pagination',
            type: 'bullets',
            clickable: true

        },

        breakpoints:{
            0:{
                slidesPerView: 1,
                slidesPerGroup: 1
            },
            768:{
                slidesPerView: 2,
                slidesPerGroup: 2
            }
        }
      });


      document.querySelectorAll('[data-popup]').forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            let popupID = this.getAttribute('data-popup');
            document.querySelector(`[data-popup-id="${popupID}"]`).classList.add('opened');
          })
      })

      document.querySelectorAll('.example-close').forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            item.closest('.example-popup-wrapper').classList.remove('opened');
        })
      })
      document.querySelectorAll('.example-popup-overlay').forEach(item => {
        item.addEventListener('click', function(e){
            e.preventDefault();
            item.closest('.example-popup-wrapper').classList.remove('opened');
        })
      })
      
  

   
})



