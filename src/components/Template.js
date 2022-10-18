import React from 'react';
import './Template.css'

const Template = ({children, todoLength }) => {
    return (
        <div className='Template'>
            <div className='title'>배민개발팀 오늘의 할일 ({todoLength})</div>
            <div>{children}</div>
        </div>
    );
};

export default Template;