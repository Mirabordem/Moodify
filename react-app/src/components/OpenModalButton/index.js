import React from 'react';
import { useModal } from '../../context/Modal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  onItemClick
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = e => {
    e.stopPropagation()
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
    if (onItemClick) onItemClick();
  };

  return (
    <button style={{cursor: 'pointer'}} className='start' onClick={onClick}>{buttonText} </button>
  );
}

export default OpenModalButton;
