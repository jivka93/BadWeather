let variablesConfig = (function() {

    /// Used for checks when spamming same button/searching same city
    let currentCityID = (JSON.parse(sessionStorage.getItem('data')).city.id).toString(); 
    
    return {
        currentCityID: currentCityID
    };
})();
