import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AppRoute from '../components/app_route.jsx'
import * as CounterActions from '../actions/counter'
import * as GenerationActions from '../actions/generation'
import * as LoadingActions from '../actions/loading'

function mapStateToProps(state) {
  return {
    counter: state.counter,
    isSidebarOpen: state.isSidebarOpen,
    isLoading: state.loading
  }
}

function mapDispatchToProps(dispatch) {
    return {
        counter: bindActionCreators(CounterActions, dispatch),
        generation: bindActionCreators(GenerationActions, dispatch),
        loading: bindActionCreators(LoadingActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute)
