import React from 'react';
import { render, shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Select from '../index';

describe('Select', () => {
  it('Select', () => {
    const wrapper = mount(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render defaultValue correctly ', () => {
    const wrapper = mount(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        defaultValue="2"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Cascader Select', () => {
    // jest.useFakeTimers();
    const wrapper = mount(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.setProps({ value: ['1', '12'] });
    // jest.runAllTimers();
    wrapper.unmount();
  });

  it('Cascader Select init value', () => {
    // jest.useFakeTimers();
    const wrapper = mount(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        displayAddon="-"
        />
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should trigger onOk when press ok button', () => {
    const onChangeFn = jest.fn();

    const wrapper = mount(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        onOk={onChangeFn}
        />
    );

    // wrapper.find('.za-picker-submit').simulate('click');
    // expect(onChangeFn).toBeCalled();
  });

  it('should trigger onCancel when press cancel button', () => {
    const onOkFn = jest.fn();

    const wrapper = mount(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        value={['1', '12']}
        displayAddon="-"
        onOk={onOkFn}
        />
    );

    // wrapper.find('.za-picker-cancel').simulate('click');
    // expect(onOkFn).not.toBeCalled();
  });

  it('receive new dataSource', () => {
    const wrapper = shallow(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    wrapper.setProps({
      dataSource: [
        { value: 'a', label: '选项一' },
        { value: 'b', label: '选项二' },
        { value: 'c', label: '选项三' },
      ],
    });
  });

  it('receive new value', () => {
    const wrapper = shallow(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        />
    );
    wrapper.setProps({ value: '1' });
  });

  it('receive new cascader dataSource', () => {
    const wrapper = shallow(
      <Select
        dataSource={[
          {
            value: '1',
            label: '选项一',
            children: [
              { value: '11', label: '选项一' },
              { value: '12', label: '选项二' },
            ],
          },
          {
            value: '2',
            label: '选项一',
            children: [
              { value: '21', label: '选项一' },
              { value: '22', label: '选项二' },
            ],
          },
        ]}
        />
    );

    wrapper.setProps({
      dataSource: [
        {
          value: '3',
          label: '选项一',
          children: [
            { value: '31', label: '选项一' },
            { value: '32', label: '选项二' },
          ],
        },
        {
          value: '4',
          label: '选项一',
          children: [
            { value: '41', label: '选项一' },
            { value: '42', label: '选项二' },
          ],
        },
      ],
    });
  });

  it('should trigger maskClick when click mask', () => {
    const onMaskClick = jest.fn();
    const wrapper = mount(
      <Select
        dataSource={[
          { value: '1', label: '选项一' },
          { value: '2', label: '选项二' },
        ]}
        onMaskClick={onMaskClick}
        />
    );
    // wrapper.find('.za-select').simulate('click');
    // wrapper.find('.za-mask').simulate('click');
    // expect(onMaskClick).toBeCalled();
  });
});
