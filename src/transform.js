const fs = require('fs');

const proofData = JSON.parse(fs.readFileSync('data/proof.json', 'utf-8'));
const publicInputData = JSON.parse(fs.readFileSync('data/public_input.json', 'utf-8'));

const verificationKeyData = JSON.parse(fs.readFileSync('data/verification_key.json', 'utf-8'));

const transformedData = {
  p: "4002409555221667393417789825735904156556882819939007885332058136124031650490837864442687629129015664037894272559787",
  a: {
    x: proofData.pi_a.x,
    y: proofData.pi_a.y
  },
  b: {
    x1: proofData.pi_b.x[0],
    y1: proofData.pi_b.y[0],
    x2: proofData.pi_b.x[1],
    y2: proofData.pi_b.y[1]
  },
  c: {
    x: proofData.pi_c.x,
    y: proofData.pi_c.y
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
    x: verificationKeyData.vk_alpha_1.x,
    y: verificationKeyData.vk_alpha_1.y
  },
  beta: {
    x1: verificationKeyData.vk_beta_2.x[0],
    y1: verificationKeyData.vk_beta_2.y[0],
    x2: verificationKeyData.vk_beta_2.x[1],
    y2: verificationKeyData.vk_beta_2.y[1]
  },
  gamma: {
    x1: verificationKeyData.vk_gamma_2.x[0],
    y1: verificationKeyData.vk_gamma_2.y[0],
    x2: verificationKeyData.vk_gamma_2.x[1],
    y2: verificationKeyData.vk_gamma_2.y[1]
  },
  delta: {
    x1: verificationKeyData.vk_delta_2.x[0],
    y1: verificationKeyData.vk_delta_2.y[0],
    x2: verificationKeyData.vk_delta_2.x[1],
    y2: verificationKeyData.vk_delta_2.y[1]
  },
  ics: verificationKeyData.IC.map(point => ({
    x: point.x,
    y: point.y
  }))
};

function replacer(key, value) {
  return typeof value === 'bigint' ? value.toString() : value;
}

fs.writeFileSync('script-parameter.json', JSON.stringify(transformedParameter, replacer, 2), 'utf-8');

console.log('Data transformed and saved to script-parameter.json');