import { Modal, Button } from 'react-bootstrap';

export default function ModalConfirm({ show, onClose, onConfirm, title = "Confirmação", message = "Tem certeza?" }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="danger" onClick={onConfirm}>Confirmar</Button>
      </Modal.Footer>
    </Modal>
  );
}
