import React from "react";
import { render, useState, Fragment } from "@wordpress/element";
import { ProductEditView } from "./components/product-edit";
import { ProductGrid } from "./components/product-display";
import { Cart } from "./components/cart";
import { __, sprintf } from "@wordpress/i18n";
import uniqid from "uniqid";
import classnames from "classnames";

import "./styles.css";

const getRenderedView = (
  view,
  products,
  updateProducts,
  cartItems,
  addToCart,
  removeFromCart
) => {
  switch (view) {
    case "cart":
      return (
        <Fragment>
          <h1>Cart</h1>
          <Cart cartItems={cartItems} onRemove={removeFromCart} />
        </Fragment>
      );
    case "display":
      return (
        <Fragment>
          <h1>Product Directory</h1>
          <ProductGrid
            products={products}
            cartItems={cartItems}
            addToCart={addToCart}
          />
        </Fragment>
      );
    case "edit":
      return (
        <Fragment>
          <h1>Product Editor</h1>
          <ProductEditView
            products={products}
            updateProducts={updateProducts}
          />
        </Fragment>
      );
    default:
      return null;
  }
};

function App() {
  const [products, updateProducts] = useState([
    {
      id: uniqid(),
      name: "Shoes",
      description:
        "Some first class, deluxe, leather crinkled shoes. Prized for being worn in and ready for use.",
      price: "10.00"
    }
  ]);
  const [view, setView] = useState("display");
  const [cartItems, updateCartItems] = useState([]);
  const buttonClasses = ["btn", "btn-secondary", "btn-sm"];
  const addToCart = product => {
    if (!cartItems.some(cartItem => cartItem.id === product.id)) {
      const updatedCart = [...cartItems, product];
      updateCartItems(updatedCart);
    }
  };
  const removeFromCart = cartItemId => {
    const updatedCartItems = cartItems.filter(
      cartItem => cartItem.id !== cartItemId
    );
    updateCartItems(updatedCartItems);
  };
  const ViewButtons = () => (
    <div
      className="btn-group float-right"
      role="group"
      aria-label={__("Context Switcher")}
    >
      <button
        type="button"
        className={classnames(...buttonClasses, { active: view === "edit" })}
        onClick={() => setView("edit")}
      >
        {__("Edit")}
      </button>
      <button
        type="button"
        className={classnames(...buttonClasses, { active: view === "display" })}
        onClick={() => setView("display")}
      >
        {__("Directory")}
      </button>
      <button
        type="button"
        className={classnames(...buttonClasses, { active: view === "cart" })}
        onClick={() => setView("cart")}
      >
        {sprintf(__("Cart (%s)"), cartItems.length)}
      </button>
    </div>
  );
  return (
    <div className="mt-5">
      <div className="container">
        {getRenderedView(
          view,
          products,
          updateProducts,
          cartItems,
          addToCart,
          removeFromCart
        )}
      </div>
      <div className="fixed-bottom mb-5 mr-5">
        <ViewButtons />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
