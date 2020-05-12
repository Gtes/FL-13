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
          },
          {
            'folder': true,
            'title': 'second',
            'children': [{
              'folder': true,
              'title': 'third',
              'children': []
            }]
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Test',
    'children': []
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
const contextMenu = `<ul class="right-click-menu"><li class="rename">Rename</li><li class="delete">Delete</li></ul>`

let mytarget;

rootNode.addEventListener('click', eventhandler);
rootNode.addEventListener('contextmenu', contextMenufunc);
document.addEventListener('click', onMouseDown);



function renderContextMenu(x, y) {
  const div = rootNode.querySelector('.right-click-menu')

  div.style.left = x + 'px';
  div.style.top = y + 'px';

  div.classList.add('show-menu')

}

function hideMenu() {
  rootNode.querySelector('.right-click-menu').classList.remove('show-menu');
}

function onMouseDown(e) {
  const mymenu = e.target.classList.contains('right-click-menu')
  if (!mymenu) {
    hideMenu();
  }
}

function contextMenufunc(e) {
  console.log(e.target)
  if(e.target.classList.contains('folder') || e.target.classList.contains('file')){
    rootNode.querySelector('.right-click-menu').style.pointerEvents = 'auto';
  } else{
    rootNode.querySelector('.right-click-menu').style.pointerEvents = 'none';
  }


  renderContextMenu(e.pageX, e.pageY)
  e.preventDefault();
  mytarget = e.target;

}


function eventhandler(e) {

  if (e.target.classList.contains('rename')) {
    mytarget.focus()

    mytarget.innerHTML = `<input type="text" value="${mytarget.textContent}" >`

    mytarget.querySelector('input').addEventListener('blur', () => {
      mytarget.innerHTML = mytarget.querySelector('input').value

    });

    mytarget.querySelector('input').focus()

    const valueDot = mytarget.querySelector('input').value;

    mytarget.querySelector('input').setSelectionRange(0, valueDot.indexOf('.'));
  }

  if (e.target.classList.contains('delete')) {
    const parrentFolder = mytarget.parentNode.parentNode.parentNode

    mytarget.parentNode.parentNode.removeChild(mytarget.parentNode);

    if(!parrentFolder.querySelector('ul').hasChildNodes()){
      parrentFolder.querySelector('ul').innerHTML = `<li><span class="test">ahahahhaha</span></li>`
    } else{
      console.log('no')
    }
  }


  if (e.target.parentNode.querySelector('ul')) {
    switch (true) {
      case e.target.parentNode.querySelector('ul').classList.contains('folder-hidde'):
        e.target.parentNode.querySelector('ul').classList.remove('folder-hidde')
        break;

      case e.target.classList.contains('folder'):
        e.target.parentNode.querySelector('ul').classList.add('folder-hidde')
        break;

      default:
        '';
    }
  }
}


function createTree(container, obj) {
  container.innerHTML = createTreeText(obj) + contextMenu;
}

function createTreeText(obj) {
  let li = '';
  let ul;

  const drawFolderIcon = () => {
    return `<i class="material-icons">folder</i>`
  }

  const drawFileIcon = () => {
    return `<i class="material-icons">insert_drive_file</i>`
  }

  const drawEmptyFolder = () => {
    return `<ul><li><span>No files</span></ul></li>`
  }

  const addClass = (className) => {
    return `${className}`
  }

  for (let key of obj) {
    if (key.folder && key.children && key.children.length === 0) {
      li += `<li>` +
        `${ drawFolderIcon()} ${`<span class="${addClass('folder')}">${key.title}</span>`}` +
        drawEmptyFolder() + '</li>'
    } else {
      li += `<li>` +
        `${key.folder ? drawFolderIcon() : drawFileIcon()} 
          <span class="${key.folder? addClass('folder'):addClass('file')}">${key.title}</span>` +
        `${key.children ? createTreeText(key.children) : ''}` +
        '</li>';
    }
  }

  ul = '<ul>' + li + '</ul>'

  return ul;
}

createTree(rootNode, data);

// console.log(fileStructure.getEl())