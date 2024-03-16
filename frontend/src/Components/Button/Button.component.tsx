import './Button.component.scss';

export const Button = ({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) => {
  return (
    <button onClick={onClick} className='Button'>
      {children}
    </button>
  );
};
