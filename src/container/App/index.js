import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import TaskBoard from '../Taskboard'
import theme from './../../commons/Theme'
import { Provider } from 'react-redux'
import store from './../../redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import GlobalLoading from '../../components/GlobalLoading'
import ModalCommon from '../../components/Modal'

const App = () => {
  	return (
	    <Provider store={store}>
	    	<ThemeProvider theme={theme}>
	    		<ToastContainer />
				<ModalCommon />
	    		<GlobalLoading />
		    	<TaskBoard />
		    </ThemeProvider>
	    </Provider>
  	);
}

export default App
