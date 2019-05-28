var path = require('path')
var data = require('./data.json')
var fs = require('fs')
var exec = require('child_process').exec
var execSync = require('child_process').execSync

function addContest(_path) {
    console.log(_path)
    if(fs.existsSync(_path)) {
        _path = path.resolve(_path)
        data.contest = _path
        newData = JSON.stringify(data);
        fs.writeFileSync('./data.json', newData, 'utf8')
    } else {
        console.log('No existe este el path del contest')
    }
}

function showProblems() {
    if(data.contest === '') {
        console.log('No hay contest, agrega uno')
    } else {
        fs.readdir(data.contest, (err, files) => {
            if(!err) {
                files.forEach( element => {
                    console.log(element)
                });
            } else {
                console.log('error al leer los problemas')
            }
        })
    }
}

function execution(options) {
    fs.readdir(data.contest + '/' + options.problem + '/input', (err, files) => {
        if(!err) {
            files.forEach( element => {
                cmd = options.file + ' < ' + '\"' + data.contest + '/' + options.problem + '/' + 'input/' + element + '\"' 
                        + ' > /tmp/' + element
                //console.log(cmd)
                exec(cmd, (err, stdout, stderr) => {
                    if(stderr) {
                        console.log('error: ' + stderr)
                    } else {
                        //console.log(stdout)
                        if(!err) {
                            name = path.basename(element)
                            cmd = 'echo \"' + data.contest + '/' + options.problem + '/' + 'output/' + name + '\"' +
                             '\n/tmp/' + element + ' | ' + options.jugdeFile
                            //console.log(cmd)
                            exec(cmd, (err, stdout, stderr) => {
                                if(stderr) {
                                    console.log(stderr)
                                } else {
                                    if(!err) {
                                        console.log(name + ' ' + stdout)
                                    } else {
                                        console.log(err)
                                    }
                                }
                            })    
                        }
                    }
                })
            })            
        } else {
            console.log(err)
        }
    })
}

module.exports = function (options) {
    if(options.loadContest) {
        addContest(options.loadContest)
    }
    options.jugdeFile = options.jugdeFile || './comparator.exe'
    if(options.showProblems) {
        showProblems()
    }
    if(options.file || options.problem) {
        if(options.file && options.problem) {
            execution(options)
        } else {
            console.log('Falta el nombre del problem o el archivo')
        }
    }
}