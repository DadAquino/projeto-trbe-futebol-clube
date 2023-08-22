const allUsersMock = [
{
    id: 1,
    username: "Admin",
    role: "admin",
    email: "admin@admin.com",
    password: "secret_admin"
},
{
    id: 2,
    username: "User",
    role: "user",
    email: "user@user.com",
    password: "secret_user"
},
{
    id: 3,
    username: "User",
    role: "user",
    email: "@user.com",
    password: "secret_user"
},
{
    id: 4,
    username: "User",
    role: "user",
    email: "invalid.user@user.com",
    password: "secret_user"
}
]

const validUserMock = {
id: 2,
username: "User",
role: "user",
email: "user@user.com",
password: "secret_user"
}

const existsUserMock = {
id: 3,
username: "User",
role: "user",
email: "@user.com",
password: "secret_user"
}

const emptyUserName = {
id: 2,
role: "user",
email: "user@user.com",
password: "secret_user"
}

const emptyRole = {
id: 2,
username: "User",
email: "user@user.com",
password: "secret_user"
}

const emptyEmail = {
id: 2,
username: "User",
role: "user",
password: "secret_user"
}

const emptyPassword = {
id: 2,
username: "User",
role: "user",
email: "user@user.com",
}

const validTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY4OTgwNDQyMSwiZXhwIjoxNjkyMzk2NDIxfQ.MJAZBcdptAyNn83vVdQ463Zk8Sdi3uZJxpMdHkJqnJg';

const invalidTokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSINVALIDpbiIsImlhdCI6MTY4OTgwNDQyMSwiZXhwIjoxNjkyMzk2NDIxfQ.MJAZBcdptAyNn83vVdQ463Zk8Sdi3uZJxpMdHkJqnJg';

export {
allUsersMock,
validUserMock,
existsUserMock,
emptyUserName,
emptyRole,
emptyEmail,
emptyPassword,
validTokenMock,
invalidTokenMock
}