/* jshint: es6:true */
const makeLegoBrick = shapeFactory.makeLegoBrick;

const brick22 =makeLegoBrick(csg,2,2,"thick");
const brick24 =makeLegoBrick(csg,2,4,"thick");
const brick42 =brick24.rotate([0,0,0],[0,0,1],90);

const flat68 = makeLegoBrick(csg,6,9,"thin");

const u = 1.6;
const h1 = 2*u;
const h2 = 6*u;
const c = 10*u;

var h= h1;
const row1 = [
    brick22.translate([0,0*0,h]),
    brick24.translate([0,1*c,h]),
    brick24.translate([0,3*c,h]),
    brick24.translate([0,5*c,h]),
    brick24.translate([0,7*c,h]),
    brick24.translate([0,9*c,h]),
    brick42.translate([2*c,11*c,h]),
    brick42.translate([4*c,11*c,h]),
    brick42.translate([6*c,11*c,h]),
    brick42.translate([8*c,11*c,h])
];
h  = h+h2;
const row2 = [
    brick24.translate([0,0*0,h]),
    brick24.translate([0,2*c,h]),
    brick24.translate([0,4*c,h]),
    brick24.translate([0,6*c,h]),
    brick24.translate([0,8*c,h]),
    brick24.translate([0,10*c,h]),
    brick42.translate([3*c,11*c,h]),
    brick42.translate([5*c,11*c,h]),
    brick42.translate([7*c,11*c,h]),
    brick22.translate([7*c,11*c,h]),

];
display(row1);
display(row2);
const col1 = [
    brick22.translate([0,0*0,h+1*h2]),
    brick22.translate([0,0*0,h+2*h2]),
    brick22.translate([0,0*0,h+3*h2]),
    brick22.translate([0,0*0,h+4*h2]),
    brick22.translate([0,0*0,h+5*h2]),
    brick22.translate([0,0*0,h+6*h2]),
    brick22.translate([0,0*0,h+7*h2]),
    brick22.translate([0,0*0,h+8*h2])
];
display(col1);
display(flat68);

