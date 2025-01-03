fetch('js/DRAGON BALL/test2.json')
.then(response => {
   if (!response.ok) {
     throw new Error('Network response was not OK');
   }
   return response.json();
 })
.then(data => {
   // 获取外层box1元素
   const box1Div = document.querySelector('.box1');
   if (box1Div) {
     // 获取boxs元素并添加图片
     const boxsDiv = box1Div.querySelector('.boxs');
     const imgPath = data.boxs.image;
     const img = document.createElement('img');
     img.src = imgPath;
     boxsDiv.appendChild(img);
   }
   const jzddiv = document.getElementsByClassName('qer');
   // 将类数组对象转换为真正的数组，并使用forEach遍历
   Array.from(jzddiv).forEach((element, i) => {
     // 获取data.qer[i].image的值
     const imgbox = data.qer[i].image;
     // 创建<img>元素
     const img = document.createElement('img');
     // 设置<img>元素的src属性
     img.src = imgbox.replace(/\/\//g, '//');
     // 将<img>元素添加到当前元素中
     element.appendChild(img);
   });
});
 document.addEventListener('DOMContentLoaded', function () {
   // 使用fetch获取外部JSON文件
   fetch('js/DRAGON BALL/workInfo2.json')
    .then(response => response.json())
    .then(workInfo => {
       const spans = document.querySelectorAll('span');
       spans[0].textContent = workInfo.workName;
       spans[1].textContent = workInfo.director;
       spans[2].textContent = workInfo.genre;
       spans[3].textContent = workInfo.language;
       spans[4].textContent = workInfo.releaseTime;
     });
 });
//   
document.addEventListener('DOMContentLoaded', function () {
   // 使用fetch获取actors.json文件
   fetch('js/DRAGON BALL/actors2.json')
  .then(response => response.json())
  .then(actors => {
       // 获取类名为'na'的ul元素
       const actorsUl = document.querySelector('ul.na');
       if (actorsUl) {
         actors.forEach(actor => {
           // 创建演员信息的HTML元素
           const actorDiv = document.createElement('div');
           actorDiv.classList.add('a1');
           const img = document.createElement('img');
           img.src = actor.imgSrc;
           img.alt = actor.imgAlt;
           const name = document.createElement('p');
           name.textContent = actor.actorName;
           // 将元素添加到actorDiv中
           actorDiv.appendChild(img);
           actorDiv.appendChild(name);
           // 创建li元素并添加actorDiv
           const listItem = document.createElement('li');
           listItem.appendChild(actorDiv);
           // 将li元素添加到ul元素中
           actorsUl.appendChild(listItem);
         });
       }
     });
 });
 