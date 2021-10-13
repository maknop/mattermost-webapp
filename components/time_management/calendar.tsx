// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useIntl} from 'react-intl';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {WorkBlock} from 'types/time_management';
import {isBlockStartTimeEqual} from 'utils/time_management/utils';

import Block from './block';
import Hour from './hour';

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
    height: 1200px;
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

const BlockBuffer = styled.div`
    flex: 1;
    max-width: 65px;
`;

const BlockContainer = styled.div`
    flex: 1;
    left: 65px;
    position: relative;
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

const defaultProps = {
    dayStart: min,
    dayEnd: max,
};

const Calendar = (props: Props) => {
    const {date, dayStart, dayEnd, blocks: defaultBlocks} = props;
    const {formatDate} = useIntl();
    const [blocks, setBlocks] = useState(defaultBlocks);

    let workingHours = dayEnd.getHours() - dayStart.getHours();
    if (workingHours <= 0) {
        workingHours = 8;
    }

    const moveBlock = (time: Date, block: WorkBlock) => {
        const blockIndex = blocks.findIndex((b) => block.id === b.id);
        const newBlocks = [...blocks].splice(blockIndex, 1);
        const newBlock = {...block, start: time};
        newBlocks.push(newBlock);
        setBlocks(newBlocks);
    };

    const renderHours = () => {
        const hours = [];
        let cursor = dayStart;
        while (dayEnd.getHours() - cursor.getHours() > 0) {
            hours.push(
                <Hour
                    key={cursor.toDateString()}
                    date={cursor}
                    moveBlock={moveBlock}
                />,
            );
            cursor = moment(cursor).add(1, 'hours').toDate();
        }
        return (
            <BodyContainer>
                <HourContainer>
                    {hours}
                    {blocks.map((block) => (
                        <Block
                            key={block.id}
                            block={block}
                            dayStart={dayStart}
                        />),
                    )}
                </HourContainer>
            </BodyContainer>
        );
    };

    const renderBlocks = () => {
        return (
            <BodyContainer>
                <BlockBuffer/>
                <BlockContainer>
                    {blocks.map((block) => (
                        <Block
                            key={block.id}
                            block={block}
                            dayStart={dayStart}
                        />),
                    )}
                </BlockContainer>
            </BodyContainer>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <CalendarContainer>
                <CalendarTitle>
                    {formatDate(date, {month: 'long', weekday: 'long', day: 'numeric'})}
                </CalendarTitle>
                <Body>
                    {renderHours()}
                </Body>
            </CalendarContainer>
        </DndProvider>
    );
};

Calendar.defaultProps = defaultProps;

export default Calendar;
