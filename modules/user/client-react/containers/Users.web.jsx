import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { compose } from 'react-apollo';
import { translate } from '@gqlapp/i18n-client-react';
import { Button, PageLayout } from '@gqlapp/look-client-react';

import settings from '../../../../settings';
import UsersFilterView from '../components/UsersFilterView';
import UsersListView from '../components/UsersListView';
import withSubscription from './withSubscription';
import {
  withFilterUpdating,
  withOrderByUpdating,
  withUsers,
  withUsersDeleting,
  withUsersState,
  updateUsersState
} from './UserOperations';

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    const { usersUpdated, updateQuery } = this.props;
    if (usersUpdated) {
      updateUsersState(usersUpdated, updateQuery);
    }
  }

  renderMetaData() {
    return (
      <Helmet
        title={`${settings.app.name} - ${this.props.t('users.title')}`}
        meta={[
          {
            name: 'description',
            content: `${settings.app.name} - ${this.props.t('users.meta')}`
          }
        ]}
      />
    );
  }

  render() {
    return (
      <PageLayout>
        {this.renderMetaData()}
        <h2>{this.props.t('users.list.title')}</h2>
        <Link to="/users/new">
          <Button color="primary">{this.props.t('users.btn.add')}</Button>
        </Link>
        <hr />
        <UsersFilterView {...this.props} />
        <hr />
        <UsersListView {...this.props} />
      </PageLayout>
    );
  }
}

Users.propTypes = {
  usersUpdated: PropTypes.object,
  updateQuery: PropTypes.func,
  t: PropTypes.func
};

export default compose(
  withUsersState,
  withUsers,
  withUsersDeleting,
  withOrderByUpdating,
  withFilterUpdating,
  withSubscription
)(translate('user')(Users));
