// timer
;(function () {
    let timerElems = document.querySelectorAll('.timer');

    timerElems.forEach(timer => {
        let timerDate = timer.getAttribute('data-time') || new Date;
        let countDownDate = new Date(timerDate).getTime();
        let daySpan = timer.querySelector('.day .number')
        let hoursSpan = timer.querySelector('.hours .number');
        let minutesSpan = timer.querySelector('.minutes .number');
        let secondsSpan = timer.querySelector('.seconds .number');

       setInterval(function() {
            setTimer(daySpan, hoursSpan, minutesSpan, secondsSpan, countDownDate);
        }, 1000)
    })
 


    const setTimer = (day, hr, mt, sd, countDown) => {
        let now = new Date().getTime();

        if(now > countDown) {
            // daySpan.textContent = '00';
            // hoursSpan.textContent = '00';
            // minutesSpan.textContent = '00';
            // secondsSpan.textContent = '00';
            document.querySelector('.timer').style.opacity = 0;
            return;
        }
        let timeleft = countDown - now;

        let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

        day.textContent = `0${days}`.slice(-2);
        hr.textContent = `0${hours}`.slice(-2);
        mt.textContent = `0${minutes}`.slice(-2);
        sd.textContent = `0${seconds}`.slice(-2);
    }

   

})();


// new Accordion('.accordion-container');

// document.querySelector('.copy-link a').addEventListener('click', function(e){
//     e.preventDefault();
//     this.closest('.copy-link').classList.add('visible');
//     setTimeout(() => {
//         this.closest('.copy-link').classList.remove('visible');
//     }, 2000)

//     let copyText = document.querySelector(".copy-input");

//     copyText.select();

//     navigator.clipboard.writeText(copyText.value);
// });

document.querySelectorAll('.copy-link a').forEach(item => {
    item.addEventListener('click', function(e){
        e.preventDefault();
        this.closest('.copy-link').classList.add('visible');
        setTimeout(() => {
            this.closest('.copy-link').classList.remove('visible');
        }, 2000)
    
        let copyText = document.querySelector(".copy-input");
    
        copyText.select();
    
        navigator.clipboard.writeText(copyText.value);
    });
})

// video
;(function () {
    document.querySelectorAll('.video').forEach(node => {
        node.addEventListener('click', function(e){
            e.preventDefault();
            const iframe = node.querySelector('iframe');
            let videoUrl = iframe.getAttribute('src');
            node.querySelector('.play-btn').style.display = 'none';
            node.querySelector('.preview').style.display = 'none';
            videoUrl += "&autoplay=1";
            iframe.setAttribute('src', videoUrl);
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
        spaceBetween: 65,
        wrapperClass: 'examples__slider-wrapper',
        slideClass: 'examples__slide',
        navigation: {
            nextEl: '.next-slide',
            prevEl: '.prev-slide',
        },

        autoplay: {
            delay:3000,
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
      
  
      let galleryMore = document.querySelector('.gallery .show-more');
      if(galleryMore){
        galleryMore.addEventListener('click', function(e){
            e.preventDefault();
            document.querySelector('.gallery__inner').classList.add('all');
            this.remove();
          })
      }
      

    

      document.querySelectorAll('.tooltip').forEach(item => {
        item.addEventListener("click", function(){
            this.classList.toggle('opened');
        })
      })

      // document.querySelectorAll('.faq .ac-header').forEach(item => {
      //   item.addEventListener("click", function(){
      //       $( ".faq .ac" ).each(function() {
      //         if($(this).hasClass('expanded')){
      //           $(this).removeClass('expanded');
      //           $(this).find('.ac-header').removeClass('opened');
      //           $(this).find('.ac-panel').slideToggle( "fast" );
      //         }
      //       });
      //       $(this).toggleClass('opened');
      //       $(this).parent('.ac').toggleClass('expanded');
      //       $(this).next().slideToggle( "fast" );
      //   })
      // })

      const items = document.querySelectorAll(".faq .ac-header");

        function toggleAccordion() {
          const itemToggle = this.getAttribute('aria-expanded');
          
          for (i = 0; i < items.length; i++) {
            items[i].setAttribute('aria-expanded', 'false');
          }
          
          if (itemToggle == 'false') {
            this.setAttribute('aria-expanded', 'true');
          }
        }
        items.forEach(item => item.addEventListener('click', toggleAccordion));


        document.querySelectorAll('.expand-button').forEach(item => {
            item.addEventListener('click', function(e){
                e.preventDefault();
                if(item.classList.contains("hidden")){
                    item.classList.remove("hidden");
                    item.classList.add("open");
                    let text = item.lastElementChild;
                    text.innerText = "????????????????";
                     document.querySelectorAll('.video-block__content p').forEach(item => {
                        item.classList.add("expanded");
                      });
                     document.querySelectorAll('.video-block__content').forEach(item => {
                        item.classList.add("expanded");
                      });
                }else if(item.classList.contains("open")){
                    item.classList.remove("open");
                    item.classList.add("hidden");
                    let text = item.lastElementChild;
                    text.innerText = "????????????????????";
                     document.querySelectorAll('.video-block__content p').forEach(item => {
                        item.classList.remove("expanded");
                      });
                     document.querySelectorAll('.video-block__content').forEach(item => {
                        item.classList.remove("expanded");
                      });
                }
                
            });
        })


        


    var init = false;

    function swiperCard() {
      if (window.innerWidth <= 575) {
        if (!init) {
          init = true;
           investSlider = new Swiper('.invest-slider', {
            slidesPerView: 1,
            slidesPerGroup: 1,
            speed: 400,
            spaceBetween: 0,
            loop: true,
            allowTouchMove: true,
            wrapperClass: 'why-now-row',
            slideClass: 'why-now-item',

            // pagination: {
            //     el: '.slider-pagination',
            //     type: 'bullets',
            //     clickable: true
            // },
            breakpoints:{
                0:{
                    slidesPerView: 1,
                    slidesPerGroup: 1
                },
            },
          });
          investThumbs = new Swiper('.invest-thumbs', {
          wrapperClass: 'invest-thumbs-wrapper',
          slideClass: 'invest-thumb-slide',
          centeredSlides: true,
          slidesPerView: 3,
          slideToClickedSlide: true,
          loop: true,
          loopedSlides: 1,
          breakpoints:{
                0:{
                    slidesPerView: 2.2,
                },
                375:{
                    slidesPerView: 3,
                },
            },
        });
        investThumbs.controller.control = investSlider;
        investSlider.controller.control = investThumbs;
        }
      } else if (init) {
        investSlider.destroy();
        investThumbs.destroy();
        init = false;
      }
    }
    swiperCard();
    window.addEventListener("resize", swiperCard);
})



