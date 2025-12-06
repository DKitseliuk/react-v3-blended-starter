import Modal from 'react-modal';
import type { Photo } from '../../types/photo';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
};

Modal.setAppElement('#root');

interface ImageModal {
  photo: Photo | null;
  modalIsOpen: boolean;
  closeModal: () => void;
}

const ImageModal = ({ photo, modalIsOpen, closeModal }: ImageModal) => {
  if (!photo) return;
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <img src={photo.src.large} alt={photo.alt} />
    </Modal>
  );
};

export default ImageModal;
