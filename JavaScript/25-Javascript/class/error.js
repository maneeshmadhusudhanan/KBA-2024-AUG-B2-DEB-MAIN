







try{
    // code that might throw an console.error
    let result = riskyoperation();
    console.log(result);
    
}catch(error){
        // code that handle the error

        console.log('an error occured:' + error.message);

    }finally{

            // code that run regardless of an error
            console.log('this will always run!');

        }
    

function riskyoperation(){
    let obj;
    obj.property;  //this will throw an error
}