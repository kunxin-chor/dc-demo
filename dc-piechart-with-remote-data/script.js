/* global queue */
queue()
           // file type        // the relative filepath to the .json file
    .defer(d3.json, "data/transactions.json" ) // load in a file
    .await(function(error, transactionData){
       
       // STEP 1 - create a cross filter
       let transactionCrossFilter = crossfilter(transactionData);
       
       // STEP 2 - Define 'name' to be the x axis
       // Creating a dimension based on the 'name' property of each data point
       let name_dim = transactionCrossFilter.dimension(dc.pluck('name'));
        
        // STEP 3 - Do the grouping
        // "Grouping" --> summarizing each data point
        let total_spend_per_person = name_dim.group().reduceSum(dc.pluck('spend'));

        // STEP 4 - Create the barchart
        dc.barChart("#spending-by-person")
                      .width(300)
                      .height(150)
                      .dimension(name_dim)
                      .group(total_spend_per_person)
                      .transitionDuration(250) 
                      .x(d3.scale.ordinal())
                      .xUnits(dc.units.ordinal)
                      .xAxisLabel("Person")
                      .yAxis().ticks(5);
        
          dc.pieChart('#spending-by-person-pie')
                .height(330)
                .radius(90)
                .transitionDuration(1500)
                .dimension(name_dim)
                .group(total_spend_per_person)
                .cap(2);
        
        // STEP 5 - Draw the barchart
        dc.renderAll();
    })
    
/*
How this will look like in Axios
 axios.get('data/transactions.json')
    .then(function(response){
        
    })
*/