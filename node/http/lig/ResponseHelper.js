


class ResponseHelper{
    constructor(data = {}){
        this.status = false;//请求是否成功标志(仅代表请求的动作)
        this.statusCode = null;
        this.headers = {};
        this.cookies = {};
        this.errors = null;
        if(data.headers){
            this.headers = Object.assign({}, data.headers);
        }
        if(data.cookies){
            this.cookies = Object.assign({}, data.cookies);
        }
    }

    setCookie(k, v){
        this.cookies[k] = v;
    }

    getCookie(k){
        if(this.cookies.hasOwnProperty(k)){
            return this.cookies[k];
        }
        return false;
    }

    getCooikes(){
        return this.cookies;
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

module.exports = ResponseHelper;