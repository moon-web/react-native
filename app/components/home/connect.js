import { connect } from 'react-redux'
import Home from './index'

const mapStateToProps = (state) => {
  const { address } = state.addressReducer;
  return {
    address: address
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)