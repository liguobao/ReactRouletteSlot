/*
 * @Author: wzi
 * @Date: 2018-09-04 10:55:33
 * @Last Modified by: wzi
 * @Last Modified time: 2019-01-08 16:49:55
 */

import * as React from 'react';
import ReactRouletteSlot from '@components/ReactRouletteSlot';

const action = (cb) => {
    cb({ data: 1010 });
};
const data = [
    { id: 1000, img: 'http://dummyimage.com/30x30', label: 'Larry' },
    { id: 1001, img: 'http://dummyimage.com/30x30', label: 'Joseph' },
    { id: 1003, img: 'http://dummyimage.com/30x30', label: 'Paul' },
    { id: 1004, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1005, img: 'http://dummyimage.com/30x30', label: 'Helen' },
    { id: 1006, img: 'http://dummyimage.com/30x30', label: 'Maria' },
    { id: 1007, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1008, img: 'http://dummyimage.com/30x30', label: 'Mark' },
    { id: 1009, img: 'http://dummyimage.com/30x30', label: 'Carol' },
    { id: 1010, img: 'http://dummyimage.com/30x30', label: 'Ronald' },
    { id: 1011, img: 'http://dummyimage.com/30x30', label: 'Nancy' },
    { id: 1012, img: 'http://dummyimage.com/30x30', label: 'Michelle' },
];
const App = () => {
    return (
        <div
            style={{
                margin: '10px auto',
            }}
        >
            <ReactRouletteSlot
                data={data}
                action={action}
                width={300}
                height={300}
            />
        </div>
    );
};

export default App;
export { data, action };
