export {
  POPUP,
  USER,
  CONTAINER_SLR,
  CARD_TEMPLATE_SLR,
  VALIDATOR_SETTINGS,
  TEXT_SAVE,
  TEXT_SAVE_PROCESSING,
  TEXT_DELETE,
  TEXT_DELETE_PROCESSING
};

const POPUP = {
  EDIT: {
    SELECTOR: '#popup_edit-profile',
    OPEN: document.querySelector('.profile__open-window'),
    FORM: document.forms.edit_profile,
    INPUT_NAME: document.querySelector('.popup__input_type_name'),
    INPUT_ABOUT: document.querySelector('.popup__input_type_job'),
  },
  ADD: {
    SELECTOR: '#popup_place',
    OPEN: document.querySelector('.profile__button'),
    FORM: document.forms.add_place,
  },
  IMAGE: {
    SELECTOR: '.popup_image',
  },
  CONFIRM: {
    SELECTOR: '.popup_delete-confirm',
  },
  AVATAR: {
    OPEN: document.querySelector('.profile__button-edit-avatar'),
    SELECTOR: '.popup_edit-avatar',
    FORM: document.forms.update_avatar,
  }

}

const CONTAINER_SLR = '.elements';


const USER = {
  NAME_SLR: '.profile__title',
  ABOUT_SLR: '.profile__subtitle',
  AVATAR_SLR: '.profile__avatar'
}

const CARD_TEMPLATE_SLR = '#CARD_TEMPLATE_SLR';

const VALIDATOR_SETTINGS = {
  INPUT_SLR: '.popup__input',
  SUBMIT_BUTTON_SLR: '.popup__save-button',
  INPUT_ERROR_CLASS: 'popup__input_type_error',
  ERROR_CLASS: 'popup__error-message_visible',
  SUBMIT_BUTTON_DISABLED: 'popup__save-button_disabled'
}

const TEXT_SAVE = "Сохранить";
const TEXT_SAVE_PROCESSING = "Сохранение...";
const TEXT_DELETE = "Да"
const TEXT_DELETE_PROCESSING = "Удаление...";
