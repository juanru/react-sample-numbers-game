import React from 'react';

import MessageDialog from './MessageDialog/MessageDialog';
import Lives from './Lives/Lives';

const Header = (props) => {
    return (
        <div>
            <MessageDialog {...props}/>

            <div className="row justify-content-center">
                <div className="col-4">&nbsp;</div>
                <div className="col-2">&nbsp;</div>
                <div className="col-4" style={{textAlign: 'right'}}>
                    <Lives remainingLives={props.remainingLives}/>
                </div>
            </div>
        </div>
    );
};

export default Header;