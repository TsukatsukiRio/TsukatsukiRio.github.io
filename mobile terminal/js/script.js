// 假设这是你的 JSON 数据，实际应用中可能通过 AJAX 等方式获取
// const jsonData = {
//     "items": [
//       {
//         "link": null,
//         "image": "img\\011.jpg",
//         "name": "作品名字"
//       },
//       {
//         "link": null,
//         "image": "img\\012.jpg",
//         "name": "另一个作品名字"
//       }
//     ]
//   };

// const jsonData = require('./js.json');
// console.log(JSON.stringify(jsonData));
// function handleData(data) {
//     console.log(JSON.stringify(data));
    
// }

// fetch('js/js.json')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not OK');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//         // 在这里对获取到的JSON数据进行操作，比如渲染到页面元素上等
//         const item = document.createElement('item');
//         item.classList.add('item');

//         const img = document.createElement('img');
//         img.src = item.image;
//         const a = document.createElement('a');
        
//         const name = document.createElement('h3');
//         name.textContent = item.name;

//         item.addEventListener('click', () => {
//             window.location.href = item.link;
//           });

//           bookDiv.addEventListener('click', () => {
//             window.location.href = book.link;
//           });
    
//           // 将图片和标题元素添加到书本div元素中
//           item.appendChild(img);
//           item.appendChild(name);
    
//           // 将书本div元素添加到书架元素中
//           item.appendChild(item);
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error);
//     });
function handleData(data) {
    console.log(JSON.stringify(data));
  }

  fetch('js/js.json')
   .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json();
    })
   .then(data => {
      const bookShelf = document.getElementById('bookShelf');
      // 遍历数据里的每个作品项
      data.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item');

        const img = document.createElement('img');
        img.src = item.image;

        const a = document.createElement('a');

        const name = document.createElement('p');
        name.textContent = item.name;

        itemDiv.addEventListener('click', () => {
          if (item.link) {
            window.location.href = item.link;
          }
        });

        // 将图片和标题元素添加到当前作品的div元素中
        itemDiv.appendChild(img);
        itemDiv.appendChild(name);

        // 将当前作品的div元素添加到书架元素中
        bookShelf.appendChild(itemDiv);
      });
      // 
      const dev = document.getElementById('dev');
      data.dev.forEach(devItem => {
        const listItem = document.createElement('li');
        // listItem.classList.add('dev');

        const linkElement = document.createElement('a');
        if (devItem.link) {
          linkElement.href = devItem.link;
        }

        const boxDiv = document.createElement('div');
        boxDiv.classList.add('devbox1');

        const contentParagraph = document.createElement('p');
        contentParagraph.textContent = devItem.content;

        boxDiv.appendChild(contentParagraph);
        linkElement.appendChild(boxDiv);
        listItem.appendChild(linkElement);

        // dev.appendChild(listItem);
        dev.appendChild(listItem);
      });

    })
   .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  
     
    
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'js/js.json', true);
// xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         var data = JSON.parse(xhr.responseText);
//         console.log(data);
//         // 在这里对解析后的JSON数据进行操作
//     }
// };
// xhr.send();
// if (true) return
// // 获取 HTML 页面中用于展示作品的容器元素，假设它有一个 id 为 "works-container"
// const worksContainer = document.getElementById('works-container');

// // 遍历 JSON 数据中的每个作品项
// jsonData.items.forEach(item => {
//     // 创建一个包含作品信息的 div 元素作为容器
//     const workDiv = document.createElement('div');
//     workDiv.classList.add('work-item');

//     // 创建图片元素并设置属性
//     const img = document.createElement('img');
//     img.src = item.image;
//     img.alt = item.name;
//     workDiv.appendChild(img);

//     // 创建作品名称的段落元素
//     const namePara = document.createElement('p');
//     namePara.textContent = item.name;
//     workDiv.appendChild(namePara);

//     // 如果 link 不为空，可以创建链接元素，这里由于示例中 link 为 null，暂不处理

//     // 将作品容器添加到页面容器中
//     worksContainer.appendChild(workDiv);
// });