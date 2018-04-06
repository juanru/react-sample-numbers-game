import React, {Component} from 'react';

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'

class App extends Component {
    showRandomNumber = () => {
        return _.random(5);
    };

    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-4">
                        Random: {this.showRandomNumber()}
                        <div>
                            <FontAwesomeIcon icon="check-square"/>
                            Favorite beverage: <FontAwesomeIcon icon="coffee"/>
                            <FontAwesomeIcon icon="check-square"/>
                            Popular gadgets come from vendors like:
                            <FontAwesomeIcon icon={["fab", "apple"]}/>
                            <FontAwesomeIcon icon={["fab", "microsoft"]}/>
                            <FontAwesomeIcon icon={["fab", "google"]}/>
                        </div>
                    </div>
                    <div className="col-4">
                        One of two columns
                    </div>
                </div>
            </div>
        );
    }
}

export default App;