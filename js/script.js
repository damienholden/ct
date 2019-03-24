window.onload = function(e){ 
    document.getElementById('contentContainer').setAttribute('class', 'container fadeIn animated');
//Start setting things up
getJSONFile();

//Add tooltips
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  //Add event listeners
sortbyFilter();


};



function getJSONFile(){
    var requestURL = 'http://www.cartrawler.com/ctabe/cars.json';
    var request = new XMLHttpRequest();
    try {
        request.open('GET', requestURL);
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var jsonResponse = request.response;
            if (jsonResponse == null || jsonResponse < 1){
                console.log("Could not get information at this time");
                $('#errorBanner').addClass('slideInUp animate');
                $('#errorBanner').css('display', 'block');
                errorBanner
            }
            else{
            //Default is sorted Ascending
            //check the filters
            if(document.getElementById("filterBy").value == "priceAsc")
                var orderedArray = orderbyPriceAsc(jsonResponse);
                else
                var orderedArray = orderbyPriceDesc(jsonResponse);
                createCarBlocks(jsonResponse,orderedArray);
            }
        }
    }
    catch{
        $('#errorBanner').addClass('slideInUp animate');
        $('#errorBanner').css('display', 'block');
    }
  }

function orderbyPriceAsc(jsonResponse){
    var vendors = jsonResponse[0].VehAvailRSCore['VehVendorAvails'];
    var cars= [];
    for (var i = 0; i < vendors.length; i++) { 
        //go through the vendors
        var vehiclesAvail = vendors[i].VehAvails;
        for (var k = 0; k < vehiclesAvail.length; k++){
            //add all cards to array
            cars.push(vehiclesAvail[k]);
        }
    }
    //sort the array
    cars.sort(function(a, b){return a.TotalCharge["@RateTotalAmount"]-b.TotalCharge["@RateTotalAmount"]});
    //console.log(cars);
    return cars;
}

function orderbyPriceDesc(jsonResponse){
    var vendors = jsonResponse[0].VehAvailRSCore['VehVendorAvails'];
    var cars= [];
    for (var i = 0; i < vendors.length; i++) { 
        //go through the vendors
        var vehiclesAvail = vendors[i].VehAvails;
        for (var k = 0; k < vehiclesAvail.length; k++){
            //add all cards to array
            cars.push(vehiclesAvail[k]);
        }
    }
    //sort the array
    cars.sort(function(a, b){return a.TotalCharge["@RateTotalAmount"]- b.TotalCharge["@RateTotalAmount"]});
    //console.log(cars);
    
    return cars.reverse();
}

function createCarBlocks(jsonObj, cars) {
    document.getElementById("cars").innerHTML = "";
    var vendors = jsonObj[0].VehAvailRSCore['VehVendorAvails'];
    var searchCredentials = jsonObj[0].VehAvailRSCore['VehRentalCore'];

    //Add the search details
    let dateTime = new Date(searchCredentials["@PickUpDateTime"]);
    document.getElementById('PickUpDate').innerHTML = `<i class="far fa-calendar-alt"></i> ${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
    document.getElementById('PickUpTime').innerHTML = `<i class="far fa-clock"></i> ${dateTime.toLocaleTimeString()}`;
    dateTime = new Date(searchCredentials["@ReturnDateTime"]);
    document.getElementById('DropOffDate').innerHTML = `<i class="far fa-calendar-alt"></i> ${dateTime.getDate()}/${dateTime.getMonth() + 1}/${dateTime.getFullYear()}`;
    document.getElementById('DropOffTime').innerHTML = `<i class="far fa-clock"></i> ${dateTime.toLocaleTimeString()}`;

    document.getElementById('PickUpLocation').innerHTML = `<i class="fas fa-location-arrow"></i> ${searchCredentials.PickUpLocation["@Name"]}`;
    document.getElementById('DropOffLocation').innerHTML = `<i class="fas fa-location-arrow"></i> ${searchCredentials.ReturnLocation["@Name"]}`;

    //Populate search values
    document.getElementById("searchLocation").innerHTML = searchCredentials.PickUpLocation["@Name"];
    document.getElementById("resultsCount").innerHTML = cars.length;

      for (var j = 0; j < cars.length; j++) {
        var individualCar =  `
        <div class="col-lg-12 col-md-12 col-sm-12">
            <div class="card">
                <div class="row">
                    <div class="col-lg-3 col-md-4 col-sm-12">  
                        <h5 class="car-title font-weight-bold">${cars[j].Vehicle.VehMakeModel['@Name']}</h5>
                        <img src="${cars[j].Vehicle.PictureURL}" alt="${cars[j].Vehicle.VehMakeModel['@Name']}" class="card-img-top">
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12 text-center">
                                <i class="fas fa-car-side" data-toggle="tooltip" data-placement="top" title="" data-original-title="Doors: ${cars[j].Vehicle["@DoorCount"]}"></i> : ${cars[j].Vehicle["@DoorCount"]} | 
                                <i class="fas fa-suitcase-rolling" data-toggle="tooltip" data-placement="top" title="" data-original-title="Bags: ${cars[j].Vehicle["@BaggageQuantity"]}"></i> : ${cars[j].Vehicle["@BaggageQuantity"]} | 
                                <i class="fas fa-male" data-toggle="tooltip" data-placement="top" title="" data-original-title="Passengers: ${cars[j].Vehicle["@PassengerQuantity"]}"></i> : ${cars[j].Vehicle["@PassengerQuantity"]}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-12">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-6 col-md-6 col-sm-12">
                                    <h5>Features</h5>
                                        <ul class="list-group">
                                            <li class="list-group-item"><i class="fas fa-snowflake" data-toggle="tooltip" data-placement="top" title="" data-original-title="Air Conditioning: ${cars[j].Vehicle["@AirConditionInd"]}"></i> : ${cars[j].Vehicle["@AirConditionInd"]}</li>
                                            <li class="list-group-item"><i class="fas fa-cog" data-toggle="tooltip" data-placement="top" title="" data-original-title="Transmission: ${cars[j].Vehicle["@TransmissionType"]}"></i> : ${cars[j].Vehicle["@TransmissionType"]}</li>
                                            <li class="list-group-item"><i class="fas fa-gas-pump" data-toggle="tooltip" data-placement="top" title="" data-original-title="Fuel: ${cars[j].Vehicle["@FuelType"]}"></i> : ${cars[j].Vehicle["@FuelType"]}</li>
                                            <li class="list-group-item">Drive Type: ${cars[j].Vehicle["@DriveType"]}</li>
                                        </ul>
                                        
                                </div>
                                <div class="col-lg-6 col-md-6 col-sm-12">
                                <label>Total Amount:</label> <br/>
                                <h4 class="font-weight-bold"> ${new Intl.NumberFormat('ir-IR', { style: 'currency', currency: cars[j].TotalCharge["@CurrencyCode"] }).format(cars[j].TotalCharge["@RateTotalAmount"])}</h4> <br/>
                                <a href="#" onclick="moreInfo()" class="btn btn-primary">More Information</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>`;

        document.getElementById("cars").innerHTML += individualCar;
      }
  }

function sortbyFilter(){
    var filterDropdown = document.getElementById("filterBy");
    filterDropdown.addEventListener("change", function(){
        if (filterDropdown.value == "priceDesc"){
        getJSONFile();
        document.getElementById('cars').setAttribute('class', 'row fadeIn animated');    
        }
        else{
        getJSONFile();
        document.getElementById('cars').setAttribute('class', 'row fadeIn animated');
        }    
        setTimeout(function(){
            $('#cars').removeClass('fadeIn animated');
    }, 1000);
    })
}

function moreInfo(){
    window.location = 'details.html';
}

