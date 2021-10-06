// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useIntl} from 'react-intl';

import {WorkBlock} from 'types/time_management';

const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0px 10px;
    padding: 24px;
    background-color: #FFFFFF;
    border-radius: 8px;
`;

const CalendarTitle = styled.div`
    font-family: Metropolis;
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 20px;
    font-weight: 600;
`;

const Body = styled.div`
    display: flex;
    width: 900px;
    height: 2000px;
    flex-direction: column;
    position: relative;
`;

const BodyContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const HourContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const HourRow = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    align-self: flex-start;
    max-height: 120px;
    width: 100%;
`;

const Hour = styled.div`
    flex: 1;
    max-width: 65px;
    margin-top: -11px;
`;

const HourContent = styled.div`
    flex: 1;
    border-top: 1px solid rgba(61, 60, 64, 0.16);;
`;

const BlockBuffer = styled.div`
    flex: 1;
    max-width: 65px;
`;

const BlockContainer = styled.div`
    flex: 1;
    position: relative;
`;

const Block = styled.div`
    background: linear-gradient(0deg, rgba(63, 67, 80, 0.04), rgba(63, 67, 80, 0.04)), #FFFFFF;
    border: 1px solid rgba(61, 60, 64, 0.16) !important;
    box-sizing: border-box;
    box-shadow: 0px 6px 14px rgba(0, 0, 0, 0.12);
    border-radius: 4px;

    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #3D3C40;

    margin-left: 10px;
    margin-top: 2px;
`;

type Props = {
    date: Date;
    blocks: WorkBlock[];
    dayStart: Date;
    dayEnd: Date;
}

const min = new Date();
min.setHours(8, 0, 0, 0);

const max = new Date();
max.setHours(19, 0, 0, 0);

const pixelPerMinute = 2;

const defaultProps = {
    dayStart: min,
    dayEnd: max,
};

const Calendar = (props: Props) => {
    const {date, dayStart, dayEnd, blocks} = props;
    const {formatDate} = useIntl();

    let workingHours = dayEnd.getHours() - dayStart.getHours();
    if (workingHours <= 0) {
        workingHours = 8;
    }

    const renderHours = () => {
        const hours = [];
        let cursor = dayStart;
        while (dayEnd.getHours() - cursor.getHours() > 0) {
            hours.push(
                <HourRow>
                    <Hour>
                        {moment(cursor).format('h:00a')}
                    </Hour>
                    <HourContent/>
                </HourRow>,
            );
            cursor = moment(cursor).add(1, 'hours').toDate();
        }
        return (
            <BodyContainer>
                <HourContainer>
                    {hours}
                </HourContainer>
            </BodyContainer>
        );
    };

    const renderBlocks = () => {
        return (
            <BodyContainer>
                <BlockBuffer/>
                <BlockContainer>
                    {blocks.map((block) => {
                        const totalMinutes = block.queue.reduce((a, b) => a + b.time, 0);
                        const minutesFromDayStart = moment(block.start).diff(dayStart, 'minutes');
                        return (
                            <Block
                                key={`block_${block.start.toDateString()}`}
                                style={{
                                    top: `${pixelPerMinute * minutesFromDayStart}px`,
                                    height: `${(pixelPerMinute * totalMinutes) - 4}px`,
                                }}
                            />
                        );
                    })}
                </BlockContainer>
            </BodyContainer>
        );
    };

    return (
        <CalendarContainer>
            <CalendarTitle>
                {formatDate(date, {month: 'long', weekday: 'long', day: 'numeric'})}
            </CalendarTitle>
            <Body>
                {renderHours()}
                {renderBlocks()}
            </Body>
        </CalendarContainer>
    );
};

Calendar.defaultProps = defaultProps;

export default Calendar;
