import './Button.component.scss';

export const Button = ({
  children,
  onClick,
}: {
  children?: string | JSX.Element;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className='Button'>
      {children}
    </button>
  );
};
