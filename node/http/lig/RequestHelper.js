


class RequestHelper{
    constructor(data = {}){
        this.url = '';
        this.method = null;
        // this.uri = {
        //     protocol : '',
        //     host : '',
        //     port : '',
        //     hostname : '',
        // },
        this.headers = {};
        this.cookies = {};
        if(data.headers){
            this.headers = Object.assign({}, data.headers);
        }
        if(data.cookies){
            this.cookies = Object.assign({}, data.cookies);
        }
    }

    setHeader(k, v){
        this.headers[k] = v;
    }

    getHeader(k){
        if(this.headers.hasOwnProperty(k)){
            return this.headers[k];
        }
        return false;
    }

    getHeaders(){
        return this.headers;
    }
}

module.exports = RequestHelper;