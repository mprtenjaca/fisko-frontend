import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const generatePage = (pageName) => {

    console.log(pageName)

    pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    console.log(pageName)
    
    const component = () => require(`../../views/${pageName}.js`).default;

    try{
        return React.createElement(component())
    }catch (err){
        return <>FUCK</>
    }
}

const PageRender = () => {
    const {page, id} = useParams();
    const {auth} = useSelector(state => state);

    console.log("RENDER")
    let pageName = "";

    if(auth.token){
        if(id){
            pageName = `${page}/[id]`;
        }else{
            pageName = `${page}`;
        }
    }
    
    return generatePage(pageName);
}

export default PageRender;
