// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Tooltip} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import CheckmarkIcon from 'components/widgets/icons/checkmark_icon';
import OverlayTrigger from 'components/overlay_trigger';
import Constants from 'utils/constants';

type Props = {
    message: string;
};

const PostTaskIcon = (props: Props) => {
    const {message} = props;
    const handlePress = () => {
        console.log(message);
    };

    return (
        <OverlayTrigger
            className='hidden-xs'
            delayShow={Constants.OVERLAY_TIME_DELAY}
            placement='top'
            overlay={
                <Tooltip
                    id='taskTooltip'
                    className='hidden-xs'
                >
                    <FormattedMessage
                        id='task.add_task'
                        defaultMessage={'Add to tasks'}
                    />
                </Tooltip>
            }
        >
            <button
                className='post-menu__item'
                onClick={handlePress}
            >
                <CheckmarkIcon/>
            </button>
        </OverlayTrigger>
    );
};

export default PostTaskIcon;
