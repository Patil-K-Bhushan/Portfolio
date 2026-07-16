import React from 'react';
import useSound from '../hooks/useSound';

export default function withSound(WrappedComponent) {
  return function SoundWrapper({ soundOn, ...props }) {
    const play = useSound(soundOn);

    const handleMouseEnter = (e) => {
      if (props.onMouseEnter) props.onMouseEnter(e);
      play('hover');
    };

    const handleClick = (e) => {
      if (props.onClick) props.onClick(e);
      play('click');
    };

    return (
      <WrappedComponent
        {...props}
        onMouseEnter={handleMouseEnter}
        onClick={handleClick}
      />
    );
  };
}
