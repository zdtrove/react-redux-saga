import React from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles'
import TaskBoard from '../Taskboard'
import theme from './../../commons/Theme'
import { Provider } from 'react-redux'
import store from './../../redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalLoading from '../../components/GlobalLoading'

const App = props => {
  	return (
	    <Provider store={store}>
	    	<ThemeProvider theme={theme}>
	    		<ToastContainer />
	    		<GlobalLoading />
		    	<TaskBoard />
		    </ThemeProvider>
	    </Provider>
  	);
}

export default withStyles(styles)(App)
