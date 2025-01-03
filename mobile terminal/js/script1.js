document.addEventListener('DOMContentLoaded', function () {
    // 使用fetch获取外部整合后的JSON文件
    fetch('js/test.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
    .then(dataArray => {
        let urlParams = new URLSearchParams(window.location.search);
        let b = urlParams.get('param');
        b = parseInt(b);
        const targetElement = dataArray.find(item => item.id === b) || dataArray[0];

        // 处理workInfo数据的函数
        handleWorkInfo(targetElement);
        // 处理actors数据的函数
        handleActors(targetElement);
        // 处理test数据中.box1部分的函数
        handleBox1(targetElement);
        // 处理qer数据的函数
        handleQer(targetElement);
        // 处理introduce数据的函数
        handleIntroduce(targetElement);

        // 执行后续交互功能相关的函数
        setupPageInteractions();
      })
    .catch(error => {
        console.error('获取数据出现错误:', error);
      });

    // 处理workInfo数据的函数
    function handleWorkInfo(data) {
      const spans = document.querySelectorAll('span');
      spans[0].textContent = data.workInfo.workName;
      spans[1].textContent = data.workInfo.English;
      spans[2].textContent = data.workInfo.director;
      spans[3].textContent = data.workInfo.genre;
      spans[4].textContent = data.workInfo.language;
      spans[5].textContent = data.workInfo.releaseTime;
    }

    // 处理actors数据的函数
    function handleActors(data) {
      const actorsUl = document.querySelector('ul.na');
      if (actorsUl) {
        data.actors.forEach(actor => {
          const actorDiv = createActorElement(actor);
          const listItem = document.createElement('li');
          listItem.appendChild(actorDiv);
          actorsUl.appendChild(listItem);
        });
      }
    }

    // 创建单个演员元素的函数（封装了重复的创建元素操作）
    function createActorElement(actor) {
      const actorDiv = document.createElement('div');
      actorDiv.classList.add('a1');
      const img = document.createElement('img');
      img.src = actor.imgSrc;
      img.alt = actor.imgAlt;
      const name = document.createElement('p');
      name.textContent = actor.actorName;
      actorDiv.appendChild(img);
      actorDiv.appendChild(name);
      return actorDiv;
    }

    // 处理test数据中.box1部分的函数
    function handleBox1(data) {
      const box1Div = document.querySelector('.box1');
      if (box1Div) {
        const boxsDiv = box1Div.querySelector('.boxs');
        const imgPath = data.test.boxs.image;
        const img = document.createElement('img');
        img.src = imgPath;
        img.id = 'ai';
        boxsDiv.appendChild(img);
      }
    }

    // 处理qer数据的函数
    function handleQer(data) {
      const jzddiv = document.getElementsByClassName('qer');
      Array.from(jzddiv).forEach((element) => {
        const imgList = data.test.qer;
        imgList.forEach((imgData) => {
          const img = document.createElement('img');
          img.src = imgData.image.replace(/\/\//g, '//');
          element.appendChild(img);
        });
      });
    }

    // 处理introduce数据的函数
    function handleIntroduce(data) {
      const jsdiv = document.getElementsByClassName("js");
      const introduceText = data.introduce.section;
      const pElement = document.createElement('p');
      pElement.textContent = introduceText;
      pElement.id='ok';
      jsdiv[0].appendChild(pElement);
    }

    // 封装页面交互功能相关逻辑到一个函数中
    function setupPageInteractions() {
      // 获取所有带有data-clamp属性的p元素，这里假设页面中只有这一处需要此功能，如果有多个需适当调整选择逻辑
      const clampedParagraphs = document.querySelectorAll('p[data-clamp]');

      // 遍历每个这样的p元素
      clampedParagraphs.forEach((paragraph) => {
        const originalText = paragraph.getAttribute('data-content');
        const currentText = paragraph.textContent;
        const isTruncated = currentText.length < originalText.length;
        const expandLink = paragraph.nextElementSibling;

        if (isTruncated && expandLink && expandLink.classList.contains('expand')) {
          expandLink.addEventListener('click', function () {
            paragraph.textContent = originalText;
            expandLink.style.display = 'none';
          });
        }
      });
      function goBack() {
        window.location.href = document.referrer;
      }
      const targetImg = document.getElementById('targetImg');
      const bigElement = document.querySelector('.big');

      // 获取页面中所有的img元素
      const allImages = document.querySelectorAll('img');

      // 遍历所有img元素，为每个图片添加点击事件监听器
      allImages.forEach(function (img) {
          img.addEventListener('click', function () {
              const clickedImgSrc = img.src;
              targetImg.src = clickedImgSrc;
              bigElement.style.display = 'block';
          });
      });

      bigElement.addEventListener("click", function (event) {
          if (event.target === bigElement) {
              bigElement.style.display = "none";
          }
      });

    //   const targetImg = document.getElementById('targetImg');
    //   const bigElement = document.querySelector('.big');
    //   const img = document.getElementById('ai');

    //   if (img) {
    //     img.addEventListener('click', function () {
    //       const clickedImgSrc = img.src;
    //       targetImg.src = clickedImgSrc;
    //       bigElement.style.display = 'block';
    //     });
    //   }

    //   bigElement.addEventListener("click", function (event) {
    //     if (event.target === bigElement) {
    //       bigElement.style.display = "none";
    //     }
    //   });
    }})
      // 获取所有带有data-clamp属性的p元素，这里假设页面中只有这一处需要此功能，如果有多个需适当调整选择逻辑
      const clampedParagraphs = document.querySelectorAll('p[data-clamp]');
    
      // 遍历每个这样的p元素
      clampedParagraphs.forEach((paragraph) => {
          const originalText = paragraph.getAttribute('data-content');
          const currentText = paragraph.textContent;
          const isTruncated = currentText.length < originalText.length;
          const expandLink = paragraph.nextElementSibling;
      
          if (isTruncated && expandLink && expandLink.classList.contains('expand')) {
              expandLink.addEventListener('click', function () {
                  paragraph.textContent = originalText;
                  expandLink.style.display = 'none';
              });
          }
         
      });
      function showFullText(btn) {
        document.getElementById('ok').style.whiteSpace = 'normal';
        document.getElementById('ok').style.overflow = 'visible';
        document.getElementById('ok').style.textOverflow = 'clip';
        document.getElementById('ok').style.height = 'auto';
        // 使用传入的按钮元素，将其隐藏，通过设置样式的display属性为none来实现隐藏
        btn.style.display = 'none';
      }
      function goBack() {
        window.location.href = document.referrer;
      }