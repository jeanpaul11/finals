import Alert from 'react-bootstrap/Alert';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { deleteUser } from '../actions/users.actions';
import { deletUserData } from '../actions/items.action';

class DeleteAccount extends Component {
    constructor(props) {
        super(props);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.state = { show: true, username: '', password: '' };
    }

    componentDidMount() {
        let item_itemName;
        

        if (localStorage.length !== 0) {
            item_itemName = localStorage.getItem("itemName");
            
        }
        else {
            item_itemName = sessionStorage.getItem("itemName");
            
        }

        this.setState({ itemName: item_itemName });
        
    }

    setShow = event => {
        event.preventDefault();
        this.setState({ show: false });
        this.props.history.push("/Home");
    }

    deleteAccount = event => {
        event.preventDefault();
        

        let account = {
            username: this.state.username,
            pass: this.state.password,
        };

        deletUserData(account).then(res => {
            console.log(res);
            deleteUser(account).then(res => {
                alert("Successfully deleted.");
                if (localStorage.length !== 0 || sessionStorage.length !== 0) {
                    localStorage.clear();
                    sessionStorage.clear();
                }
                this.props.history.push("/");
            }).catch(err => {
                alert("Error" + err);
            })
        }).catch(err => {
            alert("Error " + err);
        })

    }

    render() {
        return (
            <Alert show={this.state.show} variant="danger">
                <Alert.Heading>Delete your account?</Alert.Heading>
                <p>
                    Do you want to delete your account
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.setShow} variant="outline-success">
                        Cancel
                    </Button>
                    <br />
                    <Button onClick={this.deleteAccount} variant="dark">Delete my account</Button>
                </div>
            </Alert>
        )
    }
}

export default DeleteAccount;