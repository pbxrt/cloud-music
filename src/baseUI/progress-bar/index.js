import React, {useEffect, useRef, useState } from 'react';
import styled from'styled-components';
import style from '../../assets/global-style';
import { prefixStyle } from './../../api/utils';

const ProgressBarWrapper = styled.div`
    height: 30px;
    .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, .3);
        .progress {
            position: absolute;
            height: 100%;
            background: ${style["theme-color"]};
        }
        .progress-btn-wrapper {
            margin-left: 7px;
            position: absolute;
            left: -15px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn {
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid ${style["border-color"]};
                border-radius: 50%;
                background: ${style["theme-color"]};
            }
    }
  }
`

function ProgressBar(props) {
    const progressBar = useRef();
    const progress = useRef();
    const progressBtn = useRef();
    const [touch, setTouch] = useState({});
    const progressBtnWidth = 16;

    const _offset = offsetWidth => {
        progress.current.style.width = `${offsetWidth}px`;
        progressBtn.current.style.transform = `translate(${offsetWidth}px, 0)`;
    }

    const progressTouchStart = e => {
        const startTouch = {};
        startTouch.initiated = true;
        startTouch.startX = e.touches[0].pageX;
        startTouch.left = progress.current.clientWidth;
        setTouch(startTouch);
    }

    const progressTouchMove = e => {
        if (!touch.initiated) return;

        const deltaX = e.touches[0].pageX - touch.startX;
        const barWidth = progressBar.current.clientWidth - progressBtnWidth;
        const offsetWidth = Math.min(
            Math.max(0, touch.left + deltaX),
            barWidth
        );
        _offset(offsetWidth);
    }

    const progressTouchEnd = e => {
        const endTouch = {...touch, initiated: false}
        setTouch(endTouch);
    }

    const progressClick = e => {
        const rect = progressBar.current.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        _offset(offsetWidth);
    }

    return (
        <ProgressBarWrapper>
            <div className="bar-inner" ref={progressBar} onClick={progressClick}>
                <div className="progress" ref={progress}></div>
                <div
                    className="progress-btn-wrapper"
                    ref={progressBtn}
                    onTouchStart={progressTouchStart}
                    onTouchMove={progressTouchMove}
                    onTouchEnd={progressTouchEnd}
                >
                    <div className="progress-btn"></div>
                </div>
            </div>
        </ProgressBarWrapper>
    );
}

export default ProgressBar