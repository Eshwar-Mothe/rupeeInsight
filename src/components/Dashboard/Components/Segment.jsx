import React from 'react';
import { Segmented } from 'antd';

const Segment = ({ options }) => {


    return (
        <>
            <Segmented options={options} className='segment' />
        </>
    )
}

export default Segment