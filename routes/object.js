/* jslint esversion:6 */
const nodeocc  = require("node-occ");
const occ = nodeocc.occ;
const shapeFactory = nodeocc.shapeFactory;
const scriptRunner = nodeocc.scriptRunner;
const fast_occ = nodeocc.fastBuilder.occ;


const fs = require('fs');
const path = require("path");
const fileUtils = require ("file-utils");

const vm = require('vm');
const util = require('util');


function buildResponse(solids,logs) {
    
    let response = { solids: [] , logs: [ ]};
    let counter = 1;
    solids.forEach(function(solid){
        solid.name = "S" + counter;
        counter++;
        try {
            let mesh = occ.buildSolidMesh(solid);
            response.solids.push(mesh);
        }
        catch(err) {
            console.log(" EXCEPTION in MESHING ");
        }
    });
    response.logs = logs;
    return response;
}


exports.buildCSG1 = function(req,res)
{

    var csgFuncScript    = decodeURIComponent(req.body.script);
    var params       = req.body.params;
    var id           = req.body.id;

    var process = new scriptRunner.ScriptRunner({
        csg: fast_occ,
        occ: fast_occ,
        solids: [],
        display: function( objs) {
            if (!(objs instanceof occ.Solid)) {
                objs.forEach(function(o){ process.env.solids.push(o);});
            } else {
                process.env.solids.push(objs);
            }
        },
        shapeFactory: shapeFactory
    });  

    var solidBuilderScript = ""+csgFuncScript+"";

    process.run(solidBuilderScript,
        function done_callback() {
            res.send(buildResponse(process.env.solids,process.env.logs));
            console.log(" All Done");
        },
        function error_callback(err) {
            res.status(501).send("Error building solid : " + err.message + "    " + err.stack);
        }
    );
};


exports.load_cadfile = function(req,res) {


    var filename = path.join(__dirname, "..", req.body.filename);

    function progress(percent) {
       console.log(" -----------------> ", percent);
    }

    console.log(" loading ", filename);

    occ.readSTEP(filename, function (err, solids) {
            if (err) {
                console.log(" readStep has failed", err.message);
                res.status(501).send("Error building solid : " + err.message + "    " + err.stack);
            } else {
                console.log(" readStep has succeeded");
                res.send(buildResponse(solids,[]));
            }
    },progress);



};
