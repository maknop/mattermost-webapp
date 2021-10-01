// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {GenericAction} from 'mattermost-redux/types/actions';
import TimeManagementTypes from 'utils/time_management/action_types';

export function queueWorkItem(text: string, minutes: number, date: Date): GenericAction {
    return {
        type: TimeManagementTypes.RECEIVED_WORK_ITEM,
        task: {
            title: text,
            time: minutes,
        },
        date,
    };
}
