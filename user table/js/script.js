document.addEventListener('DOMContentLoaded', function () {
  // 从本地存储获取联系人数据，如果不存在则尝试从 JSON 文件获取并存储到本地存储
  const storedData = localStorage.getItem('contactsData');
  let data;
  if (storedData) {
    try {
      data = JSON.parse(storedData);
      renderContacts(data);
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
  } else {
    fetch('js/index.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json();
      })
    .then(fetchedData => {
        data = fetchedData;
        localStorage.setItem('contactsData', JSON.stringify(fetchedData));
        renderContacts(data);
      })
    .catch(error => {
        console.error('Error:', error);
      });
  }

  const searchInput = document.querySelector('input[type="search"]');
  const searchButton = document.querySelector('button');

  // 为搜索按钮添加点击事件处理函数
  searchButton.addEventListener('click', function () {
    const keyword = searchInput.value.trim().toLowerCase();  // 获取输入的关键词并去除首尾空格转为小写
    const contactItems = document.querySelectorAll('.contact-item1');  // 获取所有联系人元素

    if (keyword === '') {
        // 输入为空，恢复到搜索前状态
        contactItems.forEach(contactItem => {
            contactItem.style.display = 'block';  // 显示所有联系人元素
            const contactNameElement = contactItem.querySelector('.contact-name');
            contactNameElement.innerHTML = contactNameElement.textContent;  // 恢复联系人姓名的原始内容
        });
    } else {
        contactItems.forEach(contactItem => {
            const contactName = contactItem.querySelector('.contact-name').textContent.toLowerCase();  // 获取联系人姓名并转为小写
            const shouldShow = contactName.includes(keyword);  // 判断联系人姓名是否包含关键词
            contactItem.style.display = shouldShow? 'block' : 'none';  // 根据判断结果决定是否显示联系人元素
            if (shouldShow) {
                // 假设这里有一个函数 highlightName 来生成高亮显示的名称，示例如下
                // const highlightedName = highlightName(contactName); 
                // contactNameElement.innerHTML = highlightedName; 
            } else {
                const contactNameElement = contactItem.querySelector('.contact-name');
                contactNameElement.innerHTML = contactNameElement.textContent;
            }
        });
    }
});

  const contactsContainer = document.getElementById('contactsContainer');

  const addButtons = document.querySelectorAll('.add');
  const popupAdd = document.querySelector('.augment');
  const cancelAddButton = document.querySelector('.not-btn');
  const confirmAddBtn = document.querySelector('.yes-btn');

  let currentIndex = null;

  addButtons.forEach(addButton => {
    addButton.addEventListener('click', function () {
      currentIndex = null;
      popupAdd.style.display = 'flex';
      const mcbox = document.getElementById('mc');
      mcbox.textContent = "新增";
      const editUserNameInput = document.getElementById('username');
      const editAvatarInput = document.getElementById('beizuu');
      editUserNameInput.value = '';
      editAvatarInput.value = '';
    });
  });

  cancelAddButton.addEventListener('click', function () {
    popupAdd.style.display = 'none';
  });

  confirmAddBtn.addEventListener('click', function () {
    const newUserName = document.getElementById('username').value;
    const newAvatar = document.getElementById('beizuu').value;

    if (newUserName === "") {
      alert("请输入用户名");
      return;
    }

    if (!data.users) {
      data.users = [];
    }
    if (currentIndex === null) {
      // 新增联系人
      data.users.push({ name: newUserName, avatar: newAvatar });
    } else {
      // 编辑联系人
      const contactToEdit = data.users[currentIndex];
      contactToEdit.name = newUserName;
      contactToEdit.avatar = newAvatar;
    }
    localStorage.setItem('contactsData', JSON.stringify(data));
    // 局部刷新：重新渲染联系人列表
    renderContacts(data);
    popupAdd.style.display = 'none';
  });


  // 使用事件委托处理编辑按钮的点击事件
  contactsContainer.addEventListener('click', function (event) {
    if (event.target && event.target.classList.contains('edit-btn')) {
      const editButton = event.target;
      const contactItem = editButton.closest('.contact-item1');
      const index = Array.from(contactsContainer.children).indexOf(contactItem);
      currentIndex = index;
      const contactToEdit = data.users[index];
      popupAdd.style.display = 'flex';
      const mcbox = document.getElementById('mc');
      mcbox.textContent = "管理员模式";
      const editUserNameInput = document.getElementById('username');
      const editAvatarInput = document.getElementById('beizuu');
      editUserNameInput.value = contactToEdit.name;
      editAvatarInput.value = contactToEdit.avatar;
      //   editUserNameInput.value = '';
      // editAvatarInput.value = '';
    }
  });


  // 渲染联系人列表的函数
  function renderContacts(data) {
    const contactsContainer = document.getElementById('contactsContainer');
    if (data && data.users) {
        contactsContainer.innerHTML = '';
        data.users.forEach((contact, index) => {
            // 创建一个新的 div 元素作为 contact-item 的父容器
            

            const contactItem = document.createElement('div');
            contactItem.classList.add('contact-item');
            const contactItemWrapper = document.createElement('div');
            contactItemWrapper.classList.add('contact-item1');

            const contactAvatar = document.createElement('div');
            contactAvatar.classList.add('contact-avatar');
            contactAvatar.textContent = contact.name.charAt(0);
            contactItem.appendChild(contactAvatar);

            const contactInfo = document.createElement('div');
            contactInfo.classList.add('contact-info');

            const contactName = document.createElement('div');
            contactName.classList.add('contact-name');
            if (contact.avatar.length > 0) {
                contactName.textContent = `${contact.name} (${contact.avatar})`;
            } else {
                contactName.textContent = contact.name;
            }
            contactInfo.appendChild(contactName);

            contactItem.appendChild(contactInfo);

            const contactActions = document.createElement('div');
            contactActions.classList.add('contact-actions');

            const editButton = document.createElement('button');
            editButton.textContent = '编辑';
            editButton.classList.add('edit-btn');
            contactActions.appendChild(editButton);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.classList.add('delete-btn');
            contactActions.appendChild(deleteButton);

            // 为新创建的删除按钮绑定删除事件处理函数
            deleteButton.addEventListener('click', function () {
                handleDeleteButtonClick(index);
            });

            contactItem.appendChild(contactActions);

            // 将 contact-item 放入 contact-item-wrapper 中
            contactItemWrapper.appendChild(contactItem);

            contactsContainer.appendChild(contactItemWrapper);
        });
    }
}

  // 删除按钮的事件处理函数
  function handleDeleteButtonClick(index) {
    const isConfirm = window.confirm('是否删除该联系人？');
    if (isConfirm) {
      if (!data.users) {
        data.users = [];
      }
      data.users.splice(index, 1);
      localStorage.setItem('contactsData', JSON.stringify(data));
      renderContacts(data);
    }
  }
});