const Baseurl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const userinput = document.getElementById("inputword"); 
const SearchWord = document.getElementById("SearchWord");
const WordTitle = document.getElementById("word-title");
const audio = document.getElementById("audio");
const descriptions = document.getElementById("search-description");
const searchContain = document.getElementById("search-result-container");


async function fetchData(inputword){
    //descriptions.innerHTML="";
    descriptions.innerHTML = "";
    SearchWord.innerText = `Searching Word "${inputword}"`; 
    const response = await fetch(Baseurl+inputword);
    const resData = await response.json().then((res) => res).catch((error) => error.toString());
    SearchWord.innerText = `Type a word and press enter key`; 
    WordTitle.innerText = `Search Word "${resData[0].word}"`;
    document.getElementById("search-result-container").innerText= `Definition of ${inputword}`;
    resData[0].meanings[0].definitions.map((element, index) => {
        descriptions.innerHTML +=
        `
        <ul>
            <li>${element.definition}
            ${element?.example !== undefined ? `<ul><li>Example: ${element?.example}</li></ul>`:``}
            </li>
        </ul>
        `
    })
    audio.src = resData[0].phonetics[0]?.audio === ""? resData[0].phonetics[1]?.audio: resData[0].phonetics[0]?.audio;
    return resData;
}


userinput.addEventListener("keyup", (e)=>{
    //console.log(e.target.value);
    if(e.target.value && e.key == "Enter"){
        fetchData(e.target.value);
        
    }
})
