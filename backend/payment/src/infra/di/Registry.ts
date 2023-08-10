export default class Registry {
  private dependencies: {
    [name: string]: any;
  };
  static instance: Registry;

  private constructor() {
    this.dependencies = {};
  }

  provide(name: string, dependencies: any) {
    this.dependencies[name] = dependencies;
  }

  inject(name: string) {
    return this.dependencies[name];
  }
  static getInstance() {
    if (!Registry.instance) {
      Registry.instance = new Registry();
    }
    return Registry.instance;
  }
}
