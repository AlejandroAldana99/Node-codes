async function firstSuccessfulPromise(promiseArray) {
    // Write your code here
    return await Promise.all(promiseArray.map((item) => {
      return item.then(function(value){
          if(value != 'undefined' || value != null || value != '') {
              return value;
          }
      }).catch(function(rej) {
        console.log('undefined');
      });
    }));
  }
  
  let promise = firstSuccessfulPromise([new Promise((resolve, reject) => reject()), 
                new Promise((resolve, reject) => resolve("Success!"))]);
  promise.then(result => console.log(result));
  
  module.exports.firstSuccessfulPromise = firstSuccessfulPromise;



  async function firstSuccessfulPromise(promiseArray) {
    // Write your code here
    let results = await Promise.all(promiseArray.map((item) => {
      return item.then(function(value){
          if(value !== 'undefined' || value !== null || value !== '') {
              return value;
          }
      }).catch(function(rej) {
        console.log('Erro: Promise reject');
      });
    }));

    results = results.filter(function( element ) {
        return element !== undefined;
    });
    return results;
  }

