import React from 'react'
import styles from './styles'
import {withStyles} from '@material-ui/styles'
import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

const SearchBox = ({classes, handleChange}) => {
	return <form className={classes.container} autoComplete="off">
		<TextField className={classes.textField} onChange={handleChange} placeholder="Search..." />
	</form>
}

SearchBox.propTypes = {
	classes: PropTypes.object,
	handleChange: PropTypes.func
}

export default withStyles(styles)(SearchBox)