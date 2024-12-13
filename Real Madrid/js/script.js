// const imageBox = document.getElementById('imageBox');
// const images = imageBox.querySelectorAll('img');
// const boxLeft = document.querySelector('.box-left');
// const boxRight = document.querySelector('.box-right');
// const indicatorDots = document.querySelectorAll('.box-zhiding li');
// let currentIndex = 0;
// let timer;
// function showImage(index) {
//   images.forEach((img, i) => {
//     if (i === index) {
//       img.style.display = 'block';
//     } else {
//       img.style.display = 'none';
//     }
//   });

//   indicatorDots.forEach(dot => dot.style.backgroundColor = '#ccc');
//   indicatorDots[index].style.backgroundColor = '#fff';
// }


// function autoPlay() {
//   timer = setInterval(() => {
//     currentIndex = (currentIndex + 1) % images.length;
//     showImage(currentIndex);
//   }, 3000); 
// }

// function prevImage() {
//   currentIndex = (currentIndex - 1 + images.length) % images.length;
//   showImage(currentIndex);
// }

// function nextImage() {
//   currentIndex = (currentIndex + 1) % images.length;
//   showImage(currentIndex);
// }
// boxLeft.addEventListener('click', prevImage);
// boxRight.addEventListener('click', nextImage);
// indicatorDots.forEach(dot => {
//   dot.addEventListener('click', () => {
//     currentIndex = parseInt(dot.dataset.index);
//     showImage(currentIndex);
//   });
// });

// window.onload = () => {
//   showImage(currentIndex);
//   autoPlay();
// };
// $(function(){
//   var index=0;//标记当前索引
//   setInterval(function(){
//     if(index==$(".imageBox").length-1){
//     index=0;
//     $(".imageBox").css("opacity","0");
//     $(".imageBox").eq(index).css("opacity","1");
//   }else{
//     index++;
//     $(".imageBox").css("opacity","0");
//     $(".imageBox").eq(index).css("opacity","1")
//   }
//   },2000)

// })
const imageBox = document.getElementById('imageBox');
const images = imageBox.querySelectorAll('img');
const boxLeft = document.querySelector('.box-left');
const boxRight = document.querySelector('.box-right');
const indicatorDots = document.querySelectorAll('.box-zhiding li');
let currentIndex = 0;

// 显示指定索引的图片
function showImage(index) {
  images.forEach((img, i) => {
    if (i === index) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });
  // 更新指示点状态
  indicatorDots.forEach(dot => dot.style.backgroundColor = '#ccc');
  indicatorDots[index].style.backgroundColor = '#fff';
}

// 上一张图片切换函数
function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage(currentIndex);
}

// 下一张图片切换函数
function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  showImage(currentIndex);
}

// 为左右按钮添加点击事件监听器
boxLeft.addEventListener('click', prevImage);
boxRight.addEventListener('click', nextImage);

// 为指示点添加点击事件监听器
indicatorDots.forEach(dot => {
  dot.addEventListener('click', () => {
    currentIndex = parseInt(dot.dataset.index);
    showImage(currentIndex);
  });
});

// 页面加载完成后，先显示第一张图片
const boxes = document.querySelectorAll('.box');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const indexManager = {
    currentIndex: 1,
    updatePrevIndex() {
        this.currentIndex = (this.currentIndex - 1 + boxes.length) % boxes.length;
        return this.currentIndex;
    },
    updateNextIndex() {
        this.currentIndex = (this.currentIndex + 1) % boxes.length;
        return this.currentIndex;
    }
};

function showBox(index) {
    boxes.forEach((box, i) => {
        if (i === index) {
            box.style.display = 'block';
        } else {
            box.style.display = 'none';
        }
    });
}

prevButton.addEventListener('click', () => {
    let currentIndex = indexManager.updatePrevIndex();
    showBox(currentIndex);
});

nextButton.addEventListener('click', () => {
    let currentIndex = indexManager.updateNextIndex();
    showBox(currentIndex);
});

// 设置轮播间隔时间，单位为毫秒，这里设置为3000毫秒（即3秒），可根据需求调整
const intervalTime = 3000; 
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(nextImage, intervalTime);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// 在页面加载完成后启动自动播放
window.onload = function () {
    // 此处是原有的页面加载完成后的代码逻辑，保持不变
    const imageBox = document.getElementById('imageBox');
    const images = imageBox.querySelectorAll('img');
    const boxLeft = document.querySelector('.box-left');
    const boxRight = document.querySelector('.box-right');
    const indicatorDots = document.querySelectorAll('.box-zhiding li');
    let currentIndex = 0;

    // 显示指定索引的图片
    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
        // 更新指示点状态
        indicatorDots.forEach(dot => dot.style.backgroundColor = '#ccc');
        indicatorDots[index].style.backgroundColor = '#fff';
    }

    // 上一张图片切换函数
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
        stopAutoPlay();
        startAutoPlay();
    }

    // 下一张图片切换函数
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        stopAutoPlay();
        startAutoPlay();
    }

    // 为左右按钮添加点击事件监听器
    boxLeft.addEventListener('click', prevImage);
    boxRight.addEventListener('click', nextImage);

    // 为指示点添加点击事件监听器
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentIndex = parseInt(dot.dataset.index);
            showImage(currentIndex);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    startAutoPlay();
};