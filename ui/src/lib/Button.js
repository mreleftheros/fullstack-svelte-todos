const Button = ({
  text = '',
  type = 'button',
  color = 'blue',
  onClick = null,
  disabled = false,
  small = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${color} ${small && 'btn-small'}`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
