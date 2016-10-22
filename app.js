'use strict';
var counter = 0;

var resultList = document.getElementById('results');

var allImages = []; //1. Create empty array

function Images (imgPath, imgName) {
  this.imgName = imgName;
  this.imgPath = imgPath;
  this.timeClicked = 0;
  this.timesDisplayed = 0;
  allImages.push(this);
}

//creating Object instances
var fromLocalStorage = localStorage.getItem('allImages');
if (fromLocalStorage){
  allImages = JSON.parse(fromLocalStorage);
} else {
  new Images ('img/bag.jpg', 'bag');
  new Images ('img/banana.jpg', 'banana');
  new Images ('img/bathroom.jpg', 'bathroom');
  new Images ('img/boots.jpg', 'boots');
  new Images ('img/breakfast.jpg', 'breakfast');
  new Images ('img/bubblegum.jpg', 'bubblegum');
  new Images ( 'img/chair.jpg', 'chair');
  new Images ('img/cthulhu.jpg', 'cthulhu');
  new Images ('img/dog-duck.jpg', 'dog-duck');
  new Images ('img/dragon.jpg', 'dragon');
  new Images ('img/pen.jpg', 'pen');
  new Images ('img/pet-sweep.jpg', 'pet-sweep');
  new Images ('img/scissors.jpg', 'scissors');
  new Images ('img/shark.jpg', 'shark');
  new Images ('img/sweep.png', 'sweep');
  new Images ('img/tauntaun.jpg', 'tauntaun');
  new Images ('img/unicorn.jpg', 'unicorn');
  new Images ('img/usb.jpg', 'usb');
  new Images ('img/water-can.jpg', 'water-can');
  new Images ('img/wine-glass.jpg', 'wine-glass');
}


//generates random number from 1-19
function randomIndex() {
  return Math.floor(Math.random() * allImages.length);
}

function displayImg() {
  var leftImgIndex = randomIndex();
  var centerImgIndex = randomIndex();
  var rightImgIndex = randomIndex();

  while (centerImgIndex === leftImgIndex) {
    centerImgIndex = randomIndex();
  }

  while (rightImgIndex === centerImgIndex || rightImgIndex === leftImgIndex) {
    rightImgIndex = randomIndex();
  }

  var leftImg = document.getElementById('left');
  leftImg.src = allImages[leftImgIndex].imgPath;
  leftImg.alt = allImages[leftImgIndex].imgName;

  var centerImg = document.getElementById('center');
  centerImg.src = allImages[centerImgIndex].imgPath;
  centerImg.alt = allImages[centerImgIndex].imgName;

  var rightImg = document.getElementById('right');
  rightImg.src = allImages[rightImgIndex].imgPath;
  rightImg.alt = allImages[rightImgIndex].imgName;
}

displayImg(); //calling the function console.log(rightImg, pictureThree);here.

// ***************************start the rotation process

var rotateImages = document.getElementById('wrapper');
rotateImages.addEventListener('click',changeThePicturesShown);  //this is the clicking of the camera
reset.addEventListener('click',resetLocalStorage);
refresh.addEventListener('click',refreshPage);
function resetLocalStorage(){
  localStorage.clear();
}
function refreshPage(){
  location.reload();
}
function changeThePicturesShown(event) {
  if (event.target.id === 'wrapper'){
    alert('Please click on an image.');
  }

  for (var i = 0; i < allImages.length; i++) {
    if(event.target.alt === allImages[i].imgName) {
      allImages[i].timeClicked += 1;
      displayImage();
    }
  }
  var toLocalStorage = JSON.stringify(allImages);
  localStorage.setItem('allImages',toLocalStorage);
  counter += 1;
  console.log(counter);
  if (counter === 15) {
    rotateImages.removeEventListener('click', changeThePicturesShown);
    for (var j = 0; j < allImages.length; j++) {
      var lineElement = document.createElement('li');
      lineElement.textContent = allImages[j].imgName + ' : Displayed/Clicked - ' + allImages[j].timesDisplayed + ' / ' + allImages[j].timeClicked;
      resultList.appendChild(lineElement);
      prepareData();
      drawChart();
    }
  }
}


var nameOfItemsAsShownOnChart = document.getElementById('canvas');
var itemName = [];
var clicked = [];
function prepareData(){
  for (var i = 0; i < allImages.length; i++) {
    itemName[i] = allImages[i].imgName;
    clicked[i] = allImages[i].timeClicked;
  }
}

var data = {
  labels: itemName,
  datasets: [
    {
      data: clicked,
      label: 'Clicks per tem',
      backgroundColor: '#8e2382',
    }]
};

function drawChart() {

  var myFinalChart = new Chart(nameOfItemsAsShownOnChart,{
    type: 'bar',
    data: data,
    options: {
      responsive: false
    },
    scales: [{
      ticks: {
        beginAtZero:true
      }
    }]
  });
}
