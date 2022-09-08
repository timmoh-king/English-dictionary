// define variables
const wrapper = document.querySelector(".wrapper"),
  searchInput = wrapper.querySelector("input"),
  synonyms = wrapper.querySelector(".synonym .list"),
  volume = wrapper.querySelector(".word i"),
  clearIcon = wrapper.querySelector(".search span"),
  infoText = wrapper.querySelector(".info-text");
let audio;

const dataProcessing = (result, word) => {
  console.log(result)
  if(result.title){
    infoText.innerHTML = `oops the word ${word} cannot be found !!`
  } else {
    wrapper.classList.add("active")

    let definitions = result[0].meanings[0].definitions[0]
    let phonetics = `commonly pronounced as ${result[0].phonetics[0].text}`

    document.querySelector(".word p").innerHTML = result[0].word
    document.querySelector(".word span").innerHTML = phonetics
    document.querySelector(".meaning span").innerHTML = definitions.definition
    document.querySelector(".example span").innerHTML = definitions.example ?? `no example here`
    document
  }
}

// fetch api function
function fetchApi(word) {
  infoText.style.color = "#000";
  wrapper.classList.remove("active");
  infoText.innerHTML = `Searching the meaning of <span>"${word}"</span>`;
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => data(result, word));
}

const queryAPI = (word) => {
  infoText.style.color = "#000"
  wrapper.classList.remove("active")
  infoText.innerHTML = `looking for the meaning of ${word}`
  axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(res => dataProcessing(res.data, word))
  .catch(err => {
    infoText.style.color = "#FF0000";
    infoText.innerHTML = `oops!! ${word} cannot be found`
  })
}

searchInput.addEventListener("keyup", (e) => {
  if(e.key === "Enter" && e.target.value){
    queryAPI(e.target.value)
  }
})

clearIcon.addEventListener("click", () => {
  searchInput.value = ""
  searchInput.focus()
  wrapper.classList.remove("active")
  infoText.style.color = "#9A9A9A"
  infoText.innerHTML = `Type any existing word and press enter to get meaning, example, synonyms, etc.`
})