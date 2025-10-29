import { mount } from '@vue/test-utils';
import { test, expect, it, describe } from 'vitest';
import HomePage from '/pages/index.vue';
import AboutPage from '/pages/about.vue';

describe('Home Page', () => {
  it('renders the home page and checks for welcome text', () => {
    const wrapper = mount(HomePage);
    expect(wrapper.text()).toContain('Michał Logaciuk');
    expect(wrapper.text()).toContain('DataOps & DevOps Engineering');
    expect(wrapper.text()).toContain('infrastructure');
  });
});

describe('About Page', () => {
  it('renders the about page and checks for timeline component', () => {
    const wrapper = mount(AboutPage);
    expect(wrapper.text()).toContain('About Me');
    expect(wrapper.findComponent({ name: 'TimeLineComponent' }).exists()).toBe(
      true
    );
  });
});
