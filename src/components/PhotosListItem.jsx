import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import { useRemovePhotoMutation } from '../store';

function PhotosListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo);
  };

  return (
    <div className='relative cursor-pointer m-2'>
      <img className='h-20 w-20' src={photo.url} alt={photo.url} />
      <div
        onClick={handleRemovePhoto}
        className='absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-80'
      >
        <GoTrashcan className='text-3xl text-red-500' />
      </div>
    </div>
  );
}

export default PhotosListItem;
