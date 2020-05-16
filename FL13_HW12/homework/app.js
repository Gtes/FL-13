const root = document.getElementById('root');

const INPUT_FIELD_CLASS = 'form-input';

let listOfBooks = []

root.addEventListener('click', onRootEvent);

init();

function init() {
    listOfBooks = getState('books');

    const bookdDetails = document.createElement('div');
    const booksList = document.createElement('div');

    bookdDetails.id = 'book-details';
    booksList.id = 'book-list'

    root.appendChild(booksList)
    root.appendChild(bookdDetails)

    renderBooksList(listOfBooks);
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
    const editButton = `<a href="?id=${data.id}#edit" class="button ${EDIT_BUTTON_CLASS}">Edit</a>`
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

    const booksListContainer = document.getElementById('book-list')
    booksListContainer.innerHTML = node.innerHTML

    return booksListContainer;
}



function renderBookDetails(data, id) {
    const bookDetailsContainer = document.getElementById('book-details');
    bookDetailsContainer.innerHTML = formTemplate;
    !data ? generateBookDetails() : generateBookDetails(data[id])

}

function generateBookDetails(data) {
    const form = document.getElementById('bookForm');
    const bookImage = document.getElementById('bookImage');
    const titileInput = document.getElementById('titileInput');
    const idInput = document.getElementById('idInput');
    const authorInput = document.getElementById('authorInput');
    const plotInput = document.getElementById('plotInput');
    const imageInput = document.getElementById('imageInput');
    const formButtons = document.querySelector('.formButtons');

    switch (true) {
        case !data:
            bookImage.parentElement.remove();
            form.classList.add('add-mode');
            titileInput.focus();

            return form;

        case location.hash === '#preview':
            bookImage.src = data.image;
            idInput.value = data.id;
            titileInput.value = data.title;
            authorInput.value = data.author;
            plotInput.value = data.plot;
            imageInput.value = data.image;
            disableForm(form);

            formButtons.remove()
            break;

        default:
            bookImage.src = data.image;
            idInput.value = data.id;
            titileInput.value = data.title;
            authorInput.value = data.author;
            plotInput.value = data.plot;
            imageInput.value = data.image;
    }
}

function disableForm(form) {
    let elements = form.elements;
    for (let i = 0, len = elements.length; i < len; ++i) {
        elements[i].disabled = true;
    }
}

const state = {
    page: ''
};

window.addEventListener('popstate', renderData)

function renderData() {
    let urlParams;
    let objectIndex;

    urlParams = new URLSearchParams(location.search);
    objectIndex = searchObjectIndex(urlParams.get('id'), listOfBooks);

    switch (true) {
        case location.hash === '#add':
            renderBookDetails(listOfBooks, objectIndex);
            break;

        case objectIndex === -1:
            state.page = './index.html';
            history.pushState(state, '', state.page)
            break;



        default:
            renderBookDetails(listOfBooks, objectIndex)

    }


}

function onRootEvent(e) {
    let objectIndex;
    let formData;


    const target = e.target;

    switch (true) {


        case target.classList.contains('button-edit'):
            e.preventDefault()

            state.page = target.href;
            history.pushState(state, '', state.page)
            renderData()

            break;

        case target.classList.contains('book-list-item'):
            e.preventDefault();

            state.page = target.href;
            history.pushState(state, '', state.page);

            renderData()
            break;

        case target.classList.contains('save-button') && location.hash === '#add':
            console.log('heheheh')
            e.preventDefault();

            formData = getFormData();
            formData.id = Date.now()

            listOfBooks.push(formData);

            saveState(listOfBooks);

            renderBooksList(listOfBooks);

            history.back()

            break;

        case target.classList.contains('save-button'):
            e.preventDefault();

            objectIndex = searchObjectIndex(getFormData().id, listOfBooks);
            listOfBooks[objectIndex] = getFormData();

            saveState(listOfBooks);

            renderBooksList(listOfBooks);

            history.back()

            setTimeout(function () {
                alert('Book successfully updated');
            }, 3000)

            break;

        case e.target.classList.contains('cancel-button'):
            e.preventDefault();

            confirm('Discard changes?') ? history.back() : '';
            break;

        case e.target.classList.contains('add-button'):
            e.preventDefault()

            state.page = './index.html#add';
            history.pushState(state, '', state.page)

            renderData();
            break;

        default:
            '';
    }
}

function searchObjectIndex(key, array) {
    const bookObjectIndex = array.findIndex(obj => obj.id === Number(key))

    return bookObjectIndex;
}

function getFormData() {
    const titileInput = document.getElementById('titileInput');
    const idInput = document.getElementById('idInput');
    const authorInput = document.getElementById('authorInput');
    const plotInput = document.getElementById('plotInput');
    const imageInput = document.getElementById('imageInput');

    return {
        id: Number(idInput.value),
        title: titileInput.value,
        author: authorInput.value,
        image: imageInput.value,
        plot: plotInput.value
    }
}


// function hash_changed() {
//     const data = location.hash;
//     const bookDetailsContainer = document.getElementById('book-details');

//     const urlParams = new URLSearchParams(location.search);
//     const objectIndex = searchObjectIndex(urlParams.get('id'), listOfBooks);


//     switch (true) {
//         case data === '#preview':
//             // renderBookDetails(listOfBooks, objectIndex);

//             break;
//         case data === '#edit':
//             // console.log(objectIndex)
//             console.log('sajgfhdkjsagf')
//             // renderBookDetails(listOfBooks, objectIndex);

//             break;

//         case data === '#add':
//             // renderBookDetails(listOfBooks, 0, false, true);
//             // document.getElementById('book-details-form').querySelector('[name=title]').focus();
//             break;

//         default:
//             bookDetailsContainer.innerHTML = `Any book selected`;
//     }
// }

// window.addEventListener('hashchange', hash_changed)
window.addEventListener('load', renderData)


const formTemplate = `
<form id="bookForm" class="book-form">
    <div class="bookCoverImage">
      <img id="bookImage"
        src=""
        alt="Book Cover"></div>
    <div class="textBookData">
      <input type="hidden" id="idInput">

      <label for="titileInput">Title</label>
      <input class="${INPUT_FIELD_CLASS}" type="text" placeholder="Title" id="titileInput" required>

      <label for="authorInput">Author</label>
      <input class="${INPUT_FIELD_CLASS}" type="text" placeholder="Author" id="authorInput" required>

      <label for="plotInput">Plot</label>
      <textarea class="${INPUT_FIELD_CLASS}" placeholder="Plot" id="plotInput" required></textarea>

      <label for="imageInput">Cover</label>
      <input class="${INPUT_FIELD_CLASS}" type="url" placeholder="Cover URL" id="imageInput" required>
    </div>

    <div class="formButtons">
      <button class="button cancel-button" value="Cancel">Cancel</button>
      <button type="submit" form="bookForm" class="button save-button" value="Submit">Save</button>
    </div>

  </form>
`