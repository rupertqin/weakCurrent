import _ from 'lodash'
import {Data as createData} from '../data/createData'
import {Data as casesData} from '../data/casesData'
import {Data as productsData} from '../data/productsData'
import {Data as docGenerationData} from '../data/docGenerationData'

class Request {
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
}


export default new Request

