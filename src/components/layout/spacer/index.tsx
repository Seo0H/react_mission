interface SpacerProps {
  w?: number;
  h?: number;
}

const Spacer = ({ w, h }: SpacerProps) => {
  return <div style={{ width: `${w}px`, height: `${h}px` }} />;
};

export default Spacer;
