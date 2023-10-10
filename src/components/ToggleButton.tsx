import React, { useState } from 'react';

type Arg = {
  classNames: string[];
  constClassName: string;
  children?: React.JSX.Element | React.JSX.Element[];
};

function ToggleButton({ classNames, constClassName, children }: Arg) {
  const [indx, setIndx] = useState(0);

  return (
    <button
      className={constClassName + classNames[indx]}
      onClick={(_) => setIndx((c) => (c + 1) % classNames.length)}
    >
      {children}
    </button>
  );
}

export default ToggleButton;
