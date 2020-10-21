import React from "react";
import EFieldForm from "../Enums/EFieldForm";

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um email válido",
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message:
      "A senha precisa ter 1 caracter maíusculo, 1 minúsculo e 1 digito. Com no mínimo 8 caracteres.",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize números apenas.",
  },
};

const useForm = (type?: EFieldForm) => {
  const [value, setValue] = React.useState("");
  const [helperText, setHelperText] = React.useState("");

  function validate(value: string) {
    if (!type) return true;

    if (value.length === 0) {
      setHelperText("Preencha um valor.");
      return false;
    }

    setHelperText("");
    switch (type) {
      case EFieldForm.email:
        if (!types.email.regex.test(value)) {
          setHelperText(types.email.message);
          return false;
        }
        break;
      case EFieldForm.password:
        if (!types.password.regex.test(value)) {
          setHelperText(types.password.message);
          return false;
        }
        break;
      case EFieldForm.number:
        if (!types.number.regex.test(value)) {
          setHelperText(types.number.message);
          return false;
        }
        break;
      default:
        break;
    }

    if (helperText.length <= 0) return true;
  }

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (helperText) validate(event.target.value);
    setValue(event.target.value);
  }

  return {
    value,
    setValue,
    onChange,
    helperText,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
