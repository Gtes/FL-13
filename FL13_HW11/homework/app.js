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


rootNode.addEventListener('click', eventhandler);
rootNode.addEventListener('contextmenu', contextMenufunc);
document.addEventListener('click', onMouseDown);


function menuClick(e) {
  // console.log(e.target);
}

function renderContextMenu(x, y) {
  const div = rootNode.querySelector(".right-click-menu")

  div.style.left = x + 'px';
  div.style.top = y + 'px';

  div.classList.add("show-menu")

}

function hideMenu() {
  rootNode.querySelector(".right-click-menu").classList.remove('show-menu');
}

function onMouseDown(e) {
  const mymenu = e.target.classList.contains('right-click-menu')
  if (!mymenu) {
    hideMenu();
  }
}

function contextMenufunc(e) {
  renderContextMenu(e.pageX, e.pageY)
  // console.log('contextMenufunc')
  // console.log(e.target)

  // if (e.target.tagName == 'INPUT') {
  // e.target.addEventListener('blur', () => e.target.disabled = true);
  // e.target.disabled = false;
  // e.target.focus()
  // }
  e.preventDefault();
  mytarget = e.target;
  // return e.target

}

let mytarget;

function eventhandler(e) {

  console.log(mytarget)



  console.log(e.target)

  if (e.target.classList.contains("rename")) {
    mytarget.addEventListener('blur', () => e.target.disabled = true);
    mytarget.disabled = false;
    mytarget.focus()
    const valueDot = mytarget.value.indexOf('.');
    mytarget.setSelectionRange(0, valueDot);
  }

  if (e.target.classList.contains("delete")) {
    // mytarget.parentNode.parentNode.parentNode.removeChild(mytarget.parentNode.parentNode);
  }


  if (e.target.querySelector('ul')) {
    switch (true) {
      case e.target.querySelector('ul').classList.contains("folder-hidde"):
        e.target.querySelector('ul').classList.remove("folder-hidde")
        break;

      case e.target.classList.contains("folder"):
        e.target.querySelector('ul').classList.add("folder-hidde")
        break;

    }
  }
}


function createTree(container, obj) {
  container.innerHTML = createTreeText(obj) + contextMenu;
}

function createTreeText(obj) {
  let li = '';
  let ul;

  let _timer;
  _timer = Date.now();

  const drawFolderIcon = () => {
    return `<i class="material-icons">folder</i>`
  }

  const drawFileIcon = () => {
    return `<i class="material-icons">insert_drive_file</i>`
  }

  const drawEmptyFolder = () => {
    return `<ul><li>No files</ul></li>`
  }

  const addClass = (className) => {
    return `${className}`
  }

  for (let key of obj) {
    // console.log(key.children.length)
    if (key.folder && key.children && key.children.length === 0) {
      li += `<li class="${addClass('folder')}">` + `${ drawFolderIcon() 
        + `<input type="text" value="${key.title}" disabled>` }` +
        drawEmptyFolder() + '</li>'
    } else {
      li += `<li class="${key.folder? addClass('folder'):addClass('file')}">` +
        `${key.folder ? drawFolderIcon() : drawFileIcon()}` +
        `<input type="text" value="${key.title}" disabled>` +
        `${key.children ? createTreeText(key.children) : ''}` +
        '</li>';
    }
  }

  ul = '<ul>' + li + '</ul>'



  if (Date.now() > _timer + 3000) {
    throw 'Execution TIMEOUT';
  }
  return ul;
}

createTree(rootNode, data);

// console.log(fileStructure.getEl())