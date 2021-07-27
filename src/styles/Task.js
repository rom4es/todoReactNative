import * as Common from './Common.js';

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 15,
  },
  title: {
    marginBottom: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputWrapper: {
    marginBottom: 15,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 5,
  },
  importance: {
    width: 200,
    marginBottom: 20,
  },
  selectWrapper: Common.selectWrapper,
  selectText: Common.selectText,
  select: Common.select,
  containerDate: {
    marginBottom: 30,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#F00',
  },
  actions: Common.actions,
  button: {
    ...Common.button,
    ...Common.buttonIcon,
    ...Common.buttonMargin,
  },
  icon: Common.buttonIconImage,
  buttonSubmit: Common.button,
  buttonSubmitText: Common.buttonText,
};

export default styles;
