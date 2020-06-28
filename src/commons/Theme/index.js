import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
	color: {
		primary: '#D32F2F',
		secondary: '#00BCD4',
		error: '#E64A19'
	},
	typoraphy: {
		fontFamily: 'Roboto'
	},
	shape: {
		borderRadius: 4,
		backgroundColor: '#7B1FA2',
		textColor: '#fff',
		border: '#ccc'
	}
})

export default theme