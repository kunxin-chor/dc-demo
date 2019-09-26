let transactionsData = [
            {"name": "Tom", "store": "Acme", "state": "NY", "spend": 100},
            {"name": "Tom", "store": "Big Co.", "state": "NY", "spend": 200},
            {"name": "Bob", "store": "Acme", "state": "FL", "spend": 150},
            {"name": "Bob", "store": "Acme", "state": "NY", "spend": 200},
            {"name": "Bob", "store": "Big Co.", "state": "FL", "spend": 50},
            {"name": "Bob", "store": "Big Co.", "state": "NY", "spend": 75},
            {"name": "Alice", "store": "Acme", "state": "FL", "spend": 200},
            {"name": "Alice", "store": "Big Co.", "state": "NY", "spend": 350},
        ];

let ndx = crossfilter(transactionsData);
let name_dim = ndx.dimension(function(datanum){
    return datanum.name;
});
let total_spend_per_person = name_dim.group().reduceSum(function(datanum){
    return datanum.spend;
});

/* global dc */
dc.barChart("#graph")
.width(300)
.height(300)
.dimension(name_dim)
.group(total_spend_per_person)
.x(d3.scale.ordinal())
.xUnits(dc.units.ordinal)
.xAxisLabel("Person")
.yAxis().ticks(4)

dc.renderAll();