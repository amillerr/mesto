import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor(popup) {
    super(popup);
    this._confirmBtn = this._popup.querySelector(".popup__button_type_confirm");
  }

  setEventListeners() {
    this._confirmBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleConfirm();
      this.close();
    });
    super.setEventListeners();
  }

  setConfirmHandler(fn) {
    this._handleConfirm = fn;
  }

  open() {
    super.open();
  }
}
