document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const bigbox = document.querySelector('.big-box');
  const placeholders = document.querySelectorAll('.zhanwei');
  const noResultsMessage = document.getElementById('no-results-message');
  let originalData = [];

  // 加载数据
  fetch('js/index.json')
 .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not OK');
      }
      return response.json();
  })
 .then(data => { 
      originalData = data;
      displayData(data);
  })
 .catch(error => { 
      console.error('Error fetching data:', error);
  });

  // 点击搜索按钮事件
  searchButton.addEventListener('click', function() {
      const keyword = searchInput.value.trim();
      filterAndDisplayData(keyword);
  });

  // 输入框回车事件
  searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          const keyword = searchInput.value.trim();
          filterAndDisplayData(keyword);
      }
  });

  function displayData(data) {
      bigbox.innerHTML = '';
      data.forEach(item => {
          const newbox = document.createElement('div');
          newbox.classList.add('item');
          const newimg = document.createElement('img');
          newimg.src = item.img;
          newimg.alt = 'Video thumbnail';
          const newa = document.createElement('a');
          newa.href = item.src;
          newa.classList.add('newa');
          newa.target = "_blank";
          newa.appendChild(newimg);
          const newtext = document.createElement('p');
          newtext.textContent = item.js;
          newa.appendChild(newtext);
          newbox.appendChild(newa);
          bigbox.appendChild(newbox); 
      });

      if (data.length === 0) {
          placeholders.forEach(placeholder => placeholder.style.display = 'block');
      } else {
          placeholders.forEach(placeholder => placeholder.style.display = 'none');
      }

      noResultsMessage.style.display = 'none';
  }

  function filterAndDisplayData(keyword) {
      if (keyword === '') {
          displayData(originalData);
      } else {
          const filteredData = originalData.filter(item => {
              return item.js.toLowerCase().includes(keyword.toLowerCase());
          });
          if (filteredData.length === 0) {
              bigbox.innerHTML = '';
              noResultsMessage.style.display = 'block';
          } else {
              noResultsMessage.style.display = 'none';
              displayData(filteredData);
          }
      }
  }

  function highlightText(element, keyword) {
      const text = element.textContent;
      const lowerCaseText = text.toLowerCase();
      const lowerCaseKeyword = keyword.toLowerCase();
      const index = lowerCaseText.indexOf(lowerCaseKeyword);
      if (index!== -1) {
          const highlightedText = `${text.slice(0, index)}<span class="highlight">${text.slice(index, index + keyword.length)}</span>${text.slice(index + keyword.length)}`;
          element.innerHTML = highlightedText;
      }
  }

  function highlightResults(keyword) {
      const elements = document.querySelectorAll('.newa p');
      elements.forEach(element => {
          element.innerHTML = element.textContent; // 先将元素内容恢复为原始文本
          highlightText(element, keyword);
      });
  }

  searchButton.addEventListener('click', function() {
      const keyword = searchInput.value.trim();
      filterAndDisplayData(keyword);
      highlightResults(keyword);
  });

  searchInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          const keyword = searchInput.value.trim();
          filterAndDisplayData(keyword);
          highlightResults(keyword);
      }
  });
});