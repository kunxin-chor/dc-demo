let transactionsData = [
            {"name": "Tom", "store": "Acme", "state": "NY", "spend": 100},
            {"name": "Tom", "store": "Big Co.", "state": "NY", "spend": 200},
            {"name": "Bob", "store": "Acme", "state": "FL", "spend": 150},
            {"name": "Bob", "store": "Acme", "state": "NY", "spend": 200},
            {"name": "Bob", "store": "Big Co.", "state": "FL", "spend": 50},
            {"name": "Bob", "store": "Big Co.", "state": "NY", "spend": 75},
            {"name": "Alice", "store": "Acme", "state": "FL", "spend": 200},
            {"name": "Alice", "store": "Big Co.", "state": "NY", "spend": 350},
            {"name": "Cindy", "store": "Walmart", "state": "CA", "spend":200}
        ];

// to create the crossfilter and pass it the dataset
let ndx = crossfilter(transactionsData);

// For the name vs total spending chart
let name_dim = ndx.dimension(function(datanum){
    return datanum.name;
});

// only keep data points where spend is >= 100
let spending_dimension_filter = ndx.dimension(dc.pluck('spend'));
spending_dimension_filter.filter(function(d){
    return d>= 100;
})

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


// store vs. spending chart
let store_dim = ndx.dimension(dc.pluck('store'));
let store_group = store_dim.group().reduceSum(dc.pluck('spend'))

dc.barChart("#store-graph")
    .width(300)
    .height(300)
    .dimension(store_dim)
    .group(store_group)
    .x(d3.scale.ordinal())
    .xUnits(dc.units.ordinal)
    .xAxisLabel("Store")
    .yAxis().ticks(4)



dc.renderAll();