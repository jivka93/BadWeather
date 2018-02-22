const config = (function(){
    var baseUrl = "http://api.openweathermap.org/data/2.5/";
    const apiKey = "2efb9211ec2c1db3d00ea14c0d24c30d";
    // const isDevEnv = true;

    // if(isDevEnv){
    //     baseUrl = 'http://localhost:1337';
    // }

    return {
        baseUrl,
        apiKey,
        // isDevEnv
    }
})()