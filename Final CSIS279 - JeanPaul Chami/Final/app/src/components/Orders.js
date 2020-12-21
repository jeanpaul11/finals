import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { getUserItems } from '../actions/items.action';
import { Button } from 'react-bootstrap';

let category = require("category");
let moment = require("moment");


class Orders extends Component {
    constructor(props) {
        super(props);
        this.sortItemsBycategory = this.sortItemsBycategory.bind(this);
        this.dateFormat = this.dateFormat.bind(this);
        this.priceFormat = this.priceFormat.bind(this);
        this.editFormat = this.editFormat.bind(this);
        this.deleteFormat = this.deleteFormat.bind(this);
        this.editOrder = this.editOrder.bind(this);
        this.deleteOrder = this.deleteOrder.bind(this);
        this.state = { username: '', data: [], allItems: [] };
    }
    componentDidMount() {
        let user_username;
        if (localStorage.length !== 0) {
            user_username = localStorage.getItem("username");
        }
        else {
            user_username = sessionStorage.getItem("username");
        }
        this.setState({ username: user_username });

        getUserItems({ user_username: user_username }).then(res => {
            this.setState({ allItems: res.res });
            this.sortItemsBycategory(this.state.allItems);
        }).catch(error => {
            console.log("Error" + error);
        });

    };

    sortItemsBycategory(itemsArray) {
        let orders = [];
        for (let i = 0; i < itemsArray.length; i++) {
            let cat = category(itemsArray[i].item_category);
            
        this.setState({ data: orders });
    }
}

dateFormat(cell) {
    return moment(cell).format("YYYY-MM-DD");
}



    priceFormat(cell) {
        return "$" + cell;
    }

    editOrder(data) {
        this.props.history.push("/item", {
            operation: "edit",
            data: data,
        })
    }

    deleteOrder(data) {
        console.log(data);
        this.props.history.push("/Delete", {
            type: "order",
            data: data,
        });
    }

   

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home">
                    <h2>Your order</h2>
                </div>
                <div className="table-bg">
                    <BootstrapTable data={this.state.data} striped hover condensed pagination search >
                        <TableHeaderColumn dataField='_id' isKey={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='address'>address</TableHeaderColumn>
                        <TableHeaderColumn dataField='item_category'>category</TableHeaderColumn>
                        <TableHeaderColumn dataField="item_price" dataFormat={this.priceFormat} dataSort={true}>item price</TableHeaderColumn>
                        <TableHeaderColumn dataField='order_date' dataFormat={this.dateFormat} dataSort={true}>Order date</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.editFormat}>Edit</TableHeaderColumn>
                        <TableHeaderColumn dataFormat={this.deleteFormat}>Delete</TableHeaderColumn>
                    </BootstrapTable>
                </div>
                <Footer />
            </div>
        )
    };
}

export default Orders;