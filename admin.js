document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('url-input');
    const buttonTextInput = document.getElementById('button-text-input');
    const titleTextInput = document.getElementById('title-text-input');
    const saveButton = document.getElementById('save-button');
    const statusMessage = document.getElementById('status-message');

    const configRef = database.ref('config');

    // Load existing data from Firebase
    configRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
            urlInput.value = data.url || '';
            buttonTextInput.value = data.buttonText || '';
            titleTextInput.value = data.titleText || '';
        }
    });

    // Save data to Firebase
    saveButton.addEventListener('click', () => {
        const configData = {
            url: urlInput.value,
            buttonText: buttonTextInput.value,
            titleText: titleTextInput.value
        };

        configRef.set(configData)
            .then(() => {
                statusMessage.textContent = 'Changes saved successfully!';
                statusMessage.style.color = 'green';
                setTimeout(() => statusMessage.textContent = '', 3000);
            })
            .catch((error) => {
                statusMessage.textContent = `Error: ${error.message}`;
                statusMessage.style.color = 'red';
            });
    });
});
