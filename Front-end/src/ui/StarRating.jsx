import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starsStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxrating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  text: PropTypes.bool,
  onSetrating: PropTypes.func,
  defaultRating: PropTypes.number,
};

function StarRating({
  maxrating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  defaultRating = 0,
  text = false,
  onSetrating,
}) {
  const textStyle = {
    margin: "0",
    LineHeight: "1",
    color: "gray",
    fontSize: `${size / 1.5}px`,
  };
  function handlerating(rating) {
    Setrating(rating);
    onSetrating(rating);
  }

  const [rating, Setrating] = useState(defaultRating);
  const [Temprating, Settemprating] = useState(0);
  return (
    <div style={containerStyle} className={className}>
      <div style={starsStyle}>
        {Array.from({ length: maxrating }, (_, i) => (
          <Star
            key={i}
            onClick={() => handlerating(i + 1)}
            full={Temprating ? Temprating >= i + 1 : rating >= i + 1}
            onMouseEnter={() => Settemprating(i + 1)}
            onMouseLeave={() => Settemprating(0)}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>
        {text && (Temprating || `${rating}/` || "")}{" "}
        <span className="text-mblack">{maxrating}</span>
      </p>
    </div>
  );
}

export default StarRating;
