import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Breadcrumb, { BreadcrumbProps } from './Breadcrumb';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<BreadcrumbProps> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
};

export default meta;

const Template: StoryFn<BreadcrumbProps> = (args: any) => <BrowserRouter><Breadcrumb {...args} /></BrowserRouter>;

export const Default = Template.bind({});
Default.args = {
  pageName: 'Current Page',
};