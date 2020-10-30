import React, { Component } from "react";
import "../styles/Cart.css";

export default class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      name: "",
      email: "",
      address: "",
    };
  }
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
  };
  render() {
    const { cartItems } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} items
          </div>
        )}
        <div>
          <div className="cart">
            <ul className="cart-items">
              {cartItems.map((item) => (
                <li key={item._id}>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <div>{item.title}</div>
                    <div className="right">
                      {item.price} x {item.count}{" "}
                      <button
                        className="button"
                        onClick={() => this.props.removeFromCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    {`Total:$${cartItems.reduce(
                      (a, c) => a + c.price * c.count,
                      0
                    )}`}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <div className="cart">
                  <form onSubmit={this.createOrder}>
                    <ul className="form-container">
                      <li>
                        <label>Name </label>
                        <input
                          name="name"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Email </label>
                        <input
                          name="email"
                          type="email"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <label>Address </label>
                        <input
                          name="address"
                          type="text"
                          required
                          onChange={this.handleInput}
                        />
                      </li>
                      <li>
                        <button classname="button primary" type="submit">
                          Checkout
                        </button>
                      </li>
                    </ul>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}