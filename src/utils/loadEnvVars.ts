// Function to load required environment variables and throw an error if any are missing
export function loadEnvVars(requiredVars: ["PORT", "URL_WEBHOOK"]): Record<string, string> {
  const envVars: Record<string, string> = {};

  requiredVars.forEach((varName) => {
    const value = process.env[varName];
    if (!value) {
      throw new Error(`Environment variable ${varName} is required but not defined.`);
    }
    envVars[varName] = value;
  });

  return envVars;
}