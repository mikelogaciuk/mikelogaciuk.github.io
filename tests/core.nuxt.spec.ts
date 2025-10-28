import { mount } from "@vue/test-utils";
import { test, expect, it, describe } from "vitest";
import HomePage from "/pages/index.vue";

describe("Home Page", () => {
  it("renders the home page and checks for welcome text", () => {
    const wrapper = mount(HomePage);
    expect(wrapper.text()).toContain("Mike Logaciuk");
  });
});
