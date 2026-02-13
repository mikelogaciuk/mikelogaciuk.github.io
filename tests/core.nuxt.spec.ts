import { mount } from '@vue/test-utils';
import { test, expect, it, describe } from 'vitest';
import HomePage from '../app/pages/index.vue';
import AboutPage from '../app/pages/about.vue';

describe('Home Page', () => {
  it('renders the home page and checks for welcome text', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.text()).toContain('Michał Logaciuk');
  });
});

describe('About Page', () => {
  it('renders the about page and checks for timeline component', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.text()).toContain('About Me');
    expect(wrapper.findComponent({ name: 'TimeLineComponent' }).exists()).toBe(
      true,
    );
  });
});
