import React from 'react'
import { Modal } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { Clear as CloseIcon } from '@material-ui/icons'
import styles from './styles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import * as modalActions from './../../redux/modal/modalActions'

const ModalCommon = ({open, classes, component, modalActionsProps, title}) => {
    const { hideModal } = modalActionsProps
    return (
        <div>
            <Modal open={open} onClose={hideModal}>
                <div className={classes.modal}>
                    <div className={classes.header}>
                        <span className={classes.title}>{title}</span>
                        <CloseIcon className={classes.icon} onClick={hideModal} />
                    </div>
                    <div className={classes.content}>
                        {component}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

ModalCommon.propTypes = {
    classes: PropTypes.object,
    title: PropTypes.string,
    open: PropTypes.bool,
    component: PropTypes.object,
    modalActionsProps: PropTypes.shape({
        hideModal: PropTypes.func
    })
}
const mapStateToProps = state => {
    return {
        open: state.modal.showModal,
        component: state.modal.component,
        title: state.modal.title
    }
}

const mapDispatchToProps = dispatch => {
    return {
        modalActionsProps: bindActionCreators(modalActions, dispatch)
    }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps)

export default compose(
    withStyles(styles),
    withConnect
)(ModalCommon)
