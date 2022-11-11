
//los servicios me mandan lo que trae postman

export const getAllPostsService = async () => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
    //.data es donde viene la info de los posts
};

export const getPostsUserService = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/${id}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};


export const registerUserService = async ({ email, password, nick }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user`, {
        method: "POST",
        body: JSON.stringify({ email, password, nick }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
};


export const loginUserService = async ({ email, password }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};


export const getMyUserDataService = async ({ token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/info`, {
        headers: {
            Authorization: token,
        }
    });
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};



export const sendPostService = async ({ data, token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}`, {
        method: "POST",
        body: data,
        headers: {
            Authorization: token,
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    //console.log(json);
    return json.data;

};
//devuelve el nuevo post con su info, que ya lo usamos sin tener que recargar la pag!


export const deletePostService = async ({ id, token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/post/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    //no devolvemos nada
};

export const putModifyUserService = async ({ password, nick, token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/info`, {
        method: "PUT",
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, nick }),
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    //return json.data;
};
//modifica datos pero no devolvemos nada 




//permite leer los datos de cualquier usuario-no uso- 
export const getUserDataService = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/info/${id}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    //console.log(json);
    //console.log(json.data);
    return json.data;

};


export const likePostService = async ({ id, token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/likes/${id}`, {
        method: "POST",
        headers: {
            Authorization: token
        }
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

};


export const dislikePostService = async ({ id, token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/likes/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token
        }
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

};


/* export const likeNumberService = async ({ id, token }) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/likes/${id}`, {
        headers: {
            Authorization: token,
        }
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    console.log(json);
    console.log(json.data);
    return json.data;
}; */


export const sendCommentService = async (text, post_id, token) => {
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/comments/${post_id}`, {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: {
            Authorization: token,
            "Content-Type": "application/json",
        },
    });

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }

    //console.log(json.data);
    return json.data;

};


export const deleteCommentService = async (id, token) => {

    console.log(token);
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/comments/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
};




export const getSearchService = async (text) => {

    const response = await fetch(`${process.env.REACT_APP_BACKEND}/posts/imagenes/${text}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }
    return json.data;
};


export const getLikesService = async (id) => {

    //console.log(id);
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/likes/${id}`);

    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.message);
    }


    console.log(json.data);
    return json.data;
};




export const getUserLikesService = async (token) => {

    //console.log(token);
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/user/likes`, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    });

    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }

    return json.data;
};