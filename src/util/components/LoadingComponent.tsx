import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface LoadingComponentProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | undefined;
  marginX?: 0 | 1 | 2 | 3 | 4 | 5;
}

const getSizeInRem = (size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'): number => {
  let sizeRem = 1;

  switch (size) {
    case 'xs':
      sizeRem = 1;
      break;
    case 'sm':
      sizeRem = 2;
      break;
    case 'md':
      sizeRem = 4;
      break;
    case 'lg':
      sizeRem = 6;
      break;
    case 'xl':
      sizeRem = 8;
      break;
    default:
      break;
  }

  return sizeRem;
};

const LoadingComponent = ({ size = 'sm', color = 'primary', marginX = 0 }: LoadingComponentProps): JSX.Element => {
  const sizeInRem = getSizeInRem(size);
  const style = {
    height: `${sizeInRem}rem`,
    width: `${sizeInRem}rem`,
  };
  return (
    <>
      <Spinner className={`mx-${marginX}`} style={style} animation="border" variant={color} />
    </>
  );
};
export default LoadingComponent;
