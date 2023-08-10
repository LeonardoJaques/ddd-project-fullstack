import { mount } from "@vue/test-utils";
import PassengerGatewayHttp from "../../src/infra/gateway/PassengerGatewayHttp";
import AxiosAdapter from "../../src/infra/http/AxiosAdapter";
import CreatePassenger from "../../src/view/CreatePassenger.vue";

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
}
test("Deve criar um passageiro", async () => {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter()),
      },
    },
  });
  await wrapper.get(".passenger-name").setValue("Jonh Doe");
  await wrapper.get(".passenger-email").setValue("john.doe@outlook.com");
  await wrapper.get(".passenger-documents").setValue("83432616074");
  await wrapper.get(".passenger-submit").trigger("click");
  await sleep(200);
  expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
});
test("Não deve criar um passageiro com o nome inválido", async () => {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter()),
      },
    },
  });
  await wrapper.get(".passenger-name").setValue("Jonh");
  await wrapper.get(".passenger-email").setValue("john.doe@outlook.com");
  await wrapper.get(".passenger-documents").setValue("83432616074");
  await wrapper.get(".passenger-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid name");
});

test("Não deve criar um passageiro com email inválido", async () => {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter()),
      },
    },
  });
  await wrapper.get(".passenger-name").setValue("Jonh Doe");
  await wrapper.get(".passenger-email").setValue("john.doe@outlook");
  await wrapper.get(".passenger-documents").setValue("83432616074");
  await wrapper.get(".passenger-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid email");
});

test("Não deve criar um passageiro com documento inválido", async () => {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter()),
      },
    },
  });
  await wrapper.get(".passenger-name").setValue("Jonh Doe");
  await wrapper.get(".passenger-email").setValue("john.doe@outlook.com");
  await wrapper.get(".passenger-documents").setValue("83432616075");
  await wrapper.get(".passenger-submit").trigger("click");
  expect(wrapper.get(".error").text()).toBe("Invalid cpf");
});
test("Deve criar um passageiro tendo errado o preenchimento antes", async () => {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter()),
      },
    },
  });
  await wrapper.get(".passenger-name").setValue("Jonh");
  await wrapper.get(".passenger-email").setValue("john.doe@outlook.com");
  await wrapper.get(".passenger-documents").setValue("83432616074");
  await wrapper.get(".passenger-submit").trigger("click");
  await wrapper.get(".passenger-name").setValue("Jonh Doe");
  await wrapper.get(".passenger-submit").trigger("click");
  await sleep(200);
  expect(wrapper.get(".passenger-id").text()).toHaveLength(36);
  expect(wrapper.get(".error").text()).toBe("");
});
