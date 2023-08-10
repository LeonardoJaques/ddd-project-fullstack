import Registry from "./Registry";

export default function inject(name: string) {
  return (target: any, propertyKey: string) => {
    target[propertyKey] = new Proxy(
      {},
      {
        get(target, propertyKey, receiver) {
          const denpendency = Registry.getInstance().inject(name);
          return denpendency[propertyKey];
        },
      }
    );
  };
}
