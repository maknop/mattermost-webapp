// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {combineReducers} from 'redux';

import TimeManagementTypes from 'utils/time_management/action_types';
import {dateToWorkDateString} from 'utils/time_management/utils';
import {WorkItem} from 'types/time_management';

import {UserTypes} from 'mattermost-redux/action_types';
import {GenericAction} from 'mattermost-redux/types/actions';
import {Dictionary} from 'mattermost-redux/types/utilities';

const testWorkItemsByDay = {
    [dateToWorkDateString(new Date())]: [
        {
            title: 'Morning systems check',
            time: 30,
        },
        {
            title: 'Visit Mons Olympus',
            time: 120,
        },
        {
            title: 'Eat a uranium isotope for lunch',
            time: 60,
        },
        {
            title: 'Take some dirt samples',
            time: 120,
        },
        {
            title: 'Feel lonely',
            time: 30,
        },
        {
            title: 'Eat another uranium isotope for dinner',
            time: 30,
        },
        {
            title: 'Systems shut down for the night',
            time: 30,
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

export function workItemsByDay(state: Dictionary<WorkItem[]> = testWorkItemsByDay, action: GenericAction) {
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
    workItemsByDay,
    unscheduledWorkItems,
});
