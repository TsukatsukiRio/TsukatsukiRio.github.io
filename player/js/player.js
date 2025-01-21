fetch("js/player.json")
.then(response => {
    if (!response.ok) {
      throw new Error('Network reponse was not OK');
    }
    return response.json();
  })
.then(dataArray => {
    let urlParams = new URLSearchParams(window.location.search);
    let b = urlParams.get('param');
    if (isNaN(b)) {
      throw new Error('Invalid param value');
    }
    const targetElement = dataArray.find(item => item.id === String(b)) || dataArray[0];
      
    return targetElement;
  })
.then(data => {
    let spbox = document.getElementById('lzj');
    if (spbox) {
      spbox.src = data.src;
    }
    let oibox = document.getElementById('oi');
    if (oibox) {
      oibox.textContent = data.js;
    }
    let iqbox = document.getElementById('all')
    if (iqbox) {
      iqbox.textContent = data.ly;
    }
  })
.catch(error => {
    console.error(error);
  });