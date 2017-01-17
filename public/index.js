'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];


//Exercice 1 - Euro Kilometers, rental prices
//rental price = time + distance
//time component: the number of rental days multiplied by the car's price per day
//distance component: the number of kilometers multiplied by the car's price per km
function rental_prices()
{
  var rDate;
  var pDate;
  var time;
  var distance=[];
  var carPricePerDay;
  var carPricePerKm;
  for(var i=0; i<rentals.length;i++)
  {
    distance[i]=rentals[i].distance;
    rDate=new Date(rentals[i].returnDate).getTime();
    pDate=new Date(rentals[i].pickupDate).getTime();
    time=(rDate-pDate);
    time = (((time/1000)/3600)/24)+1;
    for(var j=0;j<cars.length;j++)
    {
      if(rentals[i].carId==cars[j].id)
      {
        carPricePerDay=cars[j].pricePerDay;
        carPricePerKm=cars[j].pricePerKm;
        rentals[i].price= time*carPricePerDay + distance[i]*carPricePerKm;
        console.log(rentals[i].price)
      }
    }
  }
}


//Exercice 2 - Drive more, pay less , Decreasing pricing for longer rentals
function rental_prices2()
{
  var rDate;
  var pDate;
  var time;
  var distance=[];
  var carPricePerDay;
  var carPricePerKm;
  for(var i=0; i<rentals.length;i++)
  {
    distance[i]=rentals[i].distance;
    rDate=new Date(rentals[i].returnDate).getTime();
    pDate=new Date(rentals[i].pickupDate).getTime();
    time=(rDate-pDate);
    time = (((time/1000)/3600)/24)+1;
      for(var j=0;j<cars.length;j++)
      {
         if(rentals[i].carId==cars[j].id)
        {
          carPricePerDay=cars[j].pricePerDay;
          carPricePerKm=cars[j].pricePerKm;
          rentals[i].price= time*carPricePerDay + distance[i]*carPricePerKm;
          //price per day decreases by 10% after 1 day
          if(time>1 && time<=4)
          {
            rentals[i].price=rentals[i].price*0.9;
          }
          //price per day decreases by 30% after 4 days
          else if(time>4 && time<=10)
          {
            rentals[i].price=rentals[i].price*0.7;
          }
          //price per day decreases by 50% after 10 days
          else if(time>10)
          {
            rentals[i].price=rentals[i].price*0.5;
          }
        }
      }
      console.log(rentals[i].price);
  }
}
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
