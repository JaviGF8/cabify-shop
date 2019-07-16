import React from 'react';
import { shallow, mount } from 'enzyme';
import jest from 'jest-mock';

import Button from './Button';

const clickFn = jest.fn();

describe('Button render', () => {
  it('Button should render correctly', () => {
    const component = shallow(<Button />);

    expect(component).toHaveLength(1);
    component.unmount();
  });

  it('Renders an icon on the left', () => {
    const component = shallow(<Button iconLeft="fa fa-react" />);

    expect(component.find('i.fa.fa-react')).toHaveLength(1);
    component.unmount();
  });

  it('Renders an icon on the right', () => {
    const component = shallow(<Button iconRight="fa fa-react" />);

    expect(component.find('i.fa.fa-react')).toHaveLength(1);
    component.unmount();
  });

  it('Doesnt render any icon', () => {
    const component = shallow(<Button />);

    expect(component.find('i.fa.fa-react')).toHaveLength(0);
    component.unmount();
  });

  it('Renders Button text', () => {
    const component = shallow(<Button text="test" />);

    expect(component.text()).toContain('test');
    component.unmount();
  });

  it('Simulate onClick event', () => {
    const component = mount(<Button onClick={clickFn} />);

    component.simulate('click');
    expect(clickFn).toHaveBeenCalled();
    component.unmount();
  });
});
