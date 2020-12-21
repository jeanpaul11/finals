import Alert from 'react-bootstrap/Alert';
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { deleteUserRecord } from '../actions/items.action';

class DeleteRecord extends Component {
    constructor(props) {
        super(props);
        this.deleteRecord = this.deleteRecord.bind(this);
        this.state = { show: true, object: null, type: '' };
    }

    componentDidMount() {
        this.setState({ type: this.props.location.state.type });
        this.setState({ object: this.props.location.state.data });
    }

    setShow = event => {
        event.preventDefault();
        this.setState({ show: false });
        if (this.state.type === "order") {
            this.props.history.push("/Orders");
        }
        else if (this.state.type === "item") {
            this.props.history.push("/Items");
        }
    }

    deleteRecord = event => {
        event.preventDefault();
        console.log(this.state.type);
        console.log(this.state.object);

        deleteUserRecord({ data: this.state.object }).then(res => {
            alert("Order deleted");
            if (this.state.type === "order") {
                this.props.history.push("/Orders");
            }
            else if (this.state.type === "item") {
                this.props.history.push("/Items");
            }

        }).catch(error => {
            alert("Error" + error);
        });

    }

    render() {
        let alertTitle;
        let alertMessage;
        if (this.state.type === "order") {
            alertTitle = "Delete order?"
            alertMessage = "Are you sure you would like to delete your order?"
        }
        else if (this.state.type === "item") {
            alertTitle = "Delete item?";
            alertMessage = "Are you sure you would like to delete your item?"
        }
        return (
            <Alert show={this.state.show} variant="alert">
                <Alert.Heading>{alertTitle}</Alert.Heading>
                <p>
                    {alertMessage}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={this.setShow} variant="outline-success">
                        Cancel
                    </Button>
                    <br />
                    <Button onClick={this.deleteRecord} variant="dark">Delete</Button>
                </div>
            </Alert>
        )


    }
}

export default DeleteRecord;