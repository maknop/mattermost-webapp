// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import React from 'react';
import './carousel.scss';

type Props = {
    direction: any;
    moveSlide: any;
}
export default function BtnCarousel({direction, moveSlide}: Props) {
    const text = direction === 'next' ? 'Next' : 'Previous';
    return (
        <a
            onClick={moveSlide}
            className={`${direction === 'next' ? ' next next-btn' : ' prev previous-btn'}`}
        >
            {direction === 'prev' ? <i className='icon-arrow-back-ios'/> : null}
            {text}
            {direction === 'next' ? <i className='icon-arrow-forward-ios'/> : null}
        </a>
    );
}
