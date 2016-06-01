var fs = require('fs');
var checkUrl = require('nodejs_session_4');
var EventEmitter = require('events');


module.exports = {
    process: function(fileName){

        /*
         var ourObject = checkUrl.parseURL('http://www.node.org/docs/index.html');
         console.log(ourObject);
         */
        /*
        var obj = fs.readFileSync(fileName, 'utf8');
        console.log(obj);
        */

        var rr = fs.createReadStream(fileName, 'utf8');
        var myEventEmitter = new EventEmitter();
        var data = '';

        myEventEmitter.emit('start');

        rr.on('data', function(chunk) {
            data+=chunk; // add all lines in the files
            console.log('got bytes of data', chunk.length);
        });

        rr.on('error', function(chunk) {
            myEventEmitter.emit('error');
        });

        rr.on('readable', function(){
            console.log('readable:', rr.read());
        });
        rr.on('end', function(){
            console.log('end');
            console.log(data);

            // take data string, split each line
            var allOurData = data.split(/\r?\n/); // split lines
            for(var i = 0; i < allOurData.length; i++){ // run on each line and run the parseURL on it
                console.log("our data is: " + allOurData[i]);
                var printResult = checkUrl.parseURL(allOurData[i].toString());
                if(printResult != null){
                    myEventEmitter.emit("data",printResult);
                }else{
                    myEventEmitter.emit("data-error","Error on line: " + i);
                    console.log("data-error","Error on line: " + (i+1));
                }
                console.log(printResult);
            }

            myEventEmitter.emit("end");

        });

        return myEventEmitter;


    }
};







