import { test, expect, it, describe } from 'vitest';
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime';
import HomePage from '../app/pages/index.vue';
import AboutPage from '../app/pages/about.vue';

mockNuxtImport('queryCollection', () => {
  return () => ({
    order: () => ({
      limit: () => ({
        all: () => Promise.resolve([
          { title: 'Mock Post', date: '2025-01-01', description: 'Desc', language: 'en', path: '/test' }
        ])
      })
    })
  });
});

describe('Home Page', () => {
  it('renders the home page and checks for welcome text', async () => {
    const wrapper = await mountSuspended(HomePage);
    expect(wrapper.text()).toContain('Michał Logaciuk');
  });
});

describe('About Page', () => {
  it('renders the about page and checks for timeline component', async () => {
    const wrapper = await mountSuspended(AboutPage);
    expect(wrapper.text()).toContain('About Me');
    expect(wrapper.findComponent({ name: 'TimeLineComponent' }).exists()).toBe(
      true,
    );
  });
});
