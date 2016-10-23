'use strict';

var counter = 0;  //click counter set to 0

var resultList = document.getElementById('results');

var allImages = []; //1. Create empty array

function Images (imgPath, imgName) {   //2. Constructor : Needs to be capital letter
  this.imgPath = imgPath;
  this.imgName = imgName;
  this.timeClicked = 0;
  this.timesDisplayed = 0;
  allImages.push(this);
}

//3. Then create Object instances
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
function randomNumberGenerator () {
  return Math.floor(Math.random() * allImages.length);
}
function displayImage (){   //4. Now Access -- function that displays the pictures on page
  var previousArray = [];

  var pictureOne = allImages[randomNumberGenerator()]; //pulling the random number in
  var leftImg = document.getElementById('left');
  leftImg.src = pictureOne.imgPath;
  leftImg.alt = pictureOne.imgName;

  var pictureTwo = allImages[randomNumberGenerator()];
  var centerImg = document.getElementById('center');
  centerImg.src = pictureTwo.imgPath;
  centerImg.alt = pictureTwo.imgName;

  var pictureThree = allImages[randomNumberGenerator()];
  var rightImg = document.getElementById('right');
  rightImg.src = pictureThree.imgPath;
  rightImg.alt = pictureThree.imgName;

  //don't show any duplicate code!
  var leftPicture = randomNumberGenerator();
  while (leftPicture === previousArray[0] || leftPicture === previousArray[1] || leftPicture === previousArray[2])
  {
    leftPicture = randomNumberGenerator();

  }
  left.src = allImages[leftPicture].imgPath;

  var centerPicture = randomNumberGenerator();
  while (centerPicture === previousArray[0] || centerPicture === previousArray[1] || centerPicture === previousArray[2] || centerPicture === leftPicture)

  {
    centerPicture = randomNumberGenerator();
  }
  center.src = allImages[centerPicture].imgPath;

  var rightPicture = randomNumberGenerator();
  while (rightPicture === previousArray[0] || rightPicture === previousArray[1] || rightPicture === previousArray[2]
    || rightPicture === leftPicture || rightPicture === centerPicture)

    {
    rightPicture = randomNumberGenerator();
  }
  right.src = allImages[rightPicture].imgPath;

  allImages[rightPicture].timesDisplayed += 1;
  allImages[centerPicture].timesDisplayed += 1;
  allImages[leftPicture].timesDisplayed += 1;
  previousArray.push(leftPicture);
  previousArray.push(centerPicture);
  previousArray.push(rightPicture);
}

displayImage(); //calling the function console.log(rightImg, pictureThree);here.

  //start the rotation process

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
      var percentageOfClicksPerView = (allImages[j].timeClicked / allImages[j].timesDisplayed) * 100;
      function recomended(){
        if(percentageOfClicksPerView >= 30){
          return 'Yes';
        }else {
          return 'No';
        }
      }
      var lineElement = document.createElement('li');
      lineElement.textContent = allImages[j].imgName + ' , [views:' + allImages[j].timesDisplayed + ' , ' + 'clicks:' + allImages[j].timeClicked + ' , ' + '% of clicks when viewed:' + ((allImages[j].timeClicked / allImages[j].timesDisplayed) * 100).toFixed(2) + '%]' + ' , ' + 'Recommended? =' + recomended();
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
      label: 'Number of Clicks per Item',
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
