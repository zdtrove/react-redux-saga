import React from 'react'
import styles from './styles'
import { withStyles } from '@material-ui/styles'
import LoadingIcon from './../../assets/images/loading.gif'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

const GlobalLoading = ({classes, showLoading}) => {
	let xhtml = null
	if (showLoading) {
		xhtml = (
			<div className={classes.globalLoading}>
				<img className={classes.icon} src={LoadingIcon} alt="loading" />
			</div>
		)
	}
	return xhtml
}

GlobalLoading.propTypes = {
	classes: PropTypes.object,
	showLoading: PropTypes.bool
}

const mapStateToProps = state => {
	return {
		showLoading: state.ui.showLoading
	}
}

const withConnect = connect(mapStateToProps)

export default compose(
	withStyles(styles),
	withConnect
)(GlobalLoading)