import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppRoute from '../components/app_route.jsx'
import * as CounterActions from '../actions/counter'
import * as GenerationActions from '../actions/generation'

function mapStateToProps(state) {
  return {
    counter: state.counter,
    isSidebarOpen: state.isSidebarOpen
  }
}

function mapDispatchToProps(dispatch) {
    return {
        counter: bindActionCreators(CounterActions, dispatch),
        generation: bindActionCreators(GenerationActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)
