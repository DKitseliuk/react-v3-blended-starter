import Section from '../Section/Section';
import Container from '../Container/Container';
import { useState } from 'react';
import type { Photo } from '../../types/photo';
import Form from '../Form/Form';
import { getPhotos } from '../../services/photos';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';
import Text from '../Text/Text';
import PhotosGallery from '../PhotosGallery/PhotosGallery';

export default function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (newQuery: string): Promise<void> => {
    try {
      setIsError(false);
      setIsLoading(true);
      setPhotos([]);
      const data = await getPhotos(newQuery);
      if (data.length === 0) {
        toast.error('No matches!');
        return;
      }
      setPhotos(data);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Form onSubmit={handleSubmit} />
          {isLoading && <Loader />}
          {isError && <Text>Something went wrong. Please try again 🥲</Text>}
          {photos.length > 0 && <PhotosGallery photos={photos} />}
        </Container>
      </Section>
      <Toaster />
    </>
  );
}
