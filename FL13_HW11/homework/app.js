const data = [{
    'folder': true,
    'title': 'Pictures',
    'children': [{
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [{
          'title': 'spain.jpeg'
        }]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [{
      'folder': true,
      'title': 'screenshots',
      'children': null
    }]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [{
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
const contextMenu = `<div class="right-click-menu">
                      <div class="rename">Rename</div>
                      <div class="delete">Delete</div></div>`

let mytarget;

rootNode.addEventListener('click', eventhandler);
rootNode.addEventListener('contextmenu', contextMenufunc);
document.addEventListener('click', onMouseDown);



function renderContextMenu(x, y) {
  const div = rootNode.querySelector('.right-click-menu');
  div.style.left = x + 'px';
  div.style.top = y + 'px';

  div.classList.add('show-menu')

}

function hideMenu() {
  rootNode.querySelector('.right-click-menu').classList.remove('show-menu');
  if (rootNode.querySelector('.hover')) {
    rootNode.querySelector('.hover').classList.remove('hover');
  }

}

function onMouseDown(e) {
  const mymenu = e.target.classList.contains('right-click-menu')

  if (!mymenu) {
    hideMenu();

  }
}

function contextMenufunc(e) {
  console.log(e.target)
  if (e.target.classList.contains('folder') || e.target.classList.contains('file')) {
    rootNode.querySelector('.right-click-menu').style.pointerEvents = 'auto';
    rootNode.querySelector('.right-click-menu').classList.remove('disabled');

    e.target.classList.add('hover');
  } else {
    rootNode.querySelector('.right-click-menu').classList.add('disabled');
    rootNode.querySelector('.right-click-menu').style.pointerEvents = 'none';
    e.target.classList.remove('hover');
  }

  renderContextMenu(e.pageX, e.pageY)
  e.preventDefault();
  mytarget = e.target;

}


function eventhandler(e) {

  if (e.target.classList.contains('rename')) {
    mytarget.classList.add('hover');
    mytarget.focus()

    // let mytargetType mytarget.querySelector('i'))

    const drawIcon = (elem) => {
      return elem.classList.contains('folder') ? drawFolderIcon() : drawFileIcon()
    }

    console.log(mytarget.childNodes)
    mytarget.innerHTML = `${drawIcon(mytarget)}` +
      `<input type="text" value="${mytarget.childNodes[mytarget.childNodes.length-1].nodeValue}" class="rename-input" >`

    mytarget.querySelector('input').addEventListener('blur', () => {
      mytarget.innerHTML = `${drawIcon(mytarget)}
      ${mytarget.querySelector('input').value}`;
    });

    mytarget.querySelector('input').addEventListener('keydown', (e) => {
      const returnKeyCode = 13;
      if (e.keyCode === returnKeyCode) {
        mytarget.innerHTML = mytarget.querySelector('input').value;
      }
    });

    mytarget.querySelector('input').focus()

    const valueDot = mytarget.querySelector('input').value;

    mytarget.querySelector('input').setSelectionRange(0, valueDot.indexOf('.'));
  }

  if (e.target.classList.contains('delete')) {
    const parrentFolder = mytarget.parentNode.parentNode.parentNode

    mytarget.parentNode.parentNode.removeChild(mytarget.parentNode);

    if (!parrentFolder.querySelector('ul').hasChildNodes()) {
      parrentFolder.querySelector('ul').innerHTML = `<li><span class="empty-folder">Folder is empty</span></li>`
    } else {
      console.log('no')
    }
  }

  if (e.target.parentNode.querySelector('ul') && e.target.classList.contains('folder')) {
    console.log(e.target.parentNode.querySelector('ul'))
    switch (true) {
      case e.target.parentNode.querySelector('ul').classList.contains('folder-hidde'):
        e.target.parentNode.querySelector('.default-folder').innerHTML = `folder_open`;
        e.target.parentNode.querySelector('ul').classList.remove('folder-hidde')
        e.target.parentNode.querySelector('ul').classList.add('folder-oppen')
        break;

      case e.target.parentNode.querySelector('ul').classList.contains('folder-oppen'):
        e.target.parentNode.querySelector('.default-folder').innerHTML = `folder`;
        e.target.parentNode.querySelector('ul').classList.add('folder-hidde')
        e.target.parentNode.querySelector('ul').classList.remove('folder-oppen')
        break;

      default:
        '';
    }
  }
}


function createTree(container, obj) {
  container.innerHTML = createTreeText(obj) + contextMenu;
}

const drawFolderIcon = () => {
  return `<i class="material-icons default-folder">folder_open</i>`
}

const drawFileIcon = () => {
  return `<i class="material-icons default-file">insert_drive_file</i>`
}

const drawEmptyFolder = () => {
  return `<ul class="${addClass('folder-oppen')}"><li><span class="empty-folder">Folder is empty</span></ul></li>`
}

const addClass = (className) => {
  return `${className}`
}

function createTreeText(obj) {
  let li = '';
  let ul;

  for (let key of obj) {
    if (key.folder && !key.children) {
      li += `<li>` +
        `${`<span class="${addClass('folder')}">${drawFolderIcon()}${key.title}</span>`}` +
        drawEmptyFolder() +
        '</li>'
    } else {
      li += `<li>` +
        `<span class="${key.folder? addClass('folder'):addClass('file')}">` +
        `${key.folder ? drawFolderIcon() : drawFileIcon()} ${key.title}</span>` +
        `${key.children ? createTreeText(key.children) : ''}` +
        '</li>';
    }
  }

  ul = `<ul class="${addClass('folder-oppen')}">` + li + `</ul>`

  return ul;
}

createTree(rootNode, data);