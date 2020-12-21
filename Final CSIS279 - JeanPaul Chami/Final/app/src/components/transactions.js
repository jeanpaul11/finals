import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import NavbarComponent from './Navbar';
import { getItemPrice } from '../actions/prices.action';
import { addItem, updateUserOrder } from '../actions/items.action';


class transactions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            operation: null, object: null,

            id: '',item: '', username: '', order: '', paymentType: '', 
            
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
            this.setState({ address: this.props.location.state.data.id });
            this.setState({ price: this.props.location.state.data.item });
            this.setState({ category: this.props.location.state.data.username });
            this.setState({ date: this.props.location.state.data.order});
            this.setState({ date: this.props.location.state.data.paymentType});


           
        }

        this.setState({ username: user_username });

        
    }




    chooseType = event => {
        event.preventDefault();
    
        const {paymentType} = this.state,

        item = {
            type = paymentType
        }

        addItem(item).then(res => {
            alert("You have successfully choosed a payment type");
        }).catch(err => {
            alert("Error" + err);
        })
    

    

    

        console.log(transactions);

        
    }

    render() {
        let button;
        if (this.state.operation === "choose") {
            button = <input className="btn bg-primary text-light" type="submit" value="Choose" disabled={this.state.proceedDisabled} onClick={this.chooseType} />
        }
        
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <h1>Choose a payment Type</h1>
                    
                </div>
                <div className="food">
                    <div className="food-body">
                        <form onSubmit={this.insertNewItem} method="POST">
                            <div className="form-group row">
                                <label className="form-label">Type</label>
                                <input className="form-control" type="text" id="payment type" name="payment type" onChange={this.paymentType} 
                                placeholder='Enter your payment type' value={this.state.paymentType || ""} required size="8" /><br />
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

export default transactions;