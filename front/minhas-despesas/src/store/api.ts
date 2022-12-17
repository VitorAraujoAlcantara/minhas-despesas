import { UserLoginDto } from '../models/user-login-dto';
import { urlApi } from '../utils/api-config';
const LOCAL_STORAGE_USER_LOGIN = 'USER_LOGIN';
const ACESSO_INVALIDO = 'Acesso inválido.';
const ACESSO_NAO_AUTORIZADO = 'Acesso não autorizado.';

async function getAuthorization() {
    const json = localStorage.getItem(LOCAL_STORAGE_USER_LOGIN);
    if (json) {
        let userLogin: UserLoginDto;
        userLogin = JSON.parse(json);
        return `bearer ${userLogin.token}`;
    }
    return '';
}

export async function put<T, V>(endPoint: string, data?: T): Promise<V> {
    const url = `${urlApi}/${endPoint}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': await getAuthorization()
    }
    return fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok && response.status === 200) {
                return response.json();
            }

            if (response.status === 404) {
                throw new Error("Usuário não localizado.");
            }
            if (response.status === 400) {
                return response.text().then(text => {
                    return Promise.reject(text);
                });
            }

            if (response.status === 401) {
                return Promise.reject(ACESSO_INVALIDO);
            }

            if (response.status === 403) {
                return Promise.reject(ACESSO_NAO_AUTORIZADO);
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            return data;
        })
        .catch((erro: any) => {
            return Promise.reject(erro);
        })
}

export async function post<T, V>(endPoint: string, data?: T): Promise<V> {
    const url = `${urlApi}/${endPoint}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': await getAuthorization()
    }
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok && response.status === 200) {
                return response.json();
            }

            if (response.status === 404) {
                throw new Error("Usuário não localizado.");
            }
            if (response.status === 400) {
                return response.text().then(text => {
                    // try{
                    //     var obj = JSON.parse(text);
                    //     return Promise.reject(obj);
                    // }
                    // catch(e){
                    return Promise.reject(text);
                    // }
                });
            }

            if (response.status === 401) {
                return Promise.reject(ACESSO_INVALIDO);
            }

            if (response.status === 403) {
                return Promise.reject(ACESSO_NAO_AUTORIZADO);
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            return data;
        })
        .catch((erro: any) => {
            return Promise.reject(erro);
        })
}

export async function get<T>(endPoint: string, parameters: any[] = []): Promise<T> {
    const params = new URLSearchParams(parameters);
    const url = `${urlApi}/${endPoint}${params.keys.length ? `?${params.toString()}` : ''}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': await getAuthorization()
    }
    return fetch(url, {
        method: 'GET',
        headers
    })
        .then(response => {

            if (response.ok && response.status === 200) {
                return response.json();
            }

            if (response.status === 404) {
                throw new Error("Usuário não localizado.");
            }
            if (response.status === 400) {
                return response.text().then(text => {
                    return Promise.reject(text);
                });
            }
            if (response.status === 401) {
                return Promise.reject(ACESSO_INVALIDO);
            }

            if (response.status === 403) {
                return Promise.reject(ACESSO_NAO_AUTORIZADO);
            }

            throw new Error(response.statusText);
        })
        .then(data => {
            return data;
        })
        .catch((erro: any) => {
            return Promise.reject(erro);
        })

}


export async function deleteItem<T>(endPoint: string, parameters: any[] = []): Promise<T> {
    const params = new URLSearchParams(parameters);
    const url = `${urlApi}/${endPoint}${params.keys.length ? `?${params.toString()}` : ''}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': await getAuthorization()
    }
    return fetch(url, {
        method: 'DELETE',
        headers
    })
        .then(response => {

            if (response.ok && response.status === 200) {
                return response.json();
            }

            if (response.ok && response.status === 204) {
                return response.text();
            }

            if (response.status === 404) {
                throw new Error("Usuário não localizado.");
            }
            if (response.status === 400) {
                return response.text().then(text => {
                    return Promise.reject(text);
                });
            }
            throw new Error(response.statusText);
        })
        .then(data => {
            return data;
        })
        .catch((erro: any) => {
            return Promise.reject(erro);
        })

}