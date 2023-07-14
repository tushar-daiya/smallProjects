const searchBarEl = document.getElementById("searchBar");
const searchBtnEl = document.querySelector(".searchBtn");
const result = document.querySelector(".searchResult");

searchBtnEl.addEventListener("click", () => {
  const searchValue = searchBarEl.value;
  if (searchValue.trim().length) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => {
        result.innerHTML = `<div class="results"><h1 class="word">${searchValue}
        <h4 class="phonetic">${data[0]?.meanings[0]?.partOfSpeech}</h4>
        <p class="meaning">
          ${data[0]?.meanings[0]?.definitions[0]?.definition}
        </p>
        <p class="example">
          ${data[0]?.meanings[0]?.definitions[0]?.example || ""}
        </p></div>`;
      })
      .catch(() => {
        result.innerHTML = `<p class="notFound">Could not find word!</p>`;
      });
  } else {
    result.innerHTML = `<p class="notFound">Type in your word!</p>`;
  }
});
