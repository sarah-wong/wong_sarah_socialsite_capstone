import React from 'react'

function DeleteConfirm({targetName, handleClose, handleDelete}) {
  return (
    <div className="dialog">
        <div className="flexbox dialogHeader">
            <h4>Delete "{targetName}"?</h4>
            <button className="iconBtn close" onClick={handleClose}>
            </button>
        </div>
        <div className="dialogBody">
            <p>Are you sure you want to delete "{targetName}"?</p>
            <p><em>(This action cannot be undone!)</em></p>
        </div>
        <div className="dialogBtnContainer">
            <button className="confirmDelBtn" onClick={handleDelete}>
                Delete
            </button>
        </div>
    </div>
  )
}

export default DeleteConfirm