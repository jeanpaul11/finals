import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Button } from 'react-bootstrap'
import { getUserItems } from '../actions/items.action';
import NavbarComponent from './Navbar';
import Footer from './Footer';
import '../App.css';

let category = require('category');

class itemsTable extends Component {
    constructor(props) {
        super(props);
        this.sortItemsByCategory = this.sortItemsBycategory.bind(this);
        this.priceFormat = this.priceFormat.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.state = { username: '', data: [], items: [] };
    }

    componentDidMount() {
        let user_username;
        if (localStorage.length !== 0) {
            //Get username from localstorage
            user_username = localStorage.getItem("username");
        }
        else {
            user_username = sessionStorage.getItem("username");
        }
        console.log(user_username);
        this.setState({ username: user_username });

        //Fill array of items of the user by calling the actions method
        getUserItems({ user_username }).then(res => {
            console.log(res.res);
            this.setState({ data: res.res });
            this.sortItemsByCategory(this.state.data);
        }).catch(err => {
            alert("Unable to load items" + err);
        });
    }

    sortItemsByCategory(itemsArray) {
        let itemsHistory = [];
        for (let i = 0; i < itemsArray.length; i++) {
            let cat = category(itemsArray[i].item_category);
            
        this.setState({ data: orders });
        }
       
    }

   

    priceFormat(cell) {
        return "$" + cell;
    }

    editItem(data) {
        this.props.history.push("/item", {
            operation: "edit",
            data: data,
        })
    }

    deleteItem(data) {
        console.log(data);
        this.props.history.push("/Delete", {
            type: "item",
            data: data,
        });
    }

    dateFormat(cell) {
        return moment(cell).format("DD-MM-YYYY");
    }

   
    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home">
                    <h2>Your item</h2>
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.state.data} striped hover condensed pagination search >
                        <TableHeaderColumn dataField='_id' isKey={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='address'>address</TableHeaderColumn>
                        <TableHeaderColumn dataField='item_category'>category</TableHeaderColumn>
                        <TableHeaderColumn dataField='order_date' dataFormat={this.dateFormat} dataSort={true}>Order date</TableHeaderColumn>
                        <TableHeaderColumn dataField="item_price" dataFormat={this.priceFormat} dataSort={true}>item price</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.editFormat}>Edit</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.deleteFormat}>Delete</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    };
}

export default itemsTable;