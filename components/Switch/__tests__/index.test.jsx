import React from 'react';
import { render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Switch from '../index';

describe('Switch', () => {
  it('renders correctly', () => {
    const wrapper = render(<Switch />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('defaultChecked', () => {
    const wrapper = render(<Switch defaultChecked />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('onChange', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Switch checked onChange={onChange} />);
    wrapper.find('input').simulate('change', { target: { checked: false } });
    expect(onChange).toBeCalledWith(false);
  });

  it('receive new checked', () => {
    const wrapper = shallow(<Switch className="test-class" />);
    wrapper.setProps({ checked: true });
  });
});
