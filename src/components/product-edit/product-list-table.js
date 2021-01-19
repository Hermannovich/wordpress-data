import React from "react";
import { Fragment } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

const ProductRow = ({ product, onEdit, onDelete }) => {
  const { id, name, description, price } = product;
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>
        <button
          className={"btn btn-secondary btn-sm"}
          onClick={() => onEdit(id)}
        >
          {__("Edit")}
        </button>
        <button
          className={"btn btn-secondary btn-sm btn-danger"}
          onClick={() => onDelete(id)}
        >
          {__("Delete")}
        </button>
      </td>
    </tr>
  );
};

const ProductListTable = ({
  products,
  onEdit = () => null,
  onCreate = () => null,
  onDelete = () => null
}) => {
  const productRows = products.map(product => {
    return (
      <ProductRow
        key={product.id}
        product={product}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    );
  });
  return (
    <Fragment>
      <table className={"table"}>
        <thead>
          <tr>
            <th>{__("Id")}</th>
            <th>{__("Name")}</th>
            <th>{__("Description")}</th>
            <th>{__("Price")}</th>
            <th>{__("Action")}</th>
          </tr>
        </thead>
        <tbody>{productRows}</tbody>
      </table>
      <button className={"btn btn-primary float-left"} onClick={onCreate}>
        {__("Create New Product")}
      </button>
    </Fragment>
  );
};

export default ProductListTable;
