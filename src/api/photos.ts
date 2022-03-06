const API_URL = 'https://jsonplaceholder.typicode.com/photos';

export const getPhotosFromServer = async () => {
  const response = await fetch(API_URL);

  return response.json();
};

export const deletePhotoFromServer = async (photoId: number) => {
  const url = `${API_URL}/${photoId}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });

  // eslint-disable-next-line no-console
  console.log(response);
};
