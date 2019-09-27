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
       // console.log(total_spend_per_person.top(10));
        // STEP 3b - Stacked Graph begins here
        let total_spend_per_person_by_store_a = name_dim.group().reduceSum(function(d){
          if (d.store == 'A') {
           return +d.spend;
          } else {
           return 0;
          }
        })
        // console.log(total_spend_per_person_by_store_a.top(10));
        let total_spend_per_person_by_store_b = name_dim.group().reduceSum(function(d){
         if (d.store == 'B') {
          return +d.spend;
         } else {
          return 0;
         }
        })
        
        // console.log(total_spend_per_person_by_store_b.top(10));
        
        
        // END 3db


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
                .group(total_spend_per_person);
                
                
        var stackedChart = dc.barChart("#stacked-chart");
        stackedChart
            .width(500)
            .height(500)
            .dimension(name_dim)
            .group(total_spend_per_person_by_store_a, "Store A")
            .stack(total_spend_per_person_by_store_b, "Store B")
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .legend(dc.legend().x(420).y(0).itemHeight(15).gap(5));
        stackedChart.margins().left = 50;
        stackedChart.margins().right = 100;

        
        // STEP 5 - Draw the barchart
        dc.renderAll();
    })
    
