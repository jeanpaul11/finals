import React, { Component } from 'react';
import '../App.css';
import Footer from './Footer';
import NavbarComponent from './Navbar';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    chooseItem = event => {
        event.preventDefault();
        this.props.history.push("/itemForm", {
            type: "add",
            data: null
        });
    }

    seeOrders = event => {
        event.preventDefault();
        this.props.history.push("/Orders");
    }

    seeItems = event => {
        event.preventDefault();
        this.props.history.push("/Items");
    }

    render() {
        return (
            <div className="App">
                <NavbarComponent history={this.props.history} />
                <div className="home-body">
                    <p>Start by choosing an item.</p>
                </div>
                <div className="feedMe app">
                    <div className="food" id="home-food" onClick={this.chooseItem}>
                        <div className="food-body">
                            <img className="food-img" src="food1.jpg" alt="food 1"></img>
                            <h2>choose an item</h2>
                            
                        </div>
                    </div>
                    <div className="food" id="home-food" onClick={this.seeOrders}>
                        <div className="food-body">
                            <img className="food-img" src="food2.jpg"  alt="food 2"></img>
                            <h2>Your orders</h2>
                            
                        </div>
                    </div>
                    <div className="food" id="home-food" onClick={this.seeItems}>
                        <div className="food-body">
                            <img src="food3.jpg" className="food-img" alt="food 3"></img>
                            <h2>Your items</h2>
                    
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}

export default HomePage;