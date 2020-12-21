import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import { getPrices } from '../actions/prices.action';

class PriceTable extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }

    componentDidMount() {
        getPrices().then(res => {
            this.setState({ data: res });
        }).catch(err => {
            console.log("Error " + err);
        })
    }

    priceFormat(cell, row) {
        console.log(row);
        return "$" + cell;
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} location={this.props.location} />
                <div className="home-body">
                    <h2>Price list</h2>
                    
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.state.data.res} striped hover condensed pagination search >
                        <TableHeaderColumn dataField='Price_id' isKey={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='address'>your address</TableHeaderColumn>
                        <TableHeaderColumn dataField='price' dataFormat={this.priceFormat} dataSort={true}>item price</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    }

}

export default PricingsTable;