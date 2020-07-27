import React from "react";

const Card = (props) => {
  const url = "https://source.unsplash.com/collection/45";
  //console.log(props);
  return (
    <div style={{ marginBottom: "10px" }}>
      <div className="card">
        <div className="card-image" style={{ width: 240 }}>
          <img alt={props.payload.header} src={url} />
          <span className="card-title">{props.payload.header}</span>
        </div>
        <div className="card-content">
          {props.payload.description}
          <p>
            {" "}
            <a href="/">{props.payload.address}</a>
          </p>
        </div>
        <div className="card-action">
          phone number:
          {props.payload.link}
        </div>
      </div>
    </div>
  );
};

export default Card;
