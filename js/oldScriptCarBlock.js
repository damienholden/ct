

        
        //Individual car blocks
        /*document.getElementById("cars").innerHTML += '<div class="col-lg-12 col-md-12 col-sm-12"><div class="card mb-4 shadow-sm"><div class="row"><div class="col-lg-4 col-md-4 col-sm-12"> <img class="card-img-top" src="' + vehiclesAvail[j].Vehicle.PictureURL + '" alt="Card image cap"></div><div class="col-lg-8 col-md-8 col-sm-12"> <div class="card-body"><div class="row"> <div class="col-lg-6 col-md-6 col-sm-12"><p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p></div> <div class="col-lg-6 col-md-6 col-sm-12"><a href="#" class="btn btn-primary">Go somewhere</a></div></div></div></div>';*/
        
        /*
        <div class='col-lg-12 col-md-12 col-sm-12'>
                                <div class='card mb-4 shadow-sm'>
                                    <div class='row'>
                                        <div class='col-lg-4 col-md-4 col-sm-12'>
                                            <img class='card-img-top' src='
                                             alt='Card image cap'>
                                        </div>
                                        <div class='col-lg-8 col-md-8 col-sm-12'>
                                            <div class='card-body'>
                                                <h5 class='card-title'>car name</h5>
                                                <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>
                                                <a href="#" class="btn btn-primary">Go somewhere</a>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>

        
        */

        var outerDiv = document.createElement('div');
        outerDiv.setAttribute("class", "col-lg-12 col-md-12 col-sm-12");
        
        var cardContainer = document.createElement('div');
        cardContainer.setAttribute("class", "card");
        
        var row = document.createElement('div');
        row.setAttribute("class","row")

        var imgBlock = document.createElement('div');
        imgBlock.setAttribute("class","col-lg-3 col-md-4 col-sm-12")

        var cardImg = document.createElement('img');
        cardImg.src = vehiclesAvail[j].Vehicle.PictureURL;
        cardImg.alt = vehiclesAvail[j].Vehicle.VehMakeModel['@Name'];
        cardImg.setAttribute("class","card-img-top")
        
        var carMainDetailsRow = document.createElement('div');
        carMainDetailsRow.setAttribute('class', 'row');

        var carMainDetailsCol = document.createElement('div');
        carMainDetailsCol.setAttribute('class', 'col-lg-12 col-md-12 col-sm-12 text-center');
        carMainDetailsCol.innerHTML = "<i class='fas fa-car-side' data-toggle='tooltip' data-placement='top' title='Doors: "+vehiclesAvail[j].Vehicle["@DoorCount"] + "'></i> : " + vehiclesAvail[j].Vehicle["@DoorCount"] + " | " + "<i class='fas fa-suitcase-rolling' data-toggle='tooltip' data-placement='top' title='Bags: "+ vehiclesAvail[j].Vehicle["@BaggageQuantity"] +"'></i> : " + vehiclesAvail[j].Vehicle["@BaggageQuantity"] + " | " + "<i class='fas fa-male' data-toggle='tooltip' data-placement='top' title='Passengers: "+ vehiclesAvail[j].Vehicle["@PassengerQuantity"] +"'></i> : " + vehiclesAvail[j].Vehicle["@PassengerQuantity"];

        carMainDetailsRow.append(carMainDetailsCol);
     

        var carDetails = document.createElement('div');
        carDetails.setAttribute("class","col-lg-8 col-md-8 col-sm-12")

        var cardBody = document.createElement('div');
        cardBody.setAttribute("class", "card-body");
        
        var cardTitle = document.createElement('h5');
        cardTitle.setAttribute("class", "car-title");
        cardTitle.innerHTML = vehiclesAvail[j].Vehicle.VehMakeModel['@Name'];
        
        
        var cardInformationBody = document.createElement('div');
        cardInformationBody.setAttribute("class", "row");
        var carInformationColLeft = document.createElement('div');
        carInformationColLeft.setAttribute("class", "col-lg-6 col-md-6 col-sm-12");
        var featuresTitle = document.createElement('h5');
        featuresTitle.innerHTML = "Features";
        //carInformationColLeft.innerHTML = "This is left";
        
        carInformationColLeft.append(featuresTitle)

        // Start Car Features
        var colLeftUl = document.createElement('ul'); 
    
            var colLeftLi = document.createElement('li'); 
            colLeftLi.innerHTML = "<i class='fas fa-snowflake' data-toggle='tooltip' data-placement='top' title='Air Conditioning: "+ vehiclesAvail[j].Vehicle["@AirConditionInd"] +"'></i> : " + vehiclesAvail[j].Vehicle["@AirConditionInd"];
            colLeftUl.append(colLeftLi);
            var colLeftLi = document.createElement('li');
            colLeftLi.innerHTML = "<i class='fas fa-cog' data-toggle='tooltip' data-placement='top' title='Transmission: "+ vehiclesAvail[j].Vehicle["@TransmissionType"] +"'></i> : " + vehiclesAvail[j].Vehicle["@TransmissionType"];
            colLeftUl.append(colLeftLi);
            var colLeftLi = document.createElement('li');
            colLeftLi.innerHTML = "<i class='fas fa-gas-pump' data-toggle='tooltip' data-placement='top' title='Fuel: "+ vehiclesAvail[j].Vehicle["@FuelType"] +"'></i> : " + vehiclesAvail[j].Vehicle["@FuelType"];
            colLeftUl.append(colLeftLi);
            var colLeftLi = document.createElement('li');
            colLeftLi.innerHTML = "Drive Type: " + vehiclesAvail[j].Vehicle["@DriveType"];
            colLeftUl.append(colLeftLi);


            carInformationColLeft.append(colLeftUl);
        // End Car Features

        // Start Price
        var carInformationColRight = document.createElement('div');
        carInformationColRight.setAttribute("class", "col-lg-6 col-md-6 col-sm-12");
        let totalAmount = vehiclesAvail[j].TotalCharge["@RateTotalAmount"];
        
 




        var cardButton = document.createElement('a');
        cardButton.href = "#";
        cardButton.setAttribute("class", "btn btn-primary");
        cardButton.innerHTML = "View";
        

/*** Build the blocks ***/
        imgBlock.append(cardTitle);
        imgBlock.append(cardImg);
        imgBlock.append(carMainDetailsRow);

        //carInformationColRight.append(cardButton);

        cardInformationBody.append(carInformationColLeft);
        cardInformationBody.append(carInformationColRight);
        cardBody.append(cardInformationBody);
        cardBody.append(cardButton);
        carDetails.append(cardBody);

        row.append(imgBlock);
        row.append(carDetails);
        //cardDetails.append(imgBlock);
        //cardDetails.append(cardBody);
        cardContainer.append(row);

        outerDiv.append(cardContainer);      
        //document.getElementById("cars").append(outerDiv);
        

       /** Rewrite the car block ** */
      // carInformationColRight.innerHTML = `Total Amount: ${totalAmount}`;
      