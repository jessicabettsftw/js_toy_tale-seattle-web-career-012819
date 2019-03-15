const addBtn = document.querySelector('#new-toy-btn')
const realToyForm = document.getElementsByClassName('add-toy-form')
const toyForm = document.querySelector('.container')
let addToy = false

console.log(realToyForm)

const BASE_URL = "http://localhost:3000"
const TOYS_URL = `${BASE_URL}/toys`

window.onload = function(){getToys()};

function getToys(){
  fetch(TOYS_URL)
    .then(response => response.json())
    .then(json => {
      json.forEach(toy => {
        createToyCard(toy)
      })
    })
}

function createToyCard(toy) {
  let div = document.getElementById('toy-collection')

  let card = document.createElement('div')
  card.className = 'card'

  let h2 = document.createElement('h2')
  h2.textContent = toy.name
  let img = document.createElement('img')
  img.className = "toy-avatar"
  img.src = toy.image
  let p = document.createElement('p')
  p.textContent = toy.likes
  let button = document.createElement('button')
  button.className = 'like-btn'

  card.appendChild(h2)
  card.appendChild(img)
  card.appendChild(p)
  card.appendChild(button)
  div.appendChild(card)

}

function addNewToy() {
  let userToyInput = getUserToyInput()

  fetch(TOYS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: {
      'name': userToyInput.name,
      'image': userToyInput.image,
      'likes': 0
    }
  })
  .then(response => response.json())
    .then(json => {

      debugger
    })

}

function getUserToyInput(){
  let name = document.getElementsByName('name')[0].value
  let image = document.getElementsByName('image')[0].value
  return new_toy = {'name': name, 'image': image}
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


realToyForm[0].addEventListener('submit', () => {
  addNewToy()
});
