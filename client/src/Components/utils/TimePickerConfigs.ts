export const configRules = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Selecciona una fecha.",
    },
  ],
};

export const configTime = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Selecciona una hora.",
    },
  ],
};

export const defaultFormRule = {
  rules: [
    {
      required: true,
      message: "Campo requerido.",
    },
  ],
};
export const hoursFormat = "HH:mm";
