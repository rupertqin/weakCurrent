import _ from 'lodash'
import {Data as createData} from '../data/createData'
import {Data as casesData} from '../data/casesData'
import {Data as docGenerationData} from '../data/docGenerationData'

class Request {
    getCreateData () {
        return createData
    }
    getCasesData () {
        return casesData
    }
    getDocGenerationData (id) {
        return docGenerationData
    }
}


export default new Request

