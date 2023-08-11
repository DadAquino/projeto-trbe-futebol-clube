const user = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  }
  
  const userWithoutPassword = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
  };
  
  const users = [
    {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    },
    {
      id: 2,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
    }
  ];
  
  const validLoginBody = { email: 'admin@admin.com', password: 'secret_admin' };
  const invalidPasswordLoginBody = { email: 'jondoe@email.com', password: 'sec' };
  const invalidEmailLoginBody = { email: 'invalid_email', password: 'secret_admin' };
  const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };
  
  export {
    user,
    userWithoutPassword,
    users,
    invalidEmailLoginBody,
    invalidPasswordLoginBody,
    validLoginBody,
    userRegistered,
  };