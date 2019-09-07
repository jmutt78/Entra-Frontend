import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class LinkedIn extends Component {
  static propTypes = {
    className: PropTypes.string,
    onFailure: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    clientId: PropTypes.string.isRequired,
    redirectUri: PropTypes.string.isRequired,
    renderElement: PropTypes.func
  };

  getUrl = () => {
    const {
      redirectUri,
      clientId,
      state,
      scope,
      supportIE,
      redirectPath
    } = this.props;
    // TODO: Support IE 11
    const scopeParam = scope
      ? `&scope=${supportIE ? scope : encodeURI(scope)}`
      : '';
    const linkedInAuthenLink = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&scope=r_liteprofile r_emailaddress&client_id=${clientId}&redirect_uri=${redirectUri}${scopeParam}&state=${state}`;
    if (supportIE) {
      const redirectLink = `${
        window.location.origin
      }${redirectPath}?linkedin_redirect_url=${encodeURIComponent(
        linkedInAuthenLink
      )}`;
      return redirectLink;
    }
    return linkedInAuthenLink;
  };

  handleConnectLinkedInClick = e => {
    //window.location.href = this.getUrl();
    console.log(this.getUrl(), this);
  };

  constructor(props) {
    super(props);
    console.log('Linkedin Constructor: ', props);
  }

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <img
          style={{ maxWidth: '90vw' }}
          src="/static/linkedin.png"
          alt="Login with Linkedin"
          onClick={this.handleConnectLinkedInClick}
        />
      </div>
    );
  }
}

LinkedIn.defaultProps = {
  disabled: false,
  state: 'fdsf78fyds7fm',
  supportIE: false,
  redirectPath: '/linkedin'
};
export default LinkedIn;
