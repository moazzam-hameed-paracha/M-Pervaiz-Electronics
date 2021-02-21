const {
    Text,
    Password,
    DateTime,
    Checkbox,
    File,
    
} = require('@keystonejs/fields')

const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
    src: './images/users',
    path: '/users',
});

const userFields = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        password: {
            type: Password,
            isRequired: true
        },
        email: {
            type: Text,
            isRequired: true,
            isUnique: true
        },
        isAdmin: {
            type: Checkbox,
            isRequired: true
        }
        ,
        phoneNumber: {
            type: Text,
            isRequired: true
        },
        created: {
            type: DateTime,
            isRequired: true,
            defaultValue: new Date()
        },
        lastUpdated: {
            type: DateTime,
            isRequired: true,
            defaultValue: new Date()
        },
        address: {
            type: Text
        },
        latlng: {
            type: Text
        },
        profilePicture: {
            type: File,
            adapter: fileAdapter
        }
    }
}

module.exports = userFields;