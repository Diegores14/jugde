var judge = require('../judge.js')
var options = require('commander')

options
    .version('1.0.0')
    .usage('[options]')
    .description('jugde problems of a contest that you have.')
    .option('-f --file <pathFile>', 'file\'s path what I will RUN in the judge')
    .option('-p --problem <name>', 'the name problem')
    .option('-l --loadContest <path>', 'path where is inputs and output')
    .option('-j --jugdeFile <pathFile>', 'file with what I will jugde')
    .option('-s --showProblems', 'list names of problems in the contest')
    
options.parse(process.argv)

if (process.argv.length < 3) {
    console.error('The source_dir is required any option `jugde --help`')
    process.exit(1)
}
judge(options)