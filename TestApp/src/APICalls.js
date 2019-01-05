
class APICalls {

    getVideosList(url,onSuccess,onFailure){
        fetch(url).then(function(response){
            onSuccess(response)
        })
        .catch(error => {
            onFailure(error)
        })
    }    
}

var apiCalls = new APICalls()
export default apiCalls