export interface IUser {
id: number;
email: string;
password: string;
kljuc: string;
aktivan: boolean;
ime: string;
telefon: string;
uloge_id: number;
firma_id: number;
}

export interface IDogadjaj {
    id: number;
  datum: string;
  vrijeme: string;
  komitenti_id: number;
  vrsta_dogadjaja_id: number;
  status_dogadjaja_id: number;
  lokacija_id: number;
  ocjena_dogadjaja_id: number;
  operater_id: number;
  opis: string;
  iznos: number;

}
export interface ITroskovi {
    id: number;
    dogadjaj_id: number;
    operater_id: number;
    vrsta_troska_id: number;
    komitenti_id: number;
    iznos: number;
    opis: string;

}

export interface IPrihodi {
    id: number;
    vrste_prihoda_id: number;
    status_prihoda_id: number;
    dogadjaj_id: number;
    operater_id: number;
    iznos: number;
    opis: string;
    rok_placanja: string;

}

export interface IRaspored {
    id: number;
    dogadjaj_id: number;
    operater_id: number;
    vrijeme_pocetka: string;
    vrijeme_zavrsetka: string;
    opis: string;
}

export interface IZadatak {
    id: number,
    opis: string,
    status: number,
    prioritet: number,
    operater_id: number,
    dogadjaj_id: number,
    podsjetnik: string,
    datum_kreiranja: string,
    datum_zavrsetka: string,

}

export interface IUloge {
id: number;
uloge_naziv: string;
}

export interface IPrivilegijeUloge {
    uloge_id: number;
    privilegije_id: number;
    aktivan: boolean;
    uloge_naziv: string;
    privilegija_naziv: string;
    app_naziv: string;
}

export interface IAplikacije {
   id: number;
   app_naziv: string;

}

export interface IPrivilegije {
    id: number;
    privilegija_naziv: string;
}



export interface IKomitent {
    id: number;
    naziv: string;
    pib: string;
    pdvbroj: string;
    adresa: string;
    telefon: string;
    email: string;
    ziroracun: string;
    drzava: number;
    grad: string;
    napomena: string;
    vrsta_komitenta: number;
}


 interface AuthedRequest extends Request {
    user: IUser;
}






export default AuthedRequest



