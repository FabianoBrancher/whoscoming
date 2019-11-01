export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTitle(opt) {
  switch (opt) {
    case 'name': {
      return 'Nome';
    }
    case 'rg': {
      return 'R.G.';
    }
    case 'phone': {
      return 'Telefone';
    }
    case 'table': {
      return 'Mesa';
    }
    case 'email': {
      return 'Email';
    }
    case 'cpf': {
      return 'CPF';
    }
    case 'city': {
      return 'Cidade';
    }
    case 'company': {
      return 'Empresa';
    }
    case 'type': {
      return 'Tipo';
    }
    case 'status': {
      return 'Status';
    }
    default:
      return capitalizeFirstLetter(opt);
  }
}
