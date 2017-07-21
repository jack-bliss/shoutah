function PostJSON(url, data, dontparse){
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
        xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    });
}

export default PostJSON;