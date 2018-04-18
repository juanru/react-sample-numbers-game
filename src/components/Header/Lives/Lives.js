import React from 'react';
import _ from "lodash";

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const Lives = (props) => {
    const {remainingLives} = props;
    return (
        <div>Remaining lives:&nbsp;
            {_.times(remainingLives, function (i) {
                return <FontAwesomeIcon key={i} icon="heart" className={'remainingLive'}/>
            })}
        </div>
    );
};

export default Lives;