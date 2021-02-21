const { File } = require('@keystonejs/fields')

const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
    src: './images/users',
    path: '/users',
});

const productImageFields = {
    fields: {
        name: {
            type: Text,
            isRequired: true
        },
        created: {
            type: DateTime,
            isRequired: true,
            defaultValue: new Date()
        },
        profilePicture: {
            type: File,
            adapter: fileAdapter
        }
    }
}

module.exports = userFields;