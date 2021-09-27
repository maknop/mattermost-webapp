// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getPost} from 'mattermost-redux/selectors/entities/posts';
import {getPost as getPostAction} from 'mattermost-redux/actions/posts';

import {canDownloadFiles} from 'utils/file_utils.jsx';

import FilePreviewModal from './file_preview_modal';

function mapStateToProps(state, ownProps) {
    const config = getConfig(state);

    return {
        canDownloadFiles: canDownloadFiles(config),
        enablePublicLink: config.EnablePublicLink === 'true',
        pluginFilePreviewComponents: state.plugins.components.FilePreview,
        post: ownProps.post || getPost(state, ownProps.postId),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getPostAction,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FilePreviewModal);
