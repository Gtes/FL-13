const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const userTemplate = document.getElementById('userTemplate').innerHTML;
const createUserForm = document.getElementById('createUserForm');
const usersList = document.getElementById('usersList');
const addUserBtn = document.getElementById('addUserBtn')

appContainer.addEventListener('click', onAppClick);
createUserForm.addEventListener('submit', onAddNewUser)

init();

function sendRequest(method, url, body = null) {
    const NETWORK_ERROR_MARK = 400

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url);

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', 'admin');

        xhr.onload = () => {
            if (xhr.status >= NETWORK_ERROR_MARK) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        if (body) {
            xhr.send(JSON.stringify(body))
        } else {
            xhr.send(body)
        }
    })
}

function onAppClick(e) {
    const target = e.target;
    let targetUserData;

    switch (true) {
        case target.classList.contains('deleteUserBtn'):
            toggleUserData(target, true)

            return deleteUser(findUserId(target))
                .catch(() => toggleUserData(target, false));

        case target.classList.contains('updateUserButton'):
            targetUserData = getFormData(target.closest('tr'));

            toggleUserData(target, true)

            return updateUser(findUserId(target), targetUserData)
                .catch(() => toggleUserData(target, false));

        default:
            '';
    }
}

function findUserId(target) {
    return target.closest('tr').querySelector('.id').innerText;
}

function updateUser(userId, data) {
    return sendRequest('PUT', baseUrl + '/users' + `/${userId}`, data)
        .then(() => renderUsersList());
}

function deleteUser(userId) {
    return sendRequest('DELETE', baseUrl + '/users' + `/${userId}`)
        .then(() => renderUsersList());
}

function onAddNewUser(e) {
    e.preventDefault();

    addUserBtn.disabled = true;

    return sendRequest('POST', baseUrl + '/users', getFormData(createUserForm)).then(() => {
            addUserBtn.disabled = false;
        })
        .then(() => {
            renderUsersList();
            createUserForm.reset();
            createUserForm.querySelector('.name').focus();
        })
        .catch(() => {
            addUserBtn.disabled = false;
        });
}

function getFormData(form) {
    return {
        name: form.querySelector('.name').value,
        username: form.querySelector('.username').value
    };
}

function toggleUserData(target, state) {
    const nodes = target.closest('tr').getElementsByTagName('*');

    for (let i of nodes) {
        i.disabled = state;
    }
}

function renderUsersList() {
    return sendRequest('GET', baseUrl + '/users')
        .then(response => JSON.parse(response))
        .then(data => generateUsersList(data))
        .catch(err => console.error(err));
}

function generateUsersList(list) {
    const usersHtml = list.map(elem => {
        return userTemplate.replace('{{id}}', elem.id)
            .replace('{{name}}', elem.name)
            .replace('{{username}}', elem.username);
    })

    usersList.innerHTML = usersHtml.join('');
}


function init() {
    renderUsersList();
    createUserForm.querySelector('.name').focus();
}