import React from "react";
import EFieldForm from "../../Enums/EFieldForm";

const errorMessages: string[] = [
  "Informe um email válido. Ex: yoda@yoda.com",
  "A senha precisa ter no mínimo 8 caracteres, sendo 1 maíusculo, 1 minúsculo e 1 digito.",
  "Informe apenas números.",
  "Informação obrigatória, por favor realize o preenchimento.",
  "O CNPJ deve ser numérico e conter exatamente 14 dígitos. Ex : 03162704000159",
  "Formato dinheiro deve informar **** rever mensagem ****",
];

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: errorMessages[0],
  },
  password: {
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
    message: errorMessages[1],
  },
  number: {
    regex: /^\d+$/,
    message: errorMessages[2],
  },
  cnpj: {
    regex: /^\d{14,14}$/,
    message: errorMessages[4],
  },
  money: {
    regex: /^[1-9]\d{0,2}(\.\d{3})*,\d{2}$/,
    message: errorMessages[5],
  },
};

const useForm = (type?: EFieldForm) => {
  const [value, setValue] = React.useState("");
  const [helperText, setHelperText] = React.useState("");

  function validate(value: string) {
    if (!type) return true;

    if (value.length === 0) {
      setHelperText("Preencha um valor");
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
      case EFieldForm.cnpj:
        if (!types.cnpj.regex.test(value)) {
          setHelperText(types.cnpj.message);
          return false;
        }
        break;
      case EFieldForm.money:
        if (!types.money.regex.test(value)) {
          setHelperText(types.money.message);
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
    error: helperText ? true : false,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
