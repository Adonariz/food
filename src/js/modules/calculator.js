function calculator() {
  const result = document.querySelector('.calculating__result span');

  let gender, height, weight, age, ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', 'female');
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(item => {
      item.classList.remove(activeClass);

      if (item.getAttribute('id') === localStorage.getItem('gender')) {
        item.classList.add(activeClass);
      }
      
      if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        item.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

  function calcTotal() {
    if (!gender || !height || !weight || !age || !ratio) {
      result.textContent = '0';
      return;
    }

    if (gender === 'female') {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  function getStaticInfo(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((item) => {
      item.addEventListener('click', (evt) => {
        if (evt.target.getAttribute('data-ratio')) {
          ratio = +evt.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +evt.target.getAttribute('data-ratio'));
        } else {
          gender = evt.target.getAttribute('id');
          localStorage.setItem('gender', evt.target.getAttribute('id'));
        }
  
        elements.forEach(item => item.classList.remove(activeClass));
  
        evt.target.classList.add(activeClass);
        
        calcTotal();
      });
    });
  }

  getStaticInfo('#gender div', 'calculating__choose-item_active');
  getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInfo(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '1px solid tomato';
      } else {
        input.style.border = 'none';
      }

      switch(input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }

      calcTotal();
    });
  }

  getDynamicInfo('#height');
  getDynamicInfo('#weight');
  getDynamicInfo('#age');
}

module.exports = calculator;