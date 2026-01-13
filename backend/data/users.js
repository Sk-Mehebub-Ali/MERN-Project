import bcrypt from 'bcrypt';

const users = [
  {
    name: 'rajib ali',
    email: 'rajibhosen1979@gmail.com',
    password: bcrypt.hashSync('rajib123', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('john123', 10),
    isAdmin: false
  },
  {
    name: 'mehebub',
    email: 'mehebubali704787@gmail.com',
    password: bcrypt.hashSync('alice123', 10),
    isAdmin: false
  },
  {
    name: 'Eva Brown',
    email: 'eva@email.com',
    password: bcrypt.hashSync('eva123', 10),
    isAdmin: false
  },
  {
    name: 'David Miller',
    email: 'david@email.com',
    password: bcrypt.hashSync('david123', 10),
    isAdmin: false
  }
];

export default users;


