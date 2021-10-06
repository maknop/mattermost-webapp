// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import TimeManagementTypes from 'utils/time_management/action_types';
import {dateToWorkDateString} from 'utils/time_management/utils';
import {WorkItem} from 'types/time_management';

import {UserTypes} from 'mattermost-redux/action_types';
import {GenericAction} from 'mattermost-redux/types/actions';
import {Dictionary} from 'mattermost-redux/types/utilities';

const today = new Date();
const getTodayAtHour = (hour: number, min = 0) => {
    const newDate = new Date(today);
    newDate.setHours(hour, min, 0, 0);
    return newDate;
};

const testWorkItemsByDay = {
    [dateToWorkDateString(new Date())]: [
        {
            start: getTodayAtHour(9),
            queue: [{
                title: 'Morning systems check',
                time: 30,
            }],
        },
        {
            start: getTodayAtHour(10),
            queue: [{
                title: 'Visit Mons Olympus',
                time: 120,
            }],
        },
        {
            start: getTodayAtHour(12),
            queue: [{
                title: 'Eat a uranium isotope for lunch',
                time: 60,
            }],
        },
        {
            start: getTodayAtHour(14, 30),
            queue: [{
                title: 'Take some dirt samples',
                time: 120,
            }],
        },
        {
            start: getTodayAtHour(16, 30),
            queue: [{
                title: 'Feel lonely',
                time: 30,
            }],
        },
    ],
};

const testUnscheduledWorkItems = [
    {
        title: 'Charge via solar panels',
        time: 60,
    },
    {
        title: 'Call home base at Houston',
        time: 60,
    },
];

export function workBlocksByDay(state: Dictionary<WorkBlock[]> = testWorkItemsByDay, action: GenericAction) {
    switch (action.type) {
    case TimeManagementTypes.RECEIVED_WORK_ITEM: {
        const date = action.date as Date;
        if (!date) {
            return state;
        }
        const stringDate = dateToWorkDateString(date);
        const task = action.task as WorkItem;

        const day = [...state[stringDate]] || [];
        day.push(task);

        return {...state, [stringDate]: day};
    }
    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}

export function unscheduledWorkItems(state: WorkItem[] = testUnscheduledWorkItems, action: GenericAction) {
    switch (action.type) {
    case TimeManagementTypes.RECEIVED_WORK_ITEM: {
        const date = action.date;
        if (date) {
            return state;
        }
        const task = action.task as WorkItem;
        return [...state, task];
    }
    case UserTypes.LOGOUT_SUCCESS:
        return {};
    default:
        return state;
    }
}

export default combineReducers({
    workBlocksByDay,
    unscheduledWorkItems,
});
