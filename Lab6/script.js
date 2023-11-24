document.getElementById('menuForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const menuItem = document.getElementById('menuItem').value;
    const dropdownItem = document.getElementById('dropdownItem').value;
    const menuLink = document.getElementById('menuLink').value;

    if (!menuItem.trim() || !dropdownItem.trim() || !menuLink.trim()) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }

    const menuData = { menuItem, dropdownItem, menuLink };
    
    fetch('saveMenu.php', {
        method: 'POST',
        body: JSON.stringify(menuData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        alert("Дані успішно збережено.");

        document.getElementById('menuItem').value = '';
        document.getElementById('dropdownItem').value = '';
        document.getElementById('menuLink').value = '';
    })
    .catch(error => {
        alert("Сталася помилка при збереженні даних.");
        console.error('Error:', error);
    });
});
