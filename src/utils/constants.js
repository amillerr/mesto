//Объявление переменных

export const popupEdit = document.querySelector(".popup_profile");
export const popupAdd = document.querySelector(".popup_element");
export const popupImage = document.querySelector(".popup_image");
export const popupAvatar = document.querySelector('.popup_avatar')
export const avatarBtn = document.querySelector('.profile__avatar_change')

export const editBtn = document.querySelector(".profile__edit-btn");
export const addBtn = document.querySelector(".profile__add-btn");

export const profile = document.querySelector(".profile");
export const nameProfile = profile.querySelector(".profile__name");
export const descriptionProfile = profile.querySelector(
  ".profile__description"
);
export const editAvatar = document.querySelector('.profile__avatar')

export const placeList = document.querySelector(".elements__list");
export const elementTemplate = document.querySelector("#elements-template")
  .content;

export const formEdit = popupEdit.querySelector(".popup__form_edit");
export const formAdd = popupAdd.querySelector(".popup__form_add");
export const formAvatar = popupAvatar.querySelector('.popup__form_avatar')

export const newName = popupEdit.querySelector(".popup__input_type_name");
export const newDescription = popupEdit.querySelector(
  ".popup__input_type_description"
);

export const userConfig = {
  name: nameProfile,
  description: descriptionProfile,
  avatar: editAvatar
}