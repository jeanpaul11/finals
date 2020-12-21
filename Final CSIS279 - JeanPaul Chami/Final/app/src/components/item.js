import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import { getItemPrice } from '../actions/prices.action';
import { addItem, updateUserOrder } from '../actions/items.action';


class item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: null, object: null,
            username: '', address: '', category: '', price: 0,
            order_date: new Date(),
            
        };
    }

    componentDidMount() {
        let user_username;
        if (localStorage.length !== 0) {
            //Retrieve username of user in localstorage 
            user_username = localStorage.getItem("username");
        }
        else {
            user_username = sessionStorage.getItem("username");
        }

        if (this.props.location.state.data !== null) {
            this.setState({ operation: this.props.location.state.operation });
            this.setState({ object: this.props.location.state.data });
            this.setState({ address: this.props.location.state.data.address });
            this.setState({ price: this.props.location.state.data.item_price });
            this.setState({ category: this.props.location.state.data.item_category });
            this.setState({ date: this.props.location.state.data.order_date});


           
        }

        this.setState({ username: user_username });

        
    }


    handleAddress = event => {
        event.preventDefault();
        this.setState({ start: event.target.value });
    }

    



    insertNewItem = event => {
        event.preventDefault();
        const { address } = this.state;
        const { username } = this.state;
        const { price } = this.state;
        const {category} = this.state,
        const {date} = this.state,

        item = {
            address: address,
            item_price: price,
            user_username: username,
            item_category: category,
            order_date: date,
        }

        addItem(item).then(res => {
            alert("You have successfully chosoed your item");
        }).catch(err => {
            alert("Error" + err);
        })
    }

    

    editItem = event => {
        event.preventDefault();
        const { address } = this.state;
        const { username } = this.state;
        const { price } = this.state;
        const {category} = this.state,
        const {date} = this.state,


        item = {
            address: address,
            item_price: price,
            user_username: username,
            item_category: category,
            order_date: date,
        }
        

        console.log(item);

        
    }

    render() {
        let button;
        if (this.state.operation === "edit") {
            button = <input className="btn bg-primary text-light" type="submit" value="Edit" disabled={this.state.proceedDisabled} onClick={this.editItem} />
        }
        else {
            button = <input className="btn bg-primary text-light" type="submit" value="Proceed" disabled={this.state.proceedDisabled} onClick={this.insertNewItem} />
        }
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h1>Choose an item</h1>
                    <p>Fill all the needed information below in order to choose your favorite items</p>
                </div>
                <div className="food">
                    <div className="food-body">
                        <form onSubmit={this.insertNewItem} method="POST">
                            <div className="form-group row">
                                <label className="form-label">address</label>
                                <input className="form-control" type="text" id="address" name="address" onChange={this.address} 
                                placeholder='Enter your location' value={this.state.address || ""} required size="8" /><br />
                            </div>
                            <Calendar className="calendar" onChange={this.changeDate} value={this.state.order_date} minDate={this.state.today_date} maxDate={this.state.maxDate} />
                            
                            <div className="form-group row">
                                <label className="form-label">Item price:</label>
                                <input className="form-control" type="text" id="price" aria-describedby="priceHelpBlock" name="price" readOnly={true} required size="10" value={"$" + this.state.price || ""} /><br />
                                <small id="priceHelpBlock" className="pass-text">
                                    Click on the above button to see the price
                                </small>
                            </div>
                            {button}
                        </form>
                    </div>
                </div>
                <Footer />
            </div>
        )
    };
}

export default item;