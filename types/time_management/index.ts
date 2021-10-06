// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Dictionary} from 'mattermost-redux/types/utilities';

export type WorkItem = {
    title: string;
    time: number;
}

export type WorkBlock = {
    start: Date;
    minTime: number;
    queue: WorkItem[];
};

export type TimeState = {
    time: {
        workBlocksByDay: Dictionary<WorkBlock[]>;
        unscheduledWorkItems: WorkItem[];
    };
};
