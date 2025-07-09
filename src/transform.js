const fs = require('fs');

const proofData = JSON.parse(fs.readFileSync('data/proof.json', 'utf-8'));
const publicInputData = JSON.parse(fs.readFileSync('data/public_input.json', 'utf-8'));

const verificationKeyData = JSON.parse(fs.readFileSync('data/verification_key.json', 'utf-8'));

const transformedData = {
  p: "4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787",
  a: {
    x: proofData.pi_a[0],
    y: proofData.pi_a[1]
  },
  b: {
    x1: proofData.pi_b[0][0],
    y1: proofData.pi_b[0][1],
    x2: proofData.pi_b[1][0],
    y2: proofData.pi_b[1][1]
  },
  c: {
    x: proofData.pi_c[0],
    y: proofData.pi_c[1]
  },
  public_inputs: publicInputData.map(input => input)
};

function replacer(key, value) {
  return typeof value === 'bigint' ? value.toString() : value;
}

fs.writeFileSync('script-input.json', JSON.stringify(transformedData, replacer, 2), 'utf-8');
console.log('Data transformed and saved to script-input.json');

const transformedParameter = {
  p: "4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787",
  alpha: {
    x: verificationKeyData.vk_alpha_1[0],
    y: verificationKeyData.vk_alpha_1[1]
  },
  beta: {
    x1: verificationKeyData.vk_beta_2[0][0],
    y1: verificationKeyData.vk_beta_2[0][1],
    x2: verificationKeyData.vk_beta_2[1][0],
    y2: verificationKeyData.vk_beta_2[1][1]
  },
  gamma: {
    x1: verificationKeyData.vk_gamma_2[0][0],
    y1: verificationKeyData.vk_gamma_2[0][1],
    x2: verificationKeyData.vk_gamma_2[1][0],
    y2: verificationKeyData.vk_gamma_2[1][1]
  },
  delta: {
    x1: verificationKeyData.vk_delta_2[0][0],
    y1: verificationKeyData.vk_delta_2[0][1],
    x2: verificationKeyData.vk_delta_2[1][0],
    y2: verificationKeyData.vk_delta_2[1][1]
  },
  ics: verificationKeyData.IC.map(point => ({
    x: point[0],
    y: point[1]
  }))
};

function replacer(key, value) {
  return typeof value === 'bigint' ? value.toString() : value;
}

fs.writeFileSync('script-parameter.json', JSON.stringify(transformedParameter, replacer, 2), 'utf-8');

console.log('Data transformed and saved to script-parameter.json');
