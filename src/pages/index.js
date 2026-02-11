import "./index.css";

import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import { setButtonText } from "../utils/helpers.js";

import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0197d2a9-7b23-4c2d-a699-8a490f629e74",
    "Content-Type": "application/json",
  },
});

const allModals = document.querySelectorAll(".modal");

//Edit Profile
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseButton = editProfileModal.querySelector(
  ".modal__close-button",
);
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description",
);
const editProfileForm = editProfileModal.querySelector("#profile-form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input",
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input",
);
const saveProfileButton = editProfileModal.querySelector(
  ".modal__submit-button",
);

//New Post
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseButton = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector("#post-form");
const newPostImageInput = newPostModal.querySelector("#card-image-input");
const newPostImageCaptionInput = newPostModal.querySelector(
  "#card-caption-input",
);
const newPostSubmitButton = newPostModal.querySelector(".modal__submit-button");

//Image Modal
const previewModal = document.querySelector("#preview-image-modal");
const previewModalCloseButton = previewModal.querySelector(".modal__close");
const previewImageElement = previewModal.querySelector(".modal__image");
const previewImageCaptionElement = previewModal.querySelector(
  ".modal__image-caption",
);

cardImageElement.addEventListener("click", () => {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageCaptionElement.textContent = data.name;
  openModal(previewModal);
});

//Avatar
const editAvatarButton = document.querySelector(".profile__avatar-button");
const editAvatarModal = document.querySelector("#edit-avatar-modal");
const editAvatarForm = editAvatarModal.querySelector("#avatar-form");
const saveAvatarButton = editAvatarModal.querySelector(".modal__submit-button");
const editAvatarInput = editAvatarModal.querySelector("#profile-avatar-input");
const closeEditAvatarButton = editAvatarModal.querySelector(
  ".modal__close-button",
);
const profileAvatarElement = document.querySelector(".profile__image");

//Delete Modal
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const closeDeleteModalButton = deleteModal.querySelector(
  ".modal__close-button",
);
const cancelDeleteButton = deleteModal.querySelector(".modal__cancel-button");

//Get App Info
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileAvatarElement.src = userInfo.avatar;

    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

//Cards
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

//Card Element
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardImageElement = cardElement.querySelector(".card__image");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  const cardLikeButtonElement = cardElement.querySelector(".card__like-button");
  // cardLikeButtonElement.addEventListener("click", () => {
  //   cardLikeButtonElement.classList.toggle("card__like-button_active");
  // });

  if (data.isLiked) {
    cardLikeButtonElement.classList.add("card__like-button_active");
  }

  cardLikeButtonElement.addEventListener("click", (evt) =>
    handleLike(evt, data),
  );

  //   const isActive = cardLikeButtonElement.classList.contains(
  //     "card__like-button_active",
  //   );

  //   if (isActive) {
  //     api
  //       .removeLike(data._id)
  //       .then((updatedCard) => {
  //         cardLikeButtonElement.classList.remove(".card__like-button");
  //       })
  //       .catch((err) => console.error("Failed to remove like:", err));
  //   } else {
  //     api
  //       .addLike(data._id)
  //       .then((updatedCard) => {
  //         cardLikeButtonElement.classList.add(".card__like-button");
  //       })
  //       .catch((err) => console.error("Failed to add like:", err));
  //   }
  // });

  const cardDeleteButtonElement = cardElement.querySelector(
    ".card__delete-button",
  );
  cardDeleteButtonElement.addEventListener("click", () =>
    handleDeleteCard(cardElement, data),
  );
  //   //cardElement.remove();
  //   console.log("Deleting card with id:", data._id);
  //   api
  //     .deleteCard(data._id)
  //     .then(() => {
  //       cardElement.remove();
  //     })
  //     .catch((err) => {
  //       console.error("Failed to delete card:", err);
  //     });
  // });

  cardImageElement.addEventListener("click", () => handleImageClick(data));

  return cardElement;
}

let selectedCard, selectedCardId;

//Image Click
function handleImageClick(data) {
  previewImageElement.src = data.link;
  previewImageElement.alt = data.name;
  previewImageCaptionElement.textContent = data.name;
  openModal(previewModal);
}

//Like Card
function handleLike(evt, data) {
  selectedCardId = data._id;
  const cardLikeButton = evt.target;
  const isActive = cardLikeButton.classList.contains(
    "card__like-button_active",
  );

  api
    .changeLikeStatus(selectedCardId, isActive)
    .then((updatedCard) => {
      if (updatedCard.isLiked) {
        cardLikeButton.classList.add("card__like-button_active");
      } else {
        cardLikeButton.classList.remove("card__like-button_active");
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

//Delete Card
function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

//Open and Close Modal
function openModal(modal) {
  modal.classList.add("modal_is-open");
  document.addEventListener("keydown", handleEscapeKey);
}
function closeModal(modal) {
  modal.classList.remove("modal_is-open");
  document.removeEventListener("keydown", handleEscapeKey);
}

//Escape Key
function handleEscapeKey(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".modal.modal_is-open");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

allModals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

//Edit Profile Submit
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      closeModal(editProfileModal);
      disableButton(saveProfileButton, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

//New Post Submit TODO-review this section
function handleNewPostSubmit(evt) {
  evt.preventDefault();
  const name = newPostImageCaptionInput.value;
  const link = newPostImageInput.value;
  const newCardData = { name: name, link: link };
  const newCard = getCardElement(newCardData);
  cardsList.prepend(newCard);
  evt.target.reset();
  disableButton(newPostSubmitButton, settings);
  closeModal(newPostModal);
}

//New Avatar Submit
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true);

  api
    .editAvatar(editAvatarInput.value)
    .then((data) => {
      profileAvatarElement.src = data.avatar;
      closeModal(editAvatarModal);
      disableButton(saveAvatarButton, settings);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false);
    });
}

//Delete Submit
function handleDeleteSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.submitter;
  setButtonText(submitButton, true, "Delete");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setButtonText(submitButton, false, "Delete");
    });
}

//Event Listeners
previewModalCloseButton.addEventListener("click", function () {
  closeModal(previewModal);
});

editProfileButton.addEventListener("click", function () {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;
  resetValidation(
    editProfileForm,
    [editProfileNameInput, editProfileDescriptionInput],
    settings,
  );
  openModal(editProfileModal);
});

editProfileCloseButton.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseButton.addEventListener("click", function () {
  closeModal(newPostModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

newPostForm.addEventListener("submit", handleNewPostSubmit);

editAvatarButton.addEventListener("click", function () {
  openModal(editAvatarModal);
});
closeDeleteModalButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

cancelDeleteButton.addEventListener("click", function () {
  closeModal(deleteModal);
});

closeEditAvatarButton.addEventListener("click", function () {
  closeModal(editAvatarModal);
});

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

deleteForm.addEventListener("submit", handleDeleteSubmit);

enableValidation(settings);

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

// api
//     .addNewCard({
//       name: newPostImageCaptionInput.value,
//       link: newPostImageInput.value,
//     })
//     .then((newCard) => {
//       console.log("New card from server:", newCard);
//       cardsList.prepend(getCardElement(newCard));
//       newPostForm.reset();
//       closeModal(newPostModal);
//       disableButton(savePostButton, settings);
//     })
//     .catch((err) => {
//       console.error(err);
//     });

// initialCards.forEach(function (item) {
//   const cardElement = getCardElement(item);
//   cardsList.append(cardElement);
// });
