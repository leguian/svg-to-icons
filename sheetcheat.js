var fs = require('fs');
var path = require('path');

// Return a list of files of the specified fileTypes in the provided dir,
// with the file path relative to the given dir
// dir: path of the directory you want to search the files for
// fileTypes: array of file types you are search files, ex: ['.txt', '.jpg']
function getFilesFromDir(dir, fileTypes) {
    var filesToReturn = [];

    function walkDir(currentPath) {
        var files = fs.readdirSync(currentPath);
        filesToReturn.push('<!doctype html>' +
            '<html lang="en">' +
            '<head><title>CheatSheet</title></head>' +
            '<body>' +
            '<script src="iconify.min.js"></script>' +
            '<script src="testapicons.js"></script>' +
            '<style>body {font-family:sans-serif;margin: 0;padding: 10px 20px;background: #fff;color: #3e4146;}.iconify {width: 2em;height: 2em;line-height: 2em;cursor: pointer;overflow: hidden;margin: auto;}.cell {display: inline-block;margin-bottom: 20px;-webkit-column-count: 5;-moz-column-count: 5;column-count: 5;-webkit-column-gap: 20px;-moz-column-gap: 20px;column-gap: 20px;background: #f7f3f3;line-height: 1;}.cell span {}.cell:hover .iconify {color: #006fdd;}</style>');
        for (var i in files) {
            var curFile = path.join(currentPath, files[i]);

            if (fs.statSync(curFile).isFile() && fileTypes.indexOf(path.extname(curFile)) != -1) {
                filesToReturn.push('<div class="cell"><div class="iconify" data-icon="icon-' + curFile.replace('.svg', '') + '"></div></div>');
            } else if (fs.statSync(curFile).isDirectory()) {
                walkDir(curFile);
            }
        }
        filesToReturn.push('</body>' +
            '</html>');
    }

    walkDir(dir);
    return filesToReturn.join('\n').replace(/svg\\/g, '');
}

let listOfIcons = getFilesFromDir("svg", [".svg"]);

fs.writeFile('dist/listOfIcons.html', listOfIcons, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('File saved!');
});


