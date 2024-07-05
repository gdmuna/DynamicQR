const apiUrl = import.meta.env.VITE_API_URL;

// 封装常规请求函数
const request = {
    // 封装 fetch 作为基础请求函数
    fetch: async (url, options) => {
        return await fetch(`${apiUrl}${url}`, options)
            .then((res) => {
                if (!res.ok) {
                    console.error('Request error:', res.statusText);
                }
                return res.json();
            })
            .then((res) => res.data)
            .catch((error) => {
                console.error('Request error:', error);
            });
    },
    // 封装 GET 请求
    get: (url, data) => {
        const queryString = new URLSearchParams(data);
        return request.fetch(`${url}?${queryString.toString()}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('token')
            },
            query: JSON.stringify(data)
        });
    },
    // 封装 POST 请求
    post: (url, data) => {
        return request.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
    },
    // 封装 PUT 请求
    put: (url, data) => {
        return request.fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
    },
    // 封装 DELETE 请求
    delete: (url, data) => {
        return request.fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(data)
        });
    }
};

export default request;
