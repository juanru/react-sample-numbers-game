import React from 'react';
import _ from "lodash";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Lives = (props) => {
    const {remainingLives} = props;
    return (
        <div className="row justify-content-center">
            <div className="col-4">&nbsp;</div>
            <div className="col-2">&nbsp;</div>
            <div className="col-4" style={{textAlign: 'right'}}>Remaining lives:&nbsp;
                {_.times(remainingLives, function (i) {
                    return <FontAwesomeIcon icon="heart" className={'remainingLive'}/>
                })}
            </div>
        </div>
    );
};

export default Lives;