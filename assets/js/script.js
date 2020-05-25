'use strict';
// Создать проект асинхронной загрузки карточек пользователей в виде
//  userList (id, имя, фамилия, imageSrc). 
//  застилить. использовать формат данных JSON и метод fetch

//данные сгенерировал на https://mockaroo.com/, 
// есть данные на 10, 100, 1000 и 2000  юзеров о_О

// ----------- старый метод ---------

// function getUsers(value){
// const request = new XMLHttpRequest();
// request.open('GET', `../assets/data/USER_DATA_${value}.json`);
// request.onload = () => cbFunc(JSON.parse(request.responseText));
// request.onerror = () => console.log('error');
// request.send();
// }

// -----------метод fetch------------------

function getUsers(value) {
  return new Promise((resolve, reject) => {
    fetch(`../assets/data/USER_DATA_${value}.json`)
      .then(response => response.json())
      .then(data => resolve(cbFunc(data)))
      .catch(err => reject(err));
  })
}

// ----------------------------------
const menuBtn = document.querySelector('#menu button')
menuBtn.addEventListener('click', e => {
  let value;
  menu.querySelectorAll('input').forEach(i => {
    if (i.checked) value = +i.value
  });
  console.log(value);
  userCardCollection.innerHTML = '';
  getUsers(value);
});
// ----------------------------------
function cbFunc(data) {
  data.forEach(i => addUser(i))
};

function addUser(user) {
  const userAvatar = document.createElement('img');
  userAvatar.classList.add('userAvatar');
  userAvatar.src = user.avatar;

  const userName = document.createElement('h2');
  userName.classList.add('userName');
  userName.textContent = `${user.firstName} ${user.lastName}`;

  const userEmail = document.createElement('p');
  userEmail.classList.add('userEmail');
  userEmail.textContent = user.email;

  const closeBtn = document.createElement('div');
  closeBtn.classList.add('closeBtn');
  // можно добавить сдесь обработчик события(удаление карточки при клике на кнопку)
  // у каждой кнопки будет свой отдельный обработчик
  // closeBtn.addEventListener('click', () =>closeBtn.parentNode.remove())

  const userList = document.createElement('ul');
  userList.classList.add('userList');
  userList.append(userAvatar, userName, userEmail, closeBtn);
  userCardCollection.append(userList)
}

const userCardCollection = document.getElementById('userCardCollection');
// добавляем обработчик на нажатие кнопки удаления (один на весь контейнер)
userCardCollection.addEventListener('click', e => {
  if (e.target.className === 'closeBtn') e.target.parentElement.remove()
})

// ----------------------------------------------------------------
let deg = 0;
setInterval(rotate,0);

function rotate() {
  circle.style.transform =`rotate(${deg+=2}deg)`;
}

