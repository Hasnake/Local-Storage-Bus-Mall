'use strict';
var counter = 0;  //click counter set to 0

var resultList = document.getElementById('results');

var pictureGallery = []; //1. Create empty array

function Images (filepath, Whodis) {   //2. Constructor : Needs to be capital letter
  this.Whodis = Whodis;
  this.filepath = filepath;
  this.timeClicked = 0;
  this.timesDisplayed = 0;
  pictureGallery.push(this);
}

//3. Then create Object instances
var fromLocalStorage = localStorage.getItem('pictureGallery');
if (fromLocalStorage){
  pictureGallery = JSON.parse(fromLocalStorage);
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
  new Images ('img/sweep.jng', 'sweep');
  new Images ('img/tauntaun.jpg', 'tauntaun');
  new Images ('img/unicorn.jpg', 'unicorn');
  new Images ('img/usb.jpg', 'usb');
  new Images ('img/water-can.jpg', 'water-can');
  new Images ('img/wine-glass.jpg', 'wine-glass');
}


//generates random number from 1-19
function randomNumberGenerator () {
  return Math.floor(Math.random() * 20) + 1;
}
function displayImage (){   //4. Now Access -- function that displays the pictures on page
  var previousArray = [];

  var pictureOne = pictureGallery[randomNumberGenerator()]; //pulling the random number in
  var leftImg = document.getElementById('left');
  leftImg.src = pictureOne.filepath;
  leftImg.alt = pictureOne.Whodis;

  var pictureTwo = pictureGallery[randomNumberGenerator()];
  var centerImg = document.getElementById('center');
  centerImg.src = pictureTwo.filepath;
  centerImg.alt = pictureTwo.Whodis;

  var pictureThree = pictureGallery[randomNumberGenerator()];
  var rightImg = document.getElementById('right');
  rightImg.src = pictureThree.filepath;
  rightImg.alt = pictureThree.Whodis;

  //don't show any duplicate code!
  var leftPicture = randomNumberGenerator();
  while (leftPicture === previousArray[0] || leftPicture === previousArray[1] || leftPicture === previousArray[2])
    {
    leftPicture = randomNumberGenerator();

  }
  left.src = pictureGallery[leftPicture].filepath;

  var centerPicture = randomNumberGenerator();
  while (centerPicture === previousArray[0] || centerPicture === previousArray[1] || centerPicture === previousArray[2] || centerPicture === leftPicture)

  {
    centerPicture = randomNumberGenerator();
  }
  center.src = pictureGallery[centerPicture].filepath;

  var rightPicture = randomNumberGenerator();
  while (rightPicture === previousArray[0] || rightPicture === previousArray[1] || rightPicture === previousArray[2]
  || rightPicture === leftPicture || rightPicture === centerPicture)

  {
    rightPicture = randomNumberGenerator();
  }
  right.src = pictureGallery[rightPicture].filepath;

  pictureGallery[rightPicture].timesDisplayed += 1;
  pictureGallery[centerPicture].timesDisplayed += 1;
  pictureGallery[leftPicture].timesDisplayed += 1;
  previousArray.push(leftPicture);
  previousArray.push(centerPicture);
  previousArray.push(rightPicture);
}

displayImage(); //calling the function console.log(rightImg, pictureThree);here.

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

  for (var i = 0; i < pictureGallery.length; i++) {
    if(event.target.alt === pictureGallery[i].Whodis) {
      pictureGallery[i].timeClicked += 1;
      displayImage();
    }
  }
  var toLocalStorage = JSON.stringify(pictureGallery);
  localStorage.setItem('pictureGallery',toLocalStorage);
  counter += 1;
  console.log(counter);
  if (counter === 25) {
    rotateImages.removeEventListener('click', changeThePicturesShown);
    for (var j = 0; j < pictureGallery.length; j++) {
      var lineElement = document.createElement('li');
      lineElement.textContent = pictureGallery[j].Whodis + ' : Displayed/Clicked - ' + pictureGallery[j].timesDisplayed + ' / ' + pictureGallery[j].timeClicked;
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
  for (var i = 0; i < pictureGallery.length; i++) {
    itemName[i] = pictureGallery[i].Whodis;
    clicked[i] = pictureGallery[i].timeClicked;
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
