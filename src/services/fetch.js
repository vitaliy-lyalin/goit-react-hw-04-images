const API_KEY = `33671323-2cce06c3be5a372be22004315`;
const BASE_URL = `https://pixabay.com/api/`;

export async function fetchImages(searchQuery, page) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=15`
  );
  if (!response.ok) {
    const message = `Failed to fetch images: ERROR ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  return data;
}
