import React from "react";
import classnames from "classnames";
import { withInstanceId } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";

const FormInput = ({
  as = "text",
  value = null,
  className = "",
  label = "",
  onChange = () => null,
  instanceId
}) => {
  const inputId = `product-input-${instanceId}`;
  const formType =
    as === "textarea" ? (
      <Fragment>
        <br />
        <textarea
          onChange={onChange}
          className={"form-control"}
          id={inputId}
          value={value}
        />
      </Fragment>
    ) : (
      <input
        onChange={onChange}
        className={"form-control"}
        id={inputId}
        value={value}
        type={as}
      />
    );

  return (
    <div className={classnames("form-group", className)}>
      <label htmlFor={inputId}>{label}</label>
      {formType}
    </div>
  );
};

export default withInstanceId(FormInput);
