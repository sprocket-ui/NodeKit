// Button Component
import type ButtonComponent from "./components/button";

// Tabs Components
import type TabsComponent from "./components/tabs";
import type TabsListComponent from "./components/tabs/list";

export default interface SprocketComponentsRegistry {
  // Button
  'Button': typeof ButtonComponent;
  'button': typeof ButtonComponent;

  // Tabs
  'Tabs': typeof TabsComponent;
  'tabs': typeof TabsComponent;

  // Tabs List
  'Tabs::List': typeof TabsListComponent;
  'tabs/list': typeof TabsListComponent;
}
