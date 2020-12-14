export const modalStyle = (style?: Object) => ({
  overlay: {
    backgroundColor: `rgba(0,0,0,0.3)`,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
    margin: '0px',
    ...style,
  },
});
