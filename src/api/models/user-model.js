const userItems = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3610,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password123',
  },
];

const listAllUsers = () => userItems;

const findUserById = (id) => {
  const numericId = Number(id);
  return userItems.find((item) => item.user_id === numericId);
};

const addUser = (user) => {
  const {name, username, email, role, password} = user;
  const newId = userItems.length > 0
    ? Math.max(...userItems.map((item) => item.user_id)) + 1
    : 1;

  userItems.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });

  return {user_id: newId};
};

export {listAllUsers, findUserById, addUser};
