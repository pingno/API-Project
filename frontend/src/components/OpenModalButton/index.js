// frontend/src/components/OpenModalButton/index.js
import React from "react";
import { useModal } from "../../context/Modal";


function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <button onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;

//many different use cases for the open modal button
//can use it to render buttons trigger the login and sign up forms as modals
//can be used anywhere in your app
//when you want to trigger a modal to open by the click of a ubtton