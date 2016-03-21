import _ from 'lodash'
import {Data as createData} from '../data/createData'
import {Data as casesData} from '../data/casesData'
import {Data as productsData} from '../data/productsData'
import {Data as docGenerationData} from '../data/docGenerationData'

function _get(url, fn) {
    var myRequest = new Request(config.apiPreURL + url)
    fetch(myRequest).then(function(response) { 
        response.json().then(fn)
    })
}

function _post(url, data, fn) {
    var myHeaders = new Headers({
        "Content-Type": "application/json"
    });
    var myRequest = new Request(config.apiPreURL + url)
    fetch(myRequest, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data)
    })
    .then(function(response) { 
        response.json().then(fn)
    })
}

function _2searchObj(params) {
    var arr = []
    for (var k in params) {
        arr.push(k + '=' + params[k])
    } 
    return arr.join('&')
}

class Req {
    getCreateData () {
        return createData
    }
    getCasesData () {
        return casesData
    }
    getProductsData () {
        return productsData
    }
    getDocGenerationData (id) {
        return docGenerationData
    }
    getModule(params, fn) {
        return _get('module?' + _2searchObj(params), fn)
    }
    getParameter(params, fn) {
        return _get('parameter?' + _2searchObj(params), fn)
    }
    getSolutions(params, fn) {
        return _get('solution?' + _2searchObj(params), fn)
    }
    getTemplate(id, fn) {
        return _get(`template/${id}`, fn)
    }
    getPapers(params, fn) {
        return _get('paper?' + _2searchObj(params), fn)
    }
    createPaper(data, fn) {
        return _post('paper', data, fn)
    }
    createSolution(data, fn) {
        return _post('solution', data, fn)
    }
}


export default new Req

