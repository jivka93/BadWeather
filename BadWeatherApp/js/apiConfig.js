const apiConfig = (function() {
    let baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=';
    const apiKey = '&appid=2efb9211ec2c1db3d00ea14c0d24c30d';
    

    return {
        baseUrl: baseUrl,
        key: apiKey
    };
})();
