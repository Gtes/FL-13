const root = document.getElementById('root');

let listOfBooks = []

root.addEventListener('click', onRootEvent);

init();

function init() {
    listOfBooks = getState('books');
    renderBooksList(listOfBooks);

    const div = document.createElement('div');

    div.id = 'book-details';

    root.appendChild(div)
}

function getState(keyName = 'books') {
    const data = localStorage.getItem(keyName);

    return data ? JSON.parse(data) : [];
}

function saveState(booksData, keyName = 'books') {
    localStorage.setItem(keyName, JSON.stringify(booksData));
}

function generateBookListItem(data) {
    const BOOK_ITEM_LINK_CLASS = 'book-list-item';
    const EDIT_BUTTON_CLASS = 'button-edit';
    const BOOK_LIST_ITEM = 'book-list-item';

    const bookItemLink = `<a href="?id=${data.id}#preview" class="${BOOK_ITEM_LINK_CLASS}">${data.title}</a>`
    const editButton = `<a href="?id=${data.id}#edit" class="${EDIT_BUTTON_CLASS}">Edit</a>`

    const bookListItem = `<div class="${BOOK_LIST_ITEM}">${bookItemLink} ${editButton}</div>`


    return bookListItem;


}

function renderBooksList(data) {
    const node = document.createElement('div');
    const addButton = `<a href="#add" class="button add-button">Add</a>`

    for (let bookInfo of data) {
        node.innerHTML += generateBookListItem(bookInfo);
    }

    node.innerHTML += addButton;


    node.classList.add('book-list')
    root.appendChild(node);

    return root;
}



function renderBookDetails(data, id, isDisbaled = true, empty = false) {
    const bookDetailsContainer = document.getElementById('book-details');
    const BOOK_FORM_ID = 'book-details-form';
    console.log(data)
    console.log(id)
    const dataKeys = Object.keys(data[id]);
    let bookDetailsFormFields = ``;

    for (let i of dataKeys) {
        bookDetailsFormFields += generateBookDetails(data[id], i, isDisbaled, empty)
    }

    const saveButton = `<button type="submit" form="${BOOK_FORM_ID}" 
                            class="button save-button" 
                            value="Submit">Save</button>`;

    const cancelButton = `<button class="button cancel-button" value="Cancel">Cancel</button>`;

    const displayButtons = !isDisbaled ? cancelButton + saveButton : '';

    bookDetailsContainer.innerHTML = `<form id="${BOOK_FORM_ID}">${bookDetailsFormFields} ${displayButtons}</form>`;


}

function generateBookDetails(data, key, isDisabled = true, empty = false) {
    const disabled = isDisabled ? 'disabled' : '';
    const dataField = `<input type="text" class="book-details-field" name="{{name}}" 
                        placeholder={{placeholderName}} 
                        value="{{value}}" ${disabled}>`;
    const dataImage = `<img class="book-image" src="{{value}}" alt="book-cover">`
    const dataId = `<input type="hidden" name="{{name}}" value="{{value}}">`


    switch (true) {
        case key === 'id':
            return dataId.replace('{{value}}', data[key])
                .replace('{{name}}', key);

        case empty:
            console.log(empty)
            return dataField.replace('{{name}}', key)
                .replace('{{placeholderName}}', key)
                .replace('{{value}}', '');

        case key === 'image' && !disabled:
            return dataField.replace('{{value}}', data[key])
                .replace('{{name}}', key);

        case key === 'image':
            return dataImage.replace('{{value}}', data[key]);

        default:

            return dataField.replace('{{value}}', data[key])
                .replace('{{name}}', key);
    }
}

function onRootEvent(e) {
    let getFormId;
    let objectIndex;
    let formData;
    const state = {
        page: ''
    };
    // console.log(e.target)

    switch (true) {

        case e.target.classList.contains('save-button') && location.hash === '#add':
            console.log('heheheh')
            getFormId = e.target.closest('form').getAttribute('id');
            formData = getFormData(getFormId);
            formData.id = Date.now()

            listOfBooks.push(formData);
            saveState(listOfBooks);

            break;

        case e.target.classList.contains('save-button'):
            e.preventDefault();
            getFormId = e.target.closest('form').getAttribute('id');
            objectIndex = searchObjectIndex(getFormData(getFormId).id, listOfBooks);

            listOfBooks[objectIndex] = getFormData(getFormId);

            saveState(listOfBooks);

            location.hash = '#preview'

            break;

        case e.target.classList.contains('cancel-button'):
            e.preventDefault();
            confirm('Discard changes?') ? history.back() : '';


            console.log('canceled')
            break;

        case e.target.classList.contains('add-button'):
            state.page = location.href.split('?')[0];
            history.pushState(state, '', `${state.page}`)
            location.hash = '#add'

            renderBookDetails(listOfBooks, 0, false, true);
            document.getElementById('book-details-form').querySelector('[name=title]').focus();
            break;

        default:
            '';
    }
}

function searchObjectIndex(key, array) {
    const bookObjectIndex = array.findIndex(obj => obj.id === Number(key))

    return bookObjectIndex;
}

function getFormData(formId) {

    const form = document.getElementById(formId);

    return {
        id: Number(form.querySelector('[name=id]').value),
        title: form.querySelector('[name=title]').value,
        author: form.querySelector('[name=author]').value,
        image: form.querySelector('[name=image]').value,
        plot: form.querySelector('[name=plot]').value
    }
}


function hash_changed() {
    const data = location.hash;
    const bookDetailsContainer = document.getElementById('book-details');

    const urlParams = new URLSearchParams(location.search);
    const objectIndex = searchObjectIndex(urlParams.get('id'), listOfBooks);


    switch (true) {
        case data === '#preview':
            renderBookDetails(listOfBooks, objectIndex);

            break;
        case data === '#edit':
            renderBookDetails(listOfBooks, objectIndex, false);
            document.getElementById('book-details-form').querySelector('[name=title]').focus();

            break;

        case data === '#add':
            renderBookDetails(listOfBooks, 0, false, true);
            document.getElementById('book-details-form').querySelector('[name=title]').focus();
            break;

        default:
            bookDetailsContainer.innerHTML = `Any book selected`;
    }
}

window.addEventListener('hashchange', hash_changed)
window.addEventListener('load', hash_changed)