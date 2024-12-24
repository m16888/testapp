const fs = require('fs');
const {
    readJsonSync,
    appendToFileSync,
    readJsonAsync,
    listDirectoryRecursiveSync
} = require("./file-system");

describe('file-system', () => {
    const fileContents = [
        {
            "name": "Apple",
            "quantity": 7
        },
        {
            "name": "Bread",
            "quantity": 1
        },
        {
            "name": "Tuna",
            "quantity": 2
        },
        {
            "name": "Banana",
            "quantity": 1
        }
    ];

    describe('readJsonSync()', () => {
        it('should read JSON file, deserialize its content and return it (synchronously)', () => {
            const result = readJsonSync('./resources/groceries.json');
            expect(result).toEqual(fileContents);
        });
    });

    describe('appendToFileSync()', () => {
        const fileToAppendTo = './resources/file-to-append-to.txt';

        it('should append a line to file (synchronously)', () => {
            appendToFileSync(fileToAppendTo, 'second line');
            const contentBuffer = fs.readFileSync(fileToAppendTo);
            expect(contentBuffer.toString()).toEqual(`first line\nsecond line`);
        });

        afterEach(() => {
            fs.writeFileSync(fileToAppendTo, 'first line');
        })
    });

    describe('readJsonAsync()', () => {
        it('should read JSON file, deserialize its content and return it (asynchronously)', (done) => {
            const readFileSpy = spyOn(fs, 'readFile').and.callThrough();
            readJsonAsync('./resources/groceries.json')
                .then(result => {
                    expect(readFileSpy).toHaveBeenCalled();
                    expect(result).toEqual(fileContents);
                    done();
                })
                .catch(() => fail(`promise shouldn't be rejected`));
        });

        it(`should throw an error, if the file doesn't exist`, (done) => {
            readJsonAsync('./resources/non-existing-file.json')
                .then(() => fail(`promise shouldn't be resolved`))
                .catch(error => {
                    expect(error.code).toEqual('ENOENT');
                    done();
                });
        });

        it(`should throw an error, if the file contains invalid json`, (done) => {
            readJsonAsync('./resources/invalid-json.json')
                .then(() => fail(`promise shouldn't be resolved`))
                .catch(error => {
                    expect(error.toString()).toContain('JSON');
                    done();
                });
        });
    });

    describe('listDirectoryRecursiveSync()', () => {
        it('should list all files and subdirectories recursively', () => {
            const result = listDirectoryRecursiveSync('./resources');
            expect(result).toEqual([
                {
                    type: 'file',
                    path: './resources/file-to-append-to.txt'
                },
                {
                    type: 'file',
                    path: './resources/groceries.json'
                },
                {
                    type: 'file',
                    path: './resources/invalid-json.json'
                },
                {
                    type: 'directory',
                    path: './resources/subdir1',
                    children: [
                        {
                            type: 'file',
                            path: './resources/subdir1/some-file.txt'
                        },
                        {
                            type: 'directory',
                            path: './resources/subdir1/subdir2',
                            children: [
                                {
                                    type: 'file',
                                    path: './resources/subdir1/subdir2/another-file.txt'
                                }
                            ]
                        }
                    ]
                }
            ]);
        });
    });
});
