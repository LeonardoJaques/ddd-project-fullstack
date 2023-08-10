import { mount } from "@vue/test-utils";
import DriverGatewayHttp from "../../src/infra/gateway/DriverGatewayHttp";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import CreateDriver from "../../src/view/CreateDriver.vue";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
}

test("Deve criar um motorista", async () => {
  const driverGateway: DriverGatewayHttp = {
    async create(): Promise<any> {
      return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
    },
    httpClient: new AxiosAdapter(),
  };
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway,
      },
    },
  });
  wrapper.get(".driver-name").setValue("Jonh Doe");
  wrapper.get(".driver-email").setValue("john.doe@outlook.com");
  wrapper.get(".driver-documents").setValue("83432616074");
  wrapper.get(".driver-car-plate").setValue("AAA9999");
  await wrapper.get(".driver-submit").trigger("click");
  await sleep(200);
  expect(wrapper.get(".driver-id").text()).toHaveLength(36);
});

test("Não deve criar um motorista com o nome inválido", async () => {
  const driverGateway: DriverGatewayHttp = {
    async create(): Promise<any> {
      return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
    },
    httpClient: new AxiosAdapter(),
  };
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway,
      },
    },
  });
  wrapper.get(".driver-name").setValue("Jonh");
  wrapper.get(".driver-email").setValue("john.doe@outlook.com");
  wrapper.get(".driver-documents").setValue("83432616074");
  wrapper.get(".driver-car-plate").setValue("AAA9999");
  await wrapper.get(".driver-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid name");
});

test("Não deve criar um motorista com o email inválido", async () => {
  const driverGateway: DriverGatewayHttp = {
    async create(): Promise<any> {
      return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
    },
    httpClient: new AxiosAdapter(),
  };
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway,
      },
    },
  });
  wrapper.get(".driver-name").setValue("Jonh Doe");
  wrapper.get(".driver-email").setValue("john.doe@outlook");
  wrapper.get(".driver-documents").setValue("83432616074");
  wrapper.get(".driver-car-plate").setValue("AAA9999");
  await wrapper.get(".driver-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid email");
});

test("Não deve criar um motorista com o documento inválido", async () => {
  const driverGateway: DriverGatewayHttp = {
    async create(): Promise<any> {
      return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
    },
    httpClient: new AxiosAdapter(),
  };
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway,
      },
    },
  });
  wrapper.get(".driver-name").setValue("Jonh Doe");
  wrapper.get(".driver-email").setValue("john.doe@outlook.com");
  wrapper.get(".driver-documents").setValue("83432616075");
  wrapper.get(".driver-car-plate").setValue("AAA9999");
  await wrapper.get(".driver-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid cpf");
});

test("Não deve criar um motorista com o placa do carro inválida", async () => {
  const driverGateway: DriverGatewayHttp = {
    async create(): Promise<any> {
      return "98846fa9-7c06-4ad8-ac5f-9c96f50406bd";
    },
    httpClient: new AxiosAdapter(),
  };
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway,
      },
    },
  });
  wrapper.get(".driver-name").setValue("Jonh Doe");
  wrapper.get(".driver-email").setValue("john.doe@outlook.com");
  wrapper.get(".driver-documents").setValue("83432616074");
  wrapper.get(".driver-car-plate").setValue("AAA999");
  await wrapper.get(".driver-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid Car Plate");
});
