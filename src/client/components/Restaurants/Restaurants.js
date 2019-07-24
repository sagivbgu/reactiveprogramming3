import React from "react";
import {connect} from 'react-redux';
import Gallery from 'react-grid-gallery';
import history from '../../history'

const divStyle = {
    margin: "auto",
    width: "80%",
    border: "3px solid white",
    padding: "10px",
};


class Restaurants extends React.Component {
    constructor(props) {
        super(props);

        this.onClickThumbnail = this.onClickThumbnail.bind(this);
        //this.state = {};

    }

    onClickThumbnail(index, event) {
        console.log(index)
        console.log(event)
        history.push('/1')
    }

    render() {
        const IMAGES = [
            {
                src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                thumbnailCaption: "yoyo"
            },

            {
                src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                thumbnailWidth: 320,
                thumbnailHeight: 212,
                myVal: "dsfsd"
            },
        ]

        return (
            <div style={{
                display: "block",
                minHeight: "1px",
                width: "100%",
                border: "1px solid #ddd",
                overflow: "auto"
            }}>
                <Gallery images={IMAGES}
                         enableImageSelection={false}
                         margin={50}
                         onClickThumbnail={this.onClickThumbnail}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
