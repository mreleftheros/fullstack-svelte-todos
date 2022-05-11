const Button = ({ text = '', type = 'button', color = 'blue' }) => {
  return (
    <button className={`btn btn-${color}`} type={type}>
      {text}
    </button>
  );
};

export default Button;
