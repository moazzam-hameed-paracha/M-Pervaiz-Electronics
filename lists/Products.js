const { Text, Select, Relationship, File } = require('@keystonejs/fields');

const { LocalFileAdapter } = require('@keystonejs/file-adapters');

const fileAdapter = new LocalFileAdapter({
    src: './images/products',
    path: '/products'
});

const productFields = {
    fields: {
        title: {
            type: Text,
            isRequired: true
        },
        description: {
            type: Text,
            isMultiline: true,
            isRequired: true
        },
        primaryPicture: {
            type: File,
            adapter: fileAdapter,
            hooks: {
                beforeChange: async ({ existingItem }) => {
                    if (existingItem && existingItem.file) {
                        await fileAdapter.delete(existingItem.file);
                    }
                }
            }
        },
        status: {
            type: Select,
            options: [
                { value: 'in_stock', label: 'In Stock' },
                { value: 'out_of_stock', label: 'Out of Stock' }
            ],
            defaultValue: 'in_stock'
        },
        author: {
            type: Relationship,
            ref: 'User',
            many: false,
            isRequired: true
        }
    },
    hooks: {
        afterDelete: async ({ existingItem }) => {
            if (existingItem.file) {
                await fileAdapter.delete(existingItem.file);
            }
        }
    },
}

module.exports = productFields;