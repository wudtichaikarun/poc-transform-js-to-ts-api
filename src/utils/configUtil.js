export function ensureConfigKey(config, key) {
  if (!config[key]) {
    throw new Error(`config ${key} is required`);
  }
}

export function ensureConfigKeys(config, ...keys) {
  for (const key of keys) {
    ensureConfigKey(config, key);
  }
}
