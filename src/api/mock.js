import store from "@/store";

function getMockData(name) {
  store.dispatch('showPreLoader', true);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(require('@/api/mock-data/' + name + '.js').data);

      store.dispatch('showPreLoader', false);
    }, 500)
  })
}

export {
  getMockData
}
