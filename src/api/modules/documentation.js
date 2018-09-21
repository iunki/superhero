import {getMockData} from "@/api/mock";

const debug = true;

function loadDocumentation(params) {
  return debug ? getMockData('documentation') : [];
}

export {
  loadDocumentation
}
