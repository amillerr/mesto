import "./index.css";
import FormValidator, {config} from "../scripts/FormValidator";
import {
  addBtn,
  apiConfig,
  avatarBtn,
  editBtn,
  formAdd,
  formAvatar,
  formEdit,
  newDescription,
  newName,
  popupAdd,
  popupAvatar,
  popupConfirm,
  popupEdit,
  popupImage,
  userConfig
} from "../utils/constants";
import Api from "../scripts/Api";
import UserInfo from "../scripts/UserInfo";
import PopupConfirm from "../scripts/PopupConfirm";
import Section from "../scripts/Section";
import Card from "../scripts/Card";
import PopupWithForm from "../scripts/PopupWithForm";
import PopupWithImage from "../scripts/PopupWithImage";

const api = new Api(apiConfig)
const myId = api.userId;

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([userData, res]) => {
    user.setUserInfo(userData);
    serverCards.renderer(res);
  })
  .catch(err => console.log(err))

// Promise.all([api.getUserData(), api.getInitialCards()])
//   .then(([data, res]) => {
//     user.setUserInfo(data);
//     serverCards.renderer(res);
//   })
//   .catch(err => console.log(err))

// Валидация форм
const editFormValidation = new FormValidator(config, formEdit);
editFormValidation.enableValidation();
const addFormValidation = new FormValidator(config, formAdd);
addFormValidation.enableValidation();
const avatarFormValidation = new FormValidator(config, formAvatar);
avatarFormValidation.enableValidation()

const popupWithConfirm = new PopupConfirm(popupConfirm)

const serverCards = new Section({
  renderer: (item => renderCards(item))
}, '.elements__list')

function renderCards(item) {
  const card = new Card(item, '#elements-template', myId, {
    handleCardClick: () => {
      popupWithImage.open(item.name, item.link)
    },
    handleConfirmClick: () => {
      popupWithConfirm.open()
      popupWithConfirm.setConfirmHandler(() => {
        api.deleteCard(card._id)
          .then(() => {
            card.removeElement()
          })
          .catch((err) => {
            console.log(err)
          })
      })
    },
    handleAddLike: () => {
      api.likeCard(item._id)
        .then((item) => {
          card.likeCounter(item.likes)
          card.likeElement()
        })
        .catch((err) => {
          console.log(err)
        })
     },
    handleDislike: () => {
      api.dislikeCard(item._id)
        .then((item) => {
          card.likeCounter(item.likes)
          card.likeElement()
        })
        .catch((err) => {
          console.log(err)
        })
      }
  })
  serverCards.addItem(card.generateCard())
}

const user = new UserInfo(userConfig)

const popupChangeAvatar = new PopupWithForm(popupAvatar, {
  formSubmitHandler: (item) => {
    api.changeAvatar(item)
      .then((data) => {
        user.setUserAvatar(data)
        popupChangeAvatar.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

const popupWithImage = new PopupWithImage(popupImage);

const popupEditProfile = new PopupWithForm(popupEdit, {
  formSubmitHandler: (item) => {
    api.setUserData(item)
      .then((res) => {
        user.setUserInfo(res)
        popupEditProfile.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})

const popupAddCard = new PopupWithForm(popupAdd, {
  formSubmitHandler: (item) => {
    api.createCard(item)
      .then((item) => {
        renderCards(item)
        popupAddCard.close()
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
popupChangeAvatar.setEventListeners()
popupWithConfirm.setEventListeners()
popupEditProfile.setEventListeners()
popupAddCard.setEventListeners()
popupWithImage.setEventListeners()

editBtn.addEventListener("click", () => {
  const infoUser = user.getUserInfo();
  newName.value = infoUser.user;
  newDescription.value = infoUser.description;
  editFormValidation.resetForm();
  popupEditProfile.open();
});

addBtn.addEventListener("click", () => {
  addFormValidation.resetForm();
  popupAddCard.open();

});

avatarBtn.addEventListener('click', () => {
  avatarFormValidation.resetForm();
  popupChangeAvatar.open();
})
