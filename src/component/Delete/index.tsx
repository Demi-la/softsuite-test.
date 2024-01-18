import React from 'react'
import ConfirmModal from '../ConfirmModal';
import Button from '../Button';
import DeleteIcon from "../../assets/DeleteIcon.svg"

const Delete = () => {
  return (
    <ConfirmModal
      icon={<img src={DeleteIcon} alt="Success" />}
      message="Element has been created successfully"
    >
      <p>You can’t reverse this action</p>
      <Button>Cancel</Button>
      <Button>Yes, Delete</Button>
    </ConfirmModal>
  );
}

export default Delete;
