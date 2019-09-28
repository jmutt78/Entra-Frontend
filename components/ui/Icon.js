import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

class Icon extends React.Component {
  render() {
    const { classes, src, onClick, className } = this.props;
    const finalClassName = `${classes.icon} ${className || ''}`;
    return <img onClick={onClick} src={src} className={finalClassName} />;
  }
}

export default withStyles(styles)(Icon);
