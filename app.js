// console.log('Hare krishna');

// selection

const textarea = document.querySelector('[name="text"]');
const translateBtn = document.querySelector('.translate-btn');
const outputDiv = document.querySelector('.output-text');
const alertText = document.querySelector('.alert');
const refreshBtn = document.querySelector('.refresh');
const url = 'https://api.funtranslations.com/translate/minion.json';

function alertMsg(alertType, msg) {
  const tID = setInterval(() => {
    alertText.innerText = `${msg}`;
    alertText.classList.add(`alert-${alertType}`);
    alertText.classList.add('show-alert');
  }, 0);

  setTimeout(() => {
    clearInterval(tID);
    alertText.classList.remove(`alert-${alertType}`);
    alertText.classList.remove('show-alert');
  }, 1000);
}

/*
async function fetchText(myUrl) {
  try {
    const response = await fetch(myUrl);
    if (!response.ok) {
      if (response.status === 429) {
        alertMsg(
          'danger',
          `Error ${response.status}, rate limited, try after 1 hour.`
        );
        throw new Error(`${response.status}, rate limited, try after 1 hour.`);
      }
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
  alertMsg('success', 'Translated ✅');
}

async function translateText(url) {
  const inputValue = textarea.value;
  if (!inputValue) {
    alertMsg('danger', 'Please enter text');
    outputDiv.innerText = 'Translated text will be here...';
    return;
  }

  const { translated: translatedSentence } = await fetchText(
    `${url}?text=${inputValue}`
  );
  displayText(translatedSentence);
}

translateBtn.addEventListener('click', () => {
  translateText(url);
});

refreshBtn.addEventListener('click', () => {
  textarea.value = '';
});
*/

// Using fetch() .then()

function handleError(error) {
  console.log(error);
}

function displayText(sentence) {
  outputDiv.innerText = sentence;
  alertMsg('success', 'Translated ✅');
}

function translateText(myUrl) {
  fetch(myUrl)
    .then(function (response) {
      if (!response.ok) {
        if (response.status === 429) {
          alertMsg(
            'danger',
            `Error ${response.status}, rate limited, try after 1 hour.`
          );
          throw new Error(
            `${response.status}, rate limited, try after 1 hour.`
          );
        }
        throw new Error('Cant fetch Data');
      }
      return response.json();
    })
    .then(function (data) {
      const {
        contents: { translated: translatedSent },
      } = data;
      displayText(translatedSent);
    })
    .catch(handleError);
}

function handleTranslateBtnClick() {
  const inputValue = textarea.value;
  if (!inputValue) {
    alertMsg('danger', 'Please enter text');
    outputDiv.innerText = 'Translated text will be here...';
    return;
  }
  translateText(`${url}?text=${inputValue}`);
}

translateBtn.addEventListener('click', handleTranslateBtnClick);

refreshBtn.addEventListener('click', () => {
  textarea.value = '';
});
