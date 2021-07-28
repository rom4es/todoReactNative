import * as Common from './Common.js';

const styles = {
  container: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: '#d6ccd5',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 10,
  },
  importance: {
    marginBottom: 10,
    fontSize: 16,
  },
  deadline: {
    marginBottom: 10,
    fontSize: 16,
  },
  completedCont: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#08A346',
  },
  containerModal: {
    backgroundColor: '#FFF',
    padding: 25,
    height: 155,
  },
  modalHeader: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: Common.actions,
  button: {
    ...Common.button,
    ...Common.buttonIcon,
    ...Common.buttonMargin,
  },
  icon: Common.buttonIconImage,
  buttonModal: {
    ...Common.button,
    ...Common.buttonMargin,
  },
  buttonText: Common.buttonText,
  expired: {
    backgroundColor: '#d44646',
  },
  bold: Common.bold,
};

export default styles;
