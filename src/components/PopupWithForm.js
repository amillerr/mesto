import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popup, {formSubmitHandler}) {
    super(popup);
    this._formSubmitHandler = formSubmitHandler;
    this._form = this._popup.querySelector(".popup__form");
    this._submitBtn = this._popup.querySelector(".popup__button");
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._formSubmitHandler(this._getInputValues());
     });
    }

  loading(msg) {
    this._submitBtn.textContent = msg;
  }

  close () {
      super.close();
      this._form.reset();
    }
}
