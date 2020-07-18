'use strict';

window.editingForm = (function () {
  var MAX_HASHTAG_COUNT = 5;
  var editingForm = document.querySelector('.img-upload__form');
  var editingModal = editingForm.querySelector('.img-upload__overlay');
  var hashtagsField = editingForm.querySelector('.text__hashtags');

  var validateHashtagsField = function () {
    hashtagsField.value = hashtagsField.value.replace(/\s+/g, ' ');

    var hashtagArray = hashtagsField.value.trim().split(' ');

    if (hashtagArray[0] === '') {
      hashtagArray.pop();
    }

    if (hashtagArray.length > MAX_HASHTAG_COUNT) {
      hashtagsField.setCustomValidity('Ошибка! Удалите ' + (hashtagArray.length - MAX_HASHTAG_COUNT).toString() + ' хэштега (их должно быть не больше ' + MAX_HASHTAG_COUNT.toString() + ')');
      return;
    }

    var regExp = /^#[а-яА-ЯёЁa-zA-Z\d]{1,19}$/;
    var lowerCaseHashtagI = '';

    for (var i = 0; i < hashtagArray.length; i++) {
      lowerCaseHashtagI = hashtagArray[i].toLowerCase();
      for (var j = i + 1; j < hashtagArray.length; j++) {
        if (hashtagArray[j].toLowerCase() === lowerCaseHashtagI) {
          hashtagsField.setCustomValidity('Ошибка! Хэштег "' + lowerCaseHashtagI + '" указан более одного раза.');
          return;
        }
      }
      if (!regExp.test(hashtagArray[i])) {
        hashtagsField.setCustomValidity('Ошибка! Каждый хэштег должен начинаться с символа #, за которым должны следовать 1 - 19 цифро-буквенных символов.');
        return;
      }
    }
    hashtagsField.setCustomValidity('');
  };

  var commentField = editingForm.querySelector('.text__description');

  var ifNotActive = function () {
    if (hashtagsField !== document.activeElement && commentField !== document.activeElement) {
      window.util.closePopup(editingModal, onEscPress);
    }
  };

  var onEscPress = function (evt) {
    window.util.isEscEvent(evt, ifNotActive);
  };

  hashtagsField.addEventListener('input', function () {
    window.editingForm.validateHashtagsField();
    hashtagsField.style.boxShadow = 'none';
  });

  hashtagsField.addEventListener('blur', function () {
    hashtagsField.style.boxShadow = 'none';
  });

  var uploadSubmitBtn = editingForm.querySelector('#upload-submit');

  uploadSubmitBtn.addEventListener('click', function () {
    if (!hashtagsField.validity.valid) {
      hashtagsField.style.boxShadow = 'inset 0 0 2px 2px red';
    }
    hashtagsField.value = hashtagsField.value.trim();
  });

  var resetCustomControls = function () {
    window.scaleSpin.setValue(window.scaleSpin.getDefaultValue());
    window.effectRange.setValue(window.effectRange.getDefaultValue());
  };

  return {
    validateHashtagsField: validateHashtagsField,
    onEscPress: onEscPress,
    resetCustomControls: resetCustomControls
  };
})();
