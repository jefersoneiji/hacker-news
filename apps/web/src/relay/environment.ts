import {
    CacheConfig,
    Environment,
    Network,
    RecordSource,
    RequestParameters,
    Store,
    UploadableMap,
    Variables
} from 'relay-runtime';

const base_url = import.meta.env.VITE_API || 'http://127.0.0.1:4000';
async function fetchQuery(
    operation: RequestParameters,
    variables: Variables,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _cacheConfig: CacheConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _uploadables?: UploadableMap | null
) {
    const token = localStorage.getItem('hn-token');
    return fetch(base_url + '/graphql', {
        method: 'POST',
        headers: {
            'Authorization': token ? `Bearer ${token}` : '',
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            query: operation.text,
            variables
        })
    }).then(response => response.json());

}

const network = Network.create(fetchQuery);
const store = new Store(new RecordSource());

export const environment = new Environment({ network, store });