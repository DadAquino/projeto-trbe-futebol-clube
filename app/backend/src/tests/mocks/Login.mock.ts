const validLoginMock = {
  email: "admin@admin.com",
  password: "secret_admin"
}

const invalidLoginMock = {
  email: "invalid@admin.com",
  password: "secret_invalid"
}

const emptyLoginEmailMock = {
  password: "secret_user"
}

const emptyLoginPasswordMock = {
  email: "user@user.com",
}

const wrongLoginPasswordMock = {
  email: "admin@admin.com",
  password: "12345678"
}

const shortLoginPasswordMock = {
  email: "admin@admin.com",
  password: "1234"
}

const wrongLoginEmailPatternMock = {
  email: "user@user",
  password: "secret_user"
}

const userValidMock = {
  id: 1,
  username: "Admin",
  role: "admin",
  email: "admin@admin.com",
  password: "secret_admin"
}

const validTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTgwNDQyMSwiZXhwIjoxNjkyMzk2NDIxfQ.MJAZBcdptAyNn83vVdQ463Zk8Sdi3uZJxpMdHkJqnJg';

const invalidTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSINVALIDpbiIsImlhdCI6MTY4OTgwNDQyMSwiZXhwIjoxNjkyMzk2NDIxfQ.MJAZBcdptAyNn83vVdQ463Zk8Sdi3uZJxpMdHkJqnJg';

export {
  validLoginMock,
  invalidLoginMock,
  emptyLoginEmailMock,
  emptyLoginPasswordMock,
  wrongLoginPasswordMock,
  shortLoginPasswordMock,
  wrongLoginEmailPatternMock,
  validTokenMock,
  invalidTokenMock,
  userValidMock
}
