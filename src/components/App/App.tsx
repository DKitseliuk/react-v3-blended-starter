import Section from '../Section/Section';
import Container from '../Container/Container';
import { useEffect, useState } from 'react';
import type { Photo } from '../../types/photo';
import Form from '../Form/Form';
import { getPhotos } from '../../services/photos';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import PhotosGallery from '../PhotosGallery/PhotosGallery';
// import Modal from '../Modal/Modal';
import ImageModal from '../ImageModal/ImageModal';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await getPhotos(query, page);
        if (data.photos.length === 0) {
          toast.error('No matches!');
          return;
        }
        setPhotos(prev => [...prev, ...data.photos]);
        setIsVisible(page < Math.ceil(data.total_results / data.per_page));
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setPhotos([]);
    setPage(1);
  };

  const handleClick = () => {
    setPage(prev => prev + 1);
  };

  const handleSelectPhoto = (photo: Photo | null) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && (
            <Text textAlign="center">
              Something went wrong. Please try again 🥲
            </Text>
          )}
          {photos.length > 0 && (
            <PhotosGallery photos={photos} onSelect={handleSelectPhoto} />
          )}
          {isVisible && <button onClick={handleClick}>Load more</button>}
          {/* {selectedPhoto && (
            <Modal onClose={() => setSelectedPhoto(null)}>
              <div
                style={{
                  backgroundColor: selectedPhoto.avg_color,
                  borderColor: selectedPhoto.avg_color,
                }}
              >
                <img src={selectedPhoto.src.large} alt={selectedPhoto.alt} />
              </div>
            </Modal>
          )} */}
          <ImageModal
            photo={selectedPhoto}
            modalIsOpen={isModalOpen}
            closeModal={closeModal}
          />
        </Container>
      </Section>
      <Toaster />
    </>
  );
}
