import React, { ReactElement } from 'react';
import styles from './Button.module.scss';

interface Icon extends React.PropsWithChildren {
  description: string;
  open?: ReactElement;
  onClick?: () => void | Promise<void>;
  children: ReactElement | string;
}
const Button: React.FC<Icon> = (props) => {
  const [showTooltip, setShowTooltip] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const onMouseOverHandle: React.MouseEventHandler = (event) => {
    setShowTooltip(true);
  };

  const onMouseLeaveHandle: React.MouseEventHandler = () => {
    setShowTooltip(false);
  };
  const handleOpenComponentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        open &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]);
  return (
    <>
      <button
        ref={buttonRef}
        onClick={(event) => {
          setOpen(!open);
          if (props.onClick) props.onClick();
        }}
        onMouseEnter={onMouseOverHandle}
        onMouseLeave={onMouseLeaveHandle}
        className={styles.custombutton}
      >
        {props.children}
        {showTooltip && (
          <div className={styles.Tooltip}>{props.description}</div>
        )}
      </button>
      {open && (
        <div className={styles.ghost} onClick={handleOpenComponentClick}>
          {props.open}
        </div>
      )}
    </>
  );
};

export default Button;
