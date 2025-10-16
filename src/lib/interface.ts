export interface ILocalidade {
  id: number;
  descricao: string; 
}

export interface IGrupo {
  id: number;
  descricao: string;
}

export interface ISubGrupo {
  id: number;
  codgrupo: number;
  descricao: string;
}

export interface IMarca {
  id: number;
  descricao: string;
}

export interface ICentroCusto {
  id: number;
  descricao: string;
}

export interface IAtivo {
  id: number;
  codigo: string;
  status: string;
  descricao: string;
  aquisicao: string;
  valor_aquisicao: string;
  valor_atual: string;
  depreciacao: string;
  codsubgrupo: number;
  codcentrocusto: number;
  codmarca: number;
  encontrado: boolean;
  codlocalidade: number;
}

export interface IUsuario {
  id: number;
  nome: string;
  email: string;
  password: string;
}
