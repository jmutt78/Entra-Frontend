import React from "react";
import Reset from '../components/auth/Reset'

const ResetForm = props => <Reset resetToken={props.query.resetToken} />

export default ResetForm
