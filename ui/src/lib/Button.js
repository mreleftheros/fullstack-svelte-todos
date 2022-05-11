const Button = ({
  text = '',
  type = 'button',
  color = 'blue',
  onClick = null,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${color}`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
