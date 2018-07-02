if ('serviceWorker' in navigator) {
    
      navigator.serviceWorker
        .register('./sw.js', { scope: './' })
        .then((registration) => {
          console.log("Yaaay! Service Worker registered");
    
          if (registration.waiting) {
            registration.waiting.postMessage({action: 'skipWaiting'});
          }
        })
        .catch((err) => {
          console.log("Could not register Service Worker", err);
        })
    
}


            /**
             * Description : App functions
             * @author : Ibrahim Isa | Inteliworx Technologies
             * @version : V0.1
             */
            // Show an element
            var show = function (elem) {
              elem.style.display = 'block';
          };

          // Hide an element
          var hide = function (elem) {
              elem.style.display = 'none';
          };

           /**
            * Populate select option
            */
           function getCurrency()
           {
              const url = 'https://free.currencyconverterapi.com/api/v5/currencies';

              const load = document.getElementById('loading');

              fetch(url)
              .then(function(response) {
                  return response.json();
              })
              .then(function(myJson) {
                  
                  let selectFrom = document.getElementById('select_from');
                  let selectTo = document.getElementById('select_to');
                  
                  for(let item in myJson.results) 
                  {
                      let obj = myJson.results[item];
                      let option1 = document.createElement('option');
                      let option2 = document.createElement('option');
                      option1.text = `${obj.currencyName} (${obj.currencySymbol || obj.id})`;
                      option2.text = `${obj.currencyName} (${obj.currencySymbol || obj.id})`;
                      option1.value = obj.id;
                      option2.value = obj.id;
                      selectFrom.add(option1);
                      selectTo.add(option2);
                  }

                  hide(load);

              }).catch(function(error) {
                  console.log(error);
              });
           }

           /**
            * Currency Conversion
            */
          let button = document.getElementById('btn');

          button.addEventListener('click', function(event){
              let selectFrom = document.getElementById('select_from').value;
              let selectTo = document.getElementById('select_to').value;    
              const load = document.getElementById('loading');
              const unit = `${selectFrom}_${selectTo}`;
              const url =  `https://free.currencyconverterapi.com/api/v5/convert?q=${unit}&compact=y`;
              // Show loader
              show(load);
              fetch(url)
              .then(function(response) {
                  return response.json();
              })
              .then(function(myJson) {
                  let amount = document.getElementById('amount');
                  let conversion = document.getElementById('conversion')
                  let rate = document.getElementById('rate');
                  let rateVal = myJson[unit].val;
                  let calculate = rateVal * amount.value;
                  console.log(calculate);
                  conversion.value = calculate;
                  rate.value = rateVal;
                  // Hide loader
                  hide(load);
              })
          });

           // List of currencies,
           getCurrency();