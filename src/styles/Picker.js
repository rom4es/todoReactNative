import * as Common from './Common.js';

const styles = {
  containerDate: {
    marginBottom: 30,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actions: Common.actions,
  button: {
    ...Common.button,
    ...Common.buttonIcon,
    ...Common.buttonMargin,
  },
  icon: Common.buttonIconImage,
};

export default styles;
