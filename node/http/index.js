const HttpHelper = require('./lig/HttpHelper');

const http = new HttpHelper();

const settings = {
  0 : {
    method : 'get',
    url : 'http://127.0.0.1:7005/api/work-order/list',
    params : {
      aiforce : 'f2bbfb4a-da3c-47bf-83c0-c0151e0148c1',
      lang : '',
      instance_id : 21,
    },
    headers : {

    }
  },
  1 : {
    method : 'get',
    url : 'url',
    params : {

    },
    headers : {
      'content-type' : 'application/json',
      accept : 'application/json, text/plain, */*',
      'x-aiforce-client' : 'admin',
      'cookie' : {
        innerToken : '4d942c07a0a7a32baaceeaf47c127c42c4b25951',
        aiforce : 'cbac1749-8d31-404c-9e05-6afd7308418f',
        JSESSIONID : '2fe58613-8ad3-41c0-b574-f60c575ad108',
      }
    }
  }
};

const step = 4;



async function test(){
  let res;
  try{
    res = await http[settings[step].method](settings[step].url, settings[step].params, settings[step].headers);
  }catch(e){
    res = e;
  }
      
  console.log(res);
}

test();