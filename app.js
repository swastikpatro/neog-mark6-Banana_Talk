console.log('Hare krishna');

// selection

const textarea = document.querySelector('[name="text"]');
const translateBtn = document.querySelector('.translate-btn');
const outputDiv = document.querySelector('.output-text');
const alertText = document.querySelector('.alert');
const refreshBtn = document.querySelector('.refresh');
const url = 'https://api.funtranslations.com/translate/minion.json';

function alert() {
  const tID = setInterval(() => {
    alertText.classList.add('show-alert');
  }, 0);

  setTimeout(() => {
    clearInterval(tID);
    alertText.classList.remove('show-alert');
  }, 1000);
}

async function fetchText(myUrl) {
  try {
    const response = await fetch(myUrl);
    if (!response.ok) {
      throw new Error('Cant fetch data');
    }
    const data = await response.json();
    console.log(data.contents);
    return data.contents;
  } catch (err) {
    console.log(err);
  }
}

function displayText(translatedSent) {
  outputDiv.innerText = translatedSent;
}

async function translateText(url) {
  const inputValue = textarea.value;
  if (!inputValue) {
    alert();
    outputDiv.innerText = 'Translated text will be here...';
    return;
  }

  const { translated: translatedSentence } = await fetchText(
    `${url}?text=${inputValue}`
  );
  displayText(translatedSentence);
}

// textarea.addEventListener('click', (e) => {});

translateBtn.addEventListener('click', () => {
  translateText(url);
});

refreshBtn.addEventListener('click', () => {
  textarea.value = '';
});
