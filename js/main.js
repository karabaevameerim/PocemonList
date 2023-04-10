// ! Pocemon-List
let app = document.querySelector("#app");
let next = null;
let prev  = null;
//* стягиваем данные с API
let API = 'https://pokeapi.co/api/v2/pokemon/';
async function pocemonProfile(link=API){
  //* отправляем запрос к API, указанному в переменной API, и ожидаем ответа
let res = await fetch(link);
// *переводим в json() формат
let data = await res.json();
// console.log(data.results);
data.results.forEach((elem,index)=>{
  // console.log(index);
  //* через URL-адрес, получаем данные о покемонах из API
  fetch(elem.url).then((res)=> res.json().then((data)=>{
    // *создаем карточки
    // * вызывем функцию, и отображем подробную информацию о конкретном покемоне
    app.innerHTML +=`
    
    <li onclick = "getPokemonInfo(${index})" class="pocemon-list">
    <p>${data.name}</p>
    <img onmouseenter = "getSound ()" style="width: 150px;
    height: 150px;" src = "${data.sprites.front_default}" alt="${data.name}"
    </li>
    `;
    // let lis = document.getElementsByClassName('.pokemon-list');
    // // добавляем обработчика события mouseenter к каждому элементу списка. Когда мышь наводится на элемент, воспроизводится звук.
    // lis.forEach((e) => {
    //   e.addEventListener("mouseenter", () => {
    //     let sound = document.getElementById("audio");
    //     sound.play();
    //   }, false);
    // });
    
  }))
});
}
// !-----------modal--------
let modal = document.querySelector(".modal");
async function getPokemonInfo(i){
modal.style.display = "block";
let res = await fetch(API);
let data = await res.json();
console.log(data);
// сохраняем URL-адрес конкретного покемона в переменной getUrl
let getUrl = data.results[i].url;
modal.innerHTML = "";
fetch(getUrl)
.then((res)=> res.json())
.then((data)=>{
  // console.log(data);

  modal.innerHTML += `
  <img style= "width: 180px;
  height: 200px;" src="${data.sprites.front_default}" alt="${data.name}" />
      <h2>Name: ${data.name}</h2>
      <p>Weight:${data.weight}</p>
      <p>Height: ${data.height}</p>
      <p>Type: ${data.types[0].type.name}</p>
      <button class = "btn">close</button>
  `;
  let btn = modal.querySelector(".btn")
btn.addEventListener("click", ()=>{
  modal.style.display = "none"
})
})

}

// вызываем функцию
pocemonProfile(); 
let lis = document.getElementsByClassName('.pokemon-list');
// функция для вызова звука
function getSound () {
        let sound = document.getElementById("audio");
        sound.play();
    
}

// !----------pagination-------

let btnPrev = document.querySelector('#btn-prev');
let btnNext = document.querySelector('#btn-next');
btnPrev.addEventListener("click", getPrevPage);
btnNext.addEventListener("click", getNextPage)
async function getPrevPage(){
  app.innerHTML = "";
  let res = await fetch(API);
  let data = await res.json();
  // console.log(data);
  prev = data.previous;
  API = prev;
  pocemonProfile(prev);

};
async function getNextPage(){
  app.innerHTML = "";
  let res =  await fetch(API);
  let data = await res.json();
  console.log(data);
  next = data.next;
  API = next;
  pocemonProfile(next)
}
getNextPage();

