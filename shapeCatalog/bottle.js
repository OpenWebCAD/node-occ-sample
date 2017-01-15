function makeBottle()
{
    return shapeFactory.makeBottle(csg,{
        height: 100,
        filletRadius: 5
    });
}

display(makeBottle());

