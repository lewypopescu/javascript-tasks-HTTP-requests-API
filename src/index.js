import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  loader.style.display = 'none';

  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
    breedSelect.addEventListener('change', async event => {
      const selectedBreedId = event.target.value;
      loader.style.display = 'block';
      error.style.display = 'none';
      catInfo.style.display = 'none';

      try {
        const catData = await fetchCatByBreed(selectedBreedId);
        const cat = catData[0];
        catInfo.innerHTML = `
          <img src="${cat.url}" alt="Cat Image">
          <p><strong>Breed:</strong> ${cat.breeds[0].name}</p>
          <p><strong>Description:</strong> ${cat.breeds[0].description}</p>
          <p><strong>Temperament:</strong> ${cat.breeds[0].temperament}</p>
        `;

        loader.style.display = 'none';
        catInfo.style.display = 'block';
      } catch (err) {
        error.style.display = 'block';
        loader.style.display = 'none';
        console.error(err);
      }
    });
  } catch (err) {
    error.style.display = 'block';
    console.error(err);
  }
});
