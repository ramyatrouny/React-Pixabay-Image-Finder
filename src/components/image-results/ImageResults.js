import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import ZoomIn from 'material-ui/svg-icons/action/zoom-in'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ImageResults extends Component {
    state = {
        open: false,
        currentImage: ''
    }

    handleOpen = (img) => {
        this.setState({
            open: true,
            currentImage: img
        });
    }

    handleClose = () => {
        this.setState({
            open: false
        });
    }



    render() {
        let imageListContent;
        const { images } = this.props;

        

        if (images) {
            imageListContent = (
                <GridList cols={3}>
                    {images.map(img => (
                        <GridTile title={img.tags}
                            key={img.id}
                            subtitle={<span>By: <strong>{img.user}</strong></span>}
                            actionIcon={<IconButton onClick={() =>this.handleOpen(img.largeImageURL)}><ZoomIn color="white"></ZoomIn></IconButton>}>
                            <img src={img.largeImageURL} alt="" />

                        </GridTile>
                    ))}
                </GridList>
            )
        } else {
            //Add Spinner
            imageListContent = null;
        }

        const action = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]

        return (
            <div>
                {imageListContent}
                <Dialog actions={action} modal={false} open={this.state.open} onRequestClose={this.handleClose}>
                    <img src={this.state.currentImage} style={{ width: '100%' }} alt="" />
                </Dialog>
            </div>
        )
    }
}

ImageResults.propTypes = {
    images: PropTypes.array.isRequired
}

export default ImageResults
