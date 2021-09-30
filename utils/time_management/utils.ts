// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

export function dateToWorkDateString(date: Date): string {
    return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}
