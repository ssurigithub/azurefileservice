var fs = require('fs')
var path = require('path')
var storage = require('azure-storage');

const connection_string = "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName=mystorageaccount16827;AccountKey=ToNRgZS6Y9XBoQW9Ej7pbKZiepeaNDDWfL32dkVzG0I2Cwg42iaOG+TqNrXbm+b0iEAi5CsztBxfxggogTduUQ==";

const fileService = storage.createFileService(connection_string);

const file_share = "aci-share-demo";

// get the list of files from the file share
fileService.listFilesAndDirectoriesSegmented(file_share,"",null,(err, result) => {
    if(err) {
        console.log(err.message);
        throw err;
    }
    else{
        var files = result.entries.files;
        console.log(files);
        if(files){
            // lets pick a file by file name
            files.forEach(file => {
                getFileContent(file_share,"",file.name);

            console.log(`the file name is ${file.name}`);    
            });
            
            // console.log(`the file content is ${fileContent}`);
            // console.log(`the file name is ${files[0].name}`);
            // console.log(`the file name is ${files[0].name}`);
        }
    }
});

function getFileContent(share, directory, file){
    fileService.getFileToText(share,directory,file, (err, result) => {
        if(err){
            console.log(err.message);
            throw err;
        }
        console.log(result);
    });
}
