import React from 'react';
import { shallow } from 'enzyme';
import jest from 'jest-mock';

import Input from './Input';

const changeFn = jest.fn();

describe('Input render', () => {
  it('Input render correctly', () => {
    const component = shallow(<Input />);

    expect(component).toHaveLength(1);
    component.unmount();
  });

  it('Input render correctly', () => {
    const component = shallow(<Input />);

    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('Renders an icon on the left', () => {
    const component = shallow(<Input icon="fa fa-react" />);

    expect(component.find('i.fa.fa-react')).toHaveLength(1);
    component.unmount();
  });

  it('Doesnt render any icon', () => {
    const component = shallow(<Input />);

    expect(component.find('i.fa.fa-react')).toHaveLength(0);
    component.unmount();
  });

  it('Renders Input placeholder', () => {
    const component = shallow(<Input placeholder="test" />);

    expect(component.text()).toContain('test');
    component.unmount();
  });

  it('Calls function on change', () => {
    const component = shallow(<Input onChange={changeFn} />);

    component.find('input').simulate('change');
    expect(changeFn).toHaveBeenCalled();
    component.unmount();
  });
});
