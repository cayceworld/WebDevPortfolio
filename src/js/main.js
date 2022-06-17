
/* swiper */
//eslint-disable-next-line
const swiper = new Swiper('.swiper', {
  // Optional parameters
  spaceBetween: 20,
  loop: true,

  // Navigation arrows
  //eslint-disable-next-line
  navigation: {
    nextEl: '.right-arrow',
    prevEl: '.left-arrow',
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    // when window width is >= 640px
    768: {
      //eslint-disable-next-line
      slidesPerView: 2,
    }
  }
});
/* send form */


//document.getElementById

document.addEventListener('DOMContentLoaded', function () {

  const forms = document.querySelectorAll('.form');
  for (let form of forms) {

    form.addEventListener('click', function () {
      const clickedForm = form;
      //console.log('clickedForm',clickedForm);

      clickedForm.addEventListener('submit', formSend);
      //eslint-disable-next-line
      async function formSend(e) {
        e.preventDefault();
        //console.log('clickedForm',clickedForm);


        let error = formValidate(clickedForm);

        let formData = new FormData(clickedForm);

        if (error === 0) {
          clickedForm.classList.add('_sending');
          clickedForm.parentElement.classList.add('_sending');
          let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData,
          });
          if (response.ok) {
            let result = await response.json();
            alert(result.message);
            clickedForm.reset();
            clickedForm.classList.remove('_sending');
            clickedForm.classList.add('_done');
          } else {
            //alert('Ошибка');
            clickedForm.classList.remove('_sending');
            clickedForm.classList.add('_senderror');
          }
        } 
      }
      function formValidate(clickedForm) {
        let error = 0;
        let formReq = clickedForm.querySelectorAll('._req');
        console.log(formReq);

        for (let index = 0; index < formReq.length; index++) {
          const input = formReq[index];
          formRemoveError(input);

          if (input.value === '') {
            formAddError(input);
            console.log('error');
            error++;
          }
          return error;
        }
      }
      function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
      }
      function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
      }
    });
  }
});


