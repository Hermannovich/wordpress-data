import React from "react";
import { __ } from "@wordpress/i18n";
import { Fragment } from "@wordpress/element";

const CartRow = ({ cartItem, onRemove }) => {
  const { id, name, price } = cartItem;
  return (
    <tr>
      <td>{name}</td>
      <td className={"text-right"}>{price}</td>
      <td className={"text-right"}>
        <button
          className={"btn btn-secondary btn-sm btn-danger"}
          onClick={() => onRemove(id)}
        >
          {__("Remove")}
        </button>
      </td>
    </tr>
  );
};

const CartTable = ({ cartItems = [], onRemove = () => null }) => {
  const cartRows = cartItems.map(cartItem => {
    return (
      <CartRow key={cartItem.id} cartItem={cartItem} onRemove={onRemove} />
    );
  });
  const cartTotal = cartItems.reduce((acc, cartItem) => {
    acc = parseFloat(cartItem.price) + acc;
    return acc;
  }, 0);
  const cellStyle = {
    width: "5%"
  };
  return (
    <Fragment>
      <table className={"table"}>
        <thead>
          <tr>
            <th className="w-50">{__("Name")}</th>
            <th className={"text-right"} style={cellStyle}>
              {__("Price")}
            </th>
            <th />
          </tr>
        </thead>
        <tbody>{cartRows}</tbody>
        <tfoot>
          <tr>
            <td className={"text-right"}>{__("Total:")}</td>
            <td className={"text-right"}>{cartTotal}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </Fragment>
  );
};

export default CartTable;
