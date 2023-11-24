function loadMenuData() {
    fetch('menuData.json')
        .then(response => response.json())
        .then(data => {
            createDropdownMenus(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function createDropdownMenus(menuData) {
    const menuContainer = document.getElementById('menuContainer');

    let menus = {};

    menuData.forEach(item => {
        if (!menus[item.menuItem]) {
            menus[item.menuItem] = [];
        }
        menus[item.menuItem].push({ text: item.dropdownItem, link: item.menuLink });
    });

    for (let menuItem in menus) {
        let dropdownDiv = document.getElementById('dropdown-' + menuItem);

        if (dropdownDiv) {
            updateDropdownMenu(dropdownDiv, menus[menuItem]);
        } else {
            dropdownDiv = createDropdownMenu(menuItem, menus[menuItem], menuItem);
            menuContainer.appendChild(dropdownDiv);
        }
    }
}

function updateDropdownMenu(dropdownDiv, items) {
    let dropdownContent = dropdownDiv.getElementsByClassName('dropdown-content')[0];
    dropdownContent.innerHTML = '';

    items.forEach(item => {
        let link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.text;
        dropdownContent.appendChild(link);
    });
}

function createDropdownMenu(title, items, index) {
    let dropdownDiv = document.createElement('div');
    dropdownDiv.className = 'dropdown';
    dropdownDiv.id = 'dropdown-' + index;

    let dropbtn = document.createElement('button');
    dropbtn.className = 'dropbtn';
    dropbtn.textContent = title;

    let dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
    dropdownContent.id = 'dropdown-content-' + index;

    dropbtn.onmouseover = function () {
        openDropdown(index);
    };

    dropdownDiv.onmouseover = function () {
        openDropdown(index);
    };

    dropdownDiv.onmouseout = function () {
        closeDropdown(index);
    };

    items.forEach(item => {
        let link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.text;
        dropdownContent.appendChild(link);
    });

    dropdownDiv.appendChild(dropbtn);
    dropdownDiv.appendChild(dropdownContent);

    return dropdownDiv;
}

function openDropdown(index) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].style.display = 'none';
    }
    document.getElementById('dropdown-content-' + index).style.display = 'block';
}

function closeDropdown(index) {
    document.getElementById('dropdown-content-' + index).style.display = 'none';
}



function toggleDropdown(index) {
    let dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
        if (i !== index) {
            dropdowns[i].style.display = 'none';
        }
    }
    let selectedDropdown = document.getElementById('dropdown-content-' + index);
    selectedDropdown.style.display = selectedDropdown.style.display === 'block' ? 'none' : 'block';
}

document.addEventListener('click', function (event) {
    if (!event.target.matches('.dropbtn')) {
        let dropdowns = document.getElementsByClassName('dropdown-content');
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
        loadMenuData();
    });

setInterval(loadMenuData, 5000);