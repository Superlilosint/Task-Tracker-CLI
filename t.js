const array = [{"id":1,"description":"cool project","status":"todo","createdAt":1772892225344},{"id":2,"description":"cool project","status":"todo","createdAt":1772892242160},{"id":3,"description":"todo","createdAt":1772892504506}];

// const arr = array.find(u => u.id = id);
// console.log(arr);

const array1 = [
  {
    id: 1,
    description: 'cool project',
    status: 'todo',
    createdAt: 1772892225344
  },
  {
    id: 2,
    description: 'cool project',
    status: 'todo',
    createdAt: 1772892242160
  },
  { id: 3, description: 'todo', createdAt: 1772892504506 }
]


// Find object by property value
const found = array1.find(item => item.id === 2);
console.log(found); // { id: 2, name: 'Bob' }

// Find index of object
const index = array.findIndex(item => item.name === 'Alice');
console.log(index); // 0   