import React from 'react';

const CommonButton = ({loading, onClick, label, loadingLabel}) => {
  return (
    <button className="btn-custom" type="submit" onClick={onClick}>
      {!loading ? (
        <span className="indicator-label">{label}</span>
      ) : (
        <span className="indicator-progress" style={{display: 'block'}}>
          {loadingLabel}
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
        </span>
      )}
    </button>
  );
};

export default CommonButton;
