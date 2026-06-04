const ForgotPasswordModal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p className="modal-text">
          Um torpedo foi enviado para você, <br />
          Siga as devidas intruções para recuperar sua senha.
        </p>
        <button className="modal-button">Reenviar torpedo</button>
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;