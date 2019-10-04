/* global queue */


queue()
    .defer(d3.json, "transactions.json")
    .await(makeGraphs);
    
function makeGraphs(error, data)
{
    let some_data = [
        {
            'name': 'ABC',
            'location': {
                'region': 'Tanglin Halt'
            },
            'sales':45
        },
        {
            'name': 'DEF',
            'location': {
                'region': 'Tanglin Halt'
            },
            'sales':33
        },
        {
            'name': 'AF',
            'location': {
                'region': 'Yishun'
            },
            'sales':33
        }
        
    ]
    
    let flatten = _.map(some_data, function(datanum){
      return {
          'name': datanum.name,
          'region': datanum.location.region,
          'sales': datanum.sales
      }
    });
    
    console.log(flatten)
    
    let stores = [
        {
            'name': 'A',
            'address': 'Market Street Bank of Singapore 01-01'
        },
        {
            'name' : 'B',
            'address': "Plaza Singapura"
        }
    ]
    console.log(stores)
    console.log(data);
    
    let joinedData = _.map(data, function(datanum){
        let s = _.find(stores, function(storeData){
            return storeData.name == datanum.store
        })
        return {
            ...datanum,
            store_name: storeData.name,
            store_address : storeData.address 
        }
    })
    console.log(joinedData);
    
    
    let states = _(data).uniqBy('state')
        .map(function(datanum){
            return datanum.state;
        })
        .value();
    console.log(states);
    
    let names = _.uniqBy(data, 'name');
    names = _.map(names, function(datanum){
        return datanum.name;
    })

    let results = _.map(data, function(datanum){
        let copy = { ...datanum}
        
        if (datanum.state == 'NY') {
            copy.state = 'New York'
        } else if (datanum.state == 'FL') {
            copy.state = 'Florida'
        } else if (datanum.state == 'CA') {
            copy.state = "Califlornia"
        } else if (datanum.state == "TN") {
            copy.state = "Texas"
        } else if (datanum.state == "WI") {
            return "Wisconcin"
        }
        copy.spend = copy.spend * 100;
        return copy;
    })
    
    results = _.filter(results,  function(datanum){
        if (datanum.spend > 10000)
        {
            return true;
        }
        return false;
    });
    
    
    
    
    console.log(results);
    console.log(data);
    
}
/*
function processTwoNumber(x, y, processingFunction)
{
    return processingFunction(x,y)
}

function doSomethingToArray(a, processingFunction)
{
    for (let each_item of a)
    {
        processingFunction(each_item);
    }
}

function add(x, y)
{
    return x+y;
}

function subtract(x,y)
{
    return x-y;
}

function justPrintOut(x,y)
{
    console.log(x);
    console.log(y);
}

function multipyBy10(x)
{
    x = x * 10;
    console.log(x);
}

// console.log(processTwoNumber(3, 10, justPrintOut))
doSomethingToArray([2,4,6,8,10], multipyBy10)
*/