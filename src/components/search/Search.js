import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResults'

import axios from 'axios';

class Search extends Component {
    state = {
        searchText: '',
        amount: 5,
        images: []
    }

    onTextChange = (event) => {

        const val = event.target.value
        this.setState({
            [event.target.name]: val
        }, () => {
            if (val === '') {
                this.setState({
                    images: []
                })
            } else {
                axios.get(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_KEY}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}
                &safesearch=true`).then(res => {
                    this.setState({
                        images: res.data.hits
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    onAmountchange = (event, index, value) => {
        this.setState({
            amount: value
        })
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <TextField name="searchText" value={this.state.searchText} onChange={this.onTextChange} floatingLabelText="Search for image" fullWidth={true} />
                <br />
                <SelectField
                    name="amount"
                    floatingLabelText="amount"
                    value={this.state.amount}
                    onChange={this.onAmountchange.bind(this)}>

                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={20} primaryText="20" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (<ImageResults images={this.state.images} />) : null}

            </div>
        )
    }
}

export default Search;
