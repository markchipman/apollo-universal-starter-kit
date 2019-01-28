import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';

import { Button } from '@gqlapp/look-client-react';
import { translate } from '@gqlapp/i18n-client-react';
import query from '../../../graphql/PDF.graphql';
import { downloadFile, getObjectURLFromArray } from '../../../common';

class DownloadReport extends Component {
  static propTypes = {
    client: PropTypes.object.isRequired,
    t: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.donwload = this.donwload.bind(this);
  }

  async donwload() {
    const { client } = this.props;
    const { data } = await client.query({
      query
    });
    const url = getObjectURLFromArray(data.pdf);
    downloadFile(url, 'Report.pdf');
  }

  render() {
    const { t } = this.props;
    return (
      <Button style={{ marginLeft: '10px' }} onClick={this.donwload}>
        {t('downloadPDF')}
      </Button>
    );
  }
}

export default translate('PdfReport')(withApollo(DownloadReport));