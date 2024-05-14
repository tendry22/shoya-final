export function formatNumberAr(number) {
  return Number(number).toLocaleString();
}

export function formatDateTime(dateString) {
  const dateObj = new Date(dateString);

  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);

  const hours = ("0" + dateObj.getHours()).slice(-2);
  const minutes = ("0" + dateObj.getMinutes()).slice(-2);
  const seconds = ("0" + dateObj.getSeconds()).slice(-2);

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

export function formatNumero(numero) {
  let toreturn = "";
  let tablenumero = numero.split("");
  const telma = "34";
  const orange = "32";
  const airtel = "33";
  const indice = tablenumero[0] + tablenumero[1];
  if (indice + "" == telma) {
    toreturn = indice + " ";
    toreturn += tablenumero[2];
    toreturn += tablenumero[3];
    toreturn += " ";
    toreturn += tablenumero[4];
    toreturn += tablenumero[5];
    toreturn += tablenumero[6];
    toreturn += " ";
    toreturn += tablenumero[7];
    toreturn += tablenumero[8];
  }
  if (indice + "" == orange) {
    toreturn = indice + " ";
    toreturn += tablenumero[2];
    toreturn += tablenumero[3];
    toreturn += " ";
    toreturn += tablenumero[4];
    toreturn += tablenumero[5];
    toreturn += tablenumero[6];
    toreturn += " ";
    toreturn += tablenumero[7];
    toreturn += tablenumero[8];
  }
  if (indice + "" == airtel) {
    toreturn = indice + " ";
    toreturn += tablenumero[2];
    toreturn += tablenumero[3];
    toreturn += " ";
    toreturn += tablenumero[4];
    toreturn += tablenumero[5];
    toreturn += tablenumero[6];
    toreturn += " ";
    toreturn += tablenumero[7];
    toreturn += tablenumero[8];
  }
  return toreturn;
}
