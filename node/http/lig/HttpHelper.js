const request = require('request');
const RequestHelper = require('./RequestHelper');
const ResponseHelper = require('./ResponseHelper');
const fs = require('fs');
const GET = 'get';
const POST = 'post';
const PUT = 'put';
const DELETE = 'delete';

class HttpHelper{
  constructor(data = {}){
    this.method_set = new Set([GET, POST, PUT, DELETE]);
    this.timeout = data.timeout || 300;
    this.gzip = data.gzip || true;
  }

  /**
   * 初始化
   */
  init(){
    this.request = new RequestHelper();
    this.response = new ResponseHelper();
  }

  async get(url, params = {}, headers = {}){
    this.init();
    this.setRequestHeaders(headers);
    this.request.url = this.dealGetUrl(url, params);
    this.request.params = params;
    this.request.method = GET;
    return await this.call();
  }

  async post(url, params = {}, headers = {}){
    this.init();
    this.setRequestHeaders(headers);
    this.request.url = url;
    this.request.params = params;
    this.request.method = POST;
    return await this.call();
  }

  async put(url, params = {}, headers = {}){
    this.init();
    this.setRequestHeaders(headers);
    this.request.url = url;
    this.request.params = params;
    this.request.method = PUT;
    return await this.call();
  }

  async delete(url, params = {}, headers = {}){
    this.init();
    this.setRequestHeaders(headers);
    this.request.url = url;
    this.request.params = params;
    this.request.method = DELETE;
    return await this.call();
  }

  setRequestHeaders(headers, self){
    for(let i in headers){
      // i = i.toLowerCase();
      let header = headers[i];
      if(i.toLowerCase() == 'cookie'){
        header = this.dealRequestCookie(header);
      }
      this.request.setHeader(i, header);
    }
    return this.request;
  }

  async call(){
    let content_type = this.request.getHeader('content-type');
    if(!content_type){
      this.request.setHeader('content-type', 'application/json; charset=utf-8');
      content_type = this.request.getHeader('content-type');
    }
    let options = {
      url : this.request.url,
      method : this.request.method,
      headers : this.request.getHeaders(),
      timeout : this.timeout,
      gzip : this.gzip,
    };
    if(options.method != GET){
      if(content_type.includes('urlencoded')){
        options.body = this.urlencoded(this.request.params);
      }else if(content_type.includes('json')){
        options.body = JSON.stringify(this.request.params);
      }else if(content_type.includes('form-data')){
        options.form = this.request.params;
      }
    }
    this.response.status = false;
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
          if(error){
            this.response.errors = error;
            return reject(this);
          }
          this.response.status = true;
          this.response.statusCode = response.statusCode ? response.statusCode : null;
          this.response.headers = response.headers ? response.headers : {};
          this.dealResponseCookie(this.response.headers);
          if(response.hasOwnProperty('request')){
            this.response.request = {};
            let {uri, method, headers} = response.request;
            if(uri){
              this.response.request.uri = uri;
            }
            if(method){
              this.response.request.method = method;
            }
            if(headers){
              this.response.request.headers = headers;
            }
          }
          this.response.body = this.dealBody(body);
          resolve(this);
        });
    });
  }

  /**
   * 根据response不同的类型做响应体解析
   * @param {*} body 
   */
  dealBody(body){
    let is_json = this.response.getHeader('content-type').toLowerCase().includes('json');
    if(is_json){
      body = JSON.parse(body);
    }
    return body;
  }

  /**
   * 对response对象设置cookie
   * @param {*} headers 
   */
  dealResponseCookie(headers){
    if(!headers.hasOwnProperty('set-cookie')){
      return;
    }
    let cookies = headers['set-cookie'];
    for(let val of cookies){
      let arr = val.split(';');
      let co = arr[0].split('=');
      this.response.cookies[co[0]] = co[1];
    }
    return this;
  }

  /**
   * 转换成urlencoded的格式
   * @param {*} params 
   */
  urlencoded(params){
    let arr = [];
    for(let i in params){
      arr.push(`${i}=${params[i]}`);
    }
    return arr.join('&');
  }

  dealGetUrl(url, params){
    if(Object.keys(params).length == 0) {
      return url;
    }
    if(url.includes('?')){
      url = `${url}&${this.urlencoded(params)}`;
    }else{
      url = `${url}?${this.urlencoded(params)}`;
    }
    return url;
  }

  dealRequestCookie(cookies){
    let arr = [];
    for(let i in cookies){
      let cookie = cookies[i];
      arr.push(`${i}=${cookie}`)
    }
    return arr.join('; ');
  }
}

module.exports = HttpHelper;