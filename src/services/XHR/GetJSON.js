function GetJSON(url, dontparse){
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', data => {
            var response = data.target.response;
            if(dontparse === true){
                return resolve(response);
            } else {
                return resolve(JSON.parse(response));
            }
        });
        xhr.open('GET', url);
        xhr.send();
    });
}

export default GetJSON;