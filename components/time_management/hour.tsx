// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useRef} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useDrop} from 'react-dnd';

import {DragTypes} from 'utils/time_management/constants';
import {WorkBlock} from 'types/time_management';

const HourRow = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 120px;
    max-height: 120px;
    width: 100%;
`;

const HourTime = styled.div`
    flex: 1;
    max-width: 65px;
    margin-top: -11px;
`;

const HourContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const HalfHourSlot = styled.div`
    border-top: 1px solid rgba(61, 60, 64, 0.16);;
    flex: 1;
    &:hover {
        background-color: green;
    }
`;

type Props = {
    date: Date;
    moveBlock: (time: Date, block: WorkBlock) => void;
}

const Slot = (props: Props) => {
    const {date} = props;
    const ref = useRef(null);

    const [{handlerId}, drop] = useDrop({
        accept: DragTypes.BLOCK,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }

            console.log(item.block);
            console.log(moment(date).format('h:mma'));
        },
    });

    drop(ref);
    return (
        <HalfHourSlot
            ref={ref}
            data-handler-id={handlerId}
        />
    );
};

const Hour = (props: Props) => {
    const {date, moveBlock} = props;

    return (
        <HourRow>
            <HourTime>
                {moment(date).format('h:00a')}
            </HourTime>
            <HourContent>
                <Slot
                    date={date}
                    moveBlock={moveBlock}
                />
                <Slot
                    date={moment(date).add(30, 'minutes').toDate()}
                    moveBlock={moveBlock}
                />
            </HourContent>
        </HourRow>
    );
};

export default Hour;
