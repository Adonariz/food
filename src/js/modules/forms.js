import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector ,modalTimerId) {
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  forms.forEach(item => {
    bindPostData(item);
  });



  function bindPostData(form) {
    form.addEventListener('submit', (evt)=> {
      evt.preventDefault();

      const statusMessage = document.createElement('img');
      
      statusMessage.src = message.loading;
      statusMessage.style.cssText = 
      `
        display: block;
        margin: 0 auto;
      `;
      
      form.insertAdjacentElement('afterend', statusMessage);
      
      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      // const object = {};
      
      // formData.forEach(function(value, key) {
      //   object[key] = value;
      // });

      postData('http://localhost:3000/requests', json)
      .then(data => {
        console.log(data);
        showThxModal(message.success);
        statusMessage.remove();
      })
      .catch(() => {
        showThxModal(message.failure);
      })
      .finally(() => {
        form.reset();
      });
    });
  }

  function showThxModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thxModal = document.createElement('div');
    thxModal.classList.add('modal__dialog');
    thxModal.innerHTML =
    `
      <div class="modal__content">
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thxModal);
    
    setTimeout(() => {
      thxModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }
}

export default forms;